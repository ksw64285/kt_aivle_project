from django.shortcuts import render
from django.conf import settings
from django.urls import reverse
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from google.cloud import texttospeech, speech
from gtts import gTTS
from urllib.parse import urlencode
from chat.models import ChatMessage, PersonaSession
from userapp.models import User
from datetime import datetime
from pytz import timezone
import openai
import os
import io
import requests
import traceback
import jwt
from chat.serializers import ContextSerializer, ChatSerializer,PersonaSerializer, getGuideSerializer, postGuideSerializer
from rest_framework.permissions import IsAuthenticated
from django.core import serializers
from django.utils.translation import gettext_lazy
from bson.objectid import ObjectId

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = 'HS256'

openai.api_key = settings.OPENAI_API_KEY

# credential_path = "C:/Users/User/Desktop/vscode/kt_aivle_project/ktaivle-bigrrj-d207633a09f7.json"
# os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credential_path
# chat/ View
class ChatView(APIView):
    chat_history = [] # 대화 기록 리스트
    permission_classes=[IsAuthenticated]
    # 채팅 갱신
    def post(self, request):
        print(request)
        message = request.data.get('message')
        age = request.data.get('age')
        sex = request.data.get('sex')
        job = request.data.get('job')
        grade = request.data.get('grade')
        situation = request.data.get('situation')
        subject = request.data.get('subject')
        persona_id = request.data.get('persona_id')
        print(message, age, sex, job, grade, situation, subject)

        # 사용자 음성인 경우 
        if message.startswith("음성:"):
            audio_data = message.replace("음성:", "")
            response = self.convert_speech_to_text(audio_data)
            return Response({'response': response})
        # 텍스트인 경우
        else:
            answer = self.get_chat_response(message, age, sex, job, grade, situation, subject)
            prediction = self.grow_predict_model(message)

            self.chat_history.append({"role": "user", "content": message})  # 사용자 메시지를 대화 기록에 추가
            self.chat_history.append({"role": "assistant", "content": answer})  # AI 응답을 대화 기록에 추가

            # user_id를 현재 하드코딩중인데 프론트에서 header에서 받아오게 추후 수정해야함
            token_str = request.headers.get("Authorization").split(' ')[1]
            data = jwt.decode(token_str, SECRET_KEY, ALGORITHM)
            user_id = data['user_id']
            user = User.objects.get(id=user_id)
            time_zone = timezone('Asia/Seoul')

            # 쿼리로 받아온 persona_id를 기준으로 persona 객체랑 연결
            try:    
                persona_session = PersonaSession.objects.filter(_id=ObjectId(persona_id)).first()
            except: 
                traceback.print_exc() 
                print("PersonaSession get error")
                persona_session = ""
            
            print(persona_session)

            # ChatMessage DB에 저장
            try:            
                chat_message = ChatMessage(
                    user=user, # 사용자 연결
                    persona=persona_session, # 페르소나 세션 연결
                    question=message,
                    answer=answer,
                    my_datetime_field=datetime.now(time_zone)  
                )
                chat_message.save()
            except: 
                traceback.print_exc()
                print("ChatMessage save to db error")
                
            # TTS 변환
            try:
                tts_path = self.convert_text_to_speech(answer, sex)
            except:
                traceback.print_exc()
            
        print(answer)
        print(prediction)
        serializer = ChatSerializer(data={'answer': answer, 'prediction': prediction})
        # 보내고자하는 data serialize
        
        if serializer.is_valid(raise_exception=True):
            print('valid')
            serialized_data = serializer.data
            response = Response(data=serialized_data)
            response.headers['Content-Type'] = 'application/json'
            try:
                return response
            except:
                traceback.print_exc() 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # chat페이지 값을 가져와야기 때문에 테스트로 넣은 render 추후 삭제
    # ?age={age}&sex={sex}
    def get(self, request, **kwargs):
        print(self.request)
        print(**kwargs)
        age, sex, job, grade, situation, subject, persona_id = '10', 'female', '개발자', '부장', 'ㄴㅇㅁㅇㅁ', 'ㅁㅇㅁㄴㅇㅁㅇㄴ', '649550d62764d371355b9052'
        
        if kwargs:
            age = request.GET.get('age')
            sex = request.GET.get('sex')
            job = request.GET.get('job')
            grade = request.GET.get('grade')
            situation = request.GET.get('situation')
            subject = request.GET.get('subject')
            persona_id = request.GET.get('persona_id')
        

        # 데이터 조회
        # mongo DB에서 페르소나 세션을 불러오기
        #
         
        # login토큰 정상적으로 활성화되면 이부분 주석뺴기
        token_str = request.headers.get("Authorization").split(' ')[1]
        data = jwt.decode(token_str, SECRET_KEY, ALGORITHM)
        user_id = data['user_id']
        
        try:
            personalist = PersonaSession.objects.filter(user = user_id).values()
            personalist = [{**item, 'id': str(item.pop('_id'))} for item in personalist]
            #del personalist[0]['_id']
            personalist = [{k: v for k, v in item.items() if k != '_id'} for item in personalist]
            chatlist = ChatMessage.objects.filter(user = user_id).values()
            #chatlist = [{**item, 'id': str(item.pop('_id'))} for item in chatlist]
            chatlist = [{**item, 'id': str(item.pop('_id')), 'persona_id': str(item['persona_id'])} for item in chatlist]
            #print(chatlist)
            chatlist = [{k: v for k, v in item.items() if k != '_id'} for item in chatlist]

        
            
        except:
            traceback.print_exc()
            personalist=""
            chatlist=""
            print("user unknown from db")
        
        context = {
            'age': age,
            'sex': sex,
            'job': job,
            'grade': grade,
            'situation': situation,
            'subject': subject,
            'persona_id' : persona_id,
            'personalist' : personalist,
            'chatlist' : chatlist
        }
    
        serializer = ContextSerializer(data=context)
        
    # 유효성 검사 실패 시 처리할 작업
        if serializer.is_valid(raise_exception=True):
            print('valid')
            serialized_data = serializer.data
            response = Response(data=serialized_data)
            response.headers['Content-Type'] = 'application/json'
            try:
                return response
            except:
                traceback.print_exc()

        print('no valid')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    # ChatGPT(openai)로부터 답변을 받는 함수
    def get_chat_response(self, prompt, age, sex, job, grade, situation, subject):
        try:
            completion = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    # 상황에 대한 설정 Act as ~ 조정필요
                    # {"role": "system", "content": f"당신은 김영희라는 이름의 {age} {sex}  {job}부서 {grade}직급 로서,{situation}을 가지고 있습니다." 
                    #                             +f"당신은 당신의 팀장인 김철수와 {subject}에 대해 코칭 대화를 진행하게 됩니다." 
                    #                             +f"김철수는 GROW코칭 대화모델을 사용해서 당신의 핵심 이슈에 초점을 맞추며, 가장 효과적인 결과를 도출하는 데 도움을 줄려고합니다.이제, 김철수의 질문에 김영희 처럼 160자 이하로 답변하세요."
                    #                             +"만약 GROW모델에 벗어나는 질문을 하거나 AI냐고 물어 본다면 '상황에 맞는 질문을 해주세요'라고 말하세요."
                    #                             +"또한 답변 마지막에 묻지 마세요."},
                    {"role": "system", "content": f"이 대화는 코칭 대화 시뮬레이션의 일부입니다. 당신은 김영희라는 이름의 {age} {sex}  {job}부서 {grade} 로서,{situation}을 가지고 있고 mbti는 ENTJ입니다."
                                                +f"당신은 이 시뮬레이션에서 당신의 팀장인 김철수와 {subject}에 대해 코칭 대화를 진행하게 됩니다."
                                                +f"김철수는 GROW코칭 대화모델을 사용해서 당신의 핵심 이슈에 초점을 맞추며, 가장 효과적인 결과를 도출하는 데 도움을 줄려고합니다.이제, 김철수의 질문에 김영희 처럼 160자 이하로 답변하세요."},
                    {"role": "user", "content": prompt},
                ],
                max_tokens=3000,
                temperature=0.8,
            )
            #print(completion)
            result = completion.choices[0].message.content
            return result
        except openai.error.Timeout as e:
            result = "현재 ChatGPT서버에 문제가 발생하였습니다(Timeout). 잠시 후 다시 시도해주세요"
            return result
        except openai.error.APIError as e:
            result = "현재 ChatGPT서버에 문제가 발생하였습니다(APIError). 잠시 후 다시 시도해주세요"
            return result
        except openai.error.APIConnectionError as e:
            result = "현재 ChatGPT서버와 통신중에 문제가 발생하였습니다(APIConnectionError). 잠시 후 다시 시도해주세요"
            return result
        except openai.error.InvalidRequestError as e:
            result = "요청이 잘못되었습니다(InvalidRequestError). 요청 형식을 다시 한번 확인해주세요"
            return result
        except openai.error.AuthenticationError as e:
            result = "현재 ChatGPT서버와 통신중에 문제가 발생하였습니다(AuthenticationError). 잠시 후 다시 시도해주세요"
            return result
        except openai.error.PermissionError as e:
            result = "현재 ChatGPT서버와 통신중에 문제가 발생하였습니다(PermissionError). 잠시 후 다시 시도해주세요"
            return result
        except openai.error.RateLimitError as e:
            result = "질문을 너무 빠르게 입력하셨습니다(RateLimitError). 잠시 후 다시 시도해주세요"
            return result

    # STT
    def convert_speech_to_text(self, audio_file_path):
        client = speech.SpeechClient()

        with io.open(audio_file_path, "rb") as audio_file:
            content = audio_file.read()

        audio = speech.RecognitionAudio(content=content)

        config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=16000,
            language_code="ko-KR",
        )

        response = client.recognize(config=config, audio=audio)

        result = ""
        for result in response.results:
            result += result.alternatives[0].transcript

        return result
        
    # TTS (gTTS, 무료, 길이제한 100)
    # def convert_text_to_speech(self, text):
    #     tts = gTTS(text=text, lang='ko')
    #     tts_path = os.path.join(settings.MEDIA_ROOT, 'tts.mp3')
    #     tts.save(tts_path)
    #     return tts_path

    # TTS (google cloud TTS, 유료, 400만자까지 무료)
    def convert_text_to_speech(self, text, sex):
        client = texttospeech.TextToSpeechClient()
        if (sex == '남자'):
            voiceS = 'ko-KR-Standard-C'
        else:
            voiceS = 'ko-KR-Standard-A'
        
        synthesis_input = texttospeech.SynthesisInput(text=text)
        
        voice = texttospeech.VoiceSelectionParams(
            language_code='ko-KR',
            name=voiceS # 여성의 경우 ko-KR-Standard-A 
        )
        
        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3
        )
        
        response = client.synthesize_speech(
            input=synthesis_input,
            voice=voice,
            audio_config=audio_config
        )
        
        tts_path = os.path.join(settings.MEDIA_ROOT, 'tts.mp3')
        with open(tts_path, 'wb') as out_file:
            out_file.write(response.audio_content)
        
        return tts_path

    # 자체모델
    def grow_predict_model(self, input):
        # 모델과 토크나이저 로드
        API_URL = "https://api-inference.huggingface.co/models/djifg/grow_classification_kcbert"
        API_TOKEN = settings.HUGGINGFACE_API_KEY

        headers = {"Authorization": f"Bearer {API_TOKEN}"}
        data = {"inputs": f"{input}", "options":{"wait_for_model":True}}

        response = requests.post(API_URL, headers=headers, json=data)

        if response.status_code == 200:
            results = response.json()
            highest_score = max(results[0], key=lambda x: x.get("score", 0))  # 점수를 기준으로 가장 높은 항목을 찾음
            label_mapping = {
                'LABEL_0': 'GROW 모델 중 G에 해당하는 질문으로 보입니다. 잘 진행하고 있습니다.',
                'LABEL_1': 'GROW 모델 중 R에 해당하는 질문으로 보입니다. 잘 진행하고 있습니다.',
                'LABEL_2': 'GROW 모델 중 O에 해당하는 질문으로 보입니다. 잘 진행하고 있습니다.',
                'LABEL_3': 'GROW 모델 중 W에 해당하는 질문으로 보입니다. 잘 진행하고 있습니다.',
                'LABEL_4': 'GROW 모델에 벗어난 질문으로 보입니다. 가이드를 참고하여 다시한번 질문해보세요.'
            }
            mapped_label = label_mapping.get(highest_score['label'])
            return mapped_label
        else:
            return str(f"Error: {response.status_code}")


# Guide/ View
class GuideView(APIView):
    permission_classes=[IsAuthenticated]
    # 채팅갱신
    def post(self, request):
        message = request.data.get('message')
        age = request.data.get('age')
        sex = request.data.get('sex')
        job = request.data.get('job')
        grade = request.data.get('grade')
        situation = request.data.get('situation')
        subject = request.data.get('subject')
        response = self.get_chat_response(message, age, sex, job, grade, situation, subject)
        print(response)
        serializer = postGuideSerializer(data={'response': response})
        # 보내고자하는 data serialize
        
        if serializer.is_valid(raise_exception=True):
            print('valid')
            print('guide')
            serialized_data = serializer.data
            res = Response(data=serialized_data)
            
            try:
                return res
            except:
                traceback.print_exc()
        else:   
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    # guide페이지 렌더링 프론트랑 연결시 필요없음
    def get(self, request):
        age = request.GET.get('age')
        sex = request.GET.get('sex')
        job = request.GET.get('job')
        grade = request.GET.get('grade')
        situation = request.GET.get('situation')
        subject = request.GET.get('subject')
        context = {
            'age': age,
            'sex': sex,
            'job': job,
            'grade': grade,
            'situation': situation,
            'subject': subject,
        }
        serializer = getGuideSerializer(data={'context': context})
        # 보내고자하는 data serialize
        
        if serializer.is_valid(raise_exception=True):
            print('valid')
            serialized_data = serializer.data
            response = Response(data=serialized_data)
            response.headers['Content-Type'] = 'application/json'
            try:
                return response
            except:
                traceback.print_exc() 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # 한페이지에서 작동하는거면 이 함수를 chatView에 다른이름으로 합치고 
    def get_chat_response(self, prompt, age, sex, job, grade, situation, subject):
        try:
            completion = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                        {"role": "system", "content": "당신은 'AI 코치'라는 이름의 한국어 챗봇입니다. GROW 코칭 모델을 기반으로 사용자가 원하는 질문을 만들어줍니다. 코칭 대상의 상황과 주제에 맞는 질문을 생성하고, 해당 질문이 GROW 모델의 어느 부분에 해당하는지 (Goal, Reality, Options, Will)를 알려주세요. 결과는 정확하게 다음과 같은 형식으로 제공해주세요: 'Goal: [질문 1], [질문 2]... Reality: [질문 1], [질문 2]... Options: [질문 1], [질문 2]... Will: [질문 1], [질문 2]...' 각 카테고리(Goal, Reality, Options, Will)에는 최소한 두 개의 질문이 있어야 하며, 모든 질문은 쉼표로 구분되어야 합니다."},
                        {"role": "user", "content": f"다음과 같은 정보를 가진 코칭 대상에 대한 질문을 생성해주세요. 나이: {age}, 직업: {sex}, 성별: {job}, 직급: {grade}, 설명: {situation} , 주제:{subject}"},
                ],
                max_tokens=3000,
                temperature=1,
            )
            #print(completion)
            result = completion.choices[0].message.content
            return result
        except openai.error.Timeout as e:
            result = "현재 ChatGPT서버에 문제가 발생하였습니다(Timeout). 잠시 후 다시 시도해주세요"
            return result
        except openai.error.APIError as e:
            result = "현재 ChatGPT서버에 문제가 발생하였습니다(APIError). 잠시 후 다시 시도해주세요"
            return result
        except openai.error.APIConnectionError as e:
            result = "현재 ChatGPT서버와 통신중에 문제가 발생하였습니다(APIConnectionError). 잠시 후 다시 시도해주세요"
            return result
        except openai.error.InvalidRequestError as e:
            result = "요청이 잘못되었습니다(InvalidRequestError). 요청 형식을 다시 한번 확인해주세요"
            return result
        except openai.error.AuthenticationError as e:
            result = "현재 ChatGPT서버와 통신중에 문제가 발생하였습니다(AuthenticationError). 잠시 후 다시 시도해주세요"
            return result
        except openai.error.PermissionError as e:
            result = "현재 ChatGPT서버와 통신중에 문제가 발생하였습니다(PermissionError). 잠시 후 다시 시도해주세요"
            return result
        except openai.error.RateLimitError as e:
            result = "질문을 너무 빠르게 입력하셨습니다(RateLimitError). 잠시 후 다시 시도해주세요"
            return result


# Persona/ View
class PersonaView(APIView):
    permission_classes=[IsAuthenticated]
    # 페르소나갱신
    def post(self, request):
        age = request.data.get('age')
        sex = request.data.get('sex')
        job = request.data.get('job')
        grade = request.data.get('grade')
        situation = request.data.get('situation')
        subject = request.data.get('subject')

        # MongoDB에 새 페르소나세션 생성
        # chatView와 마찬가지로 user_id 하드코딩중
        # access token 값 받아와서 유저 테이블이랑 비교해 ID 가져오기
        token_str = request.headers.get("Authorization").split(' ')[1]
        data = jwt.decode(token_str, SECRET_KEY, ALGORITHM)
        user_id = data['user_id']
        
        
        user = User.objects.get(id=user_id)
        try:            
            persona = PersonaSession(
                age=f"{age}",
                sex=f"{sex}",
                job=f"{job}",
                grade=f"{grade}",
                situation=f"{situation}",
                subject=f"{subject}",
                user=user
            )
            persona.save()
            persona_id = persona._id
            
            print(persona_id)
        except: 
            traceback.print_exc()  

        # person_id는 objectID이기 때문에 직렬화 필요 / 문자열로 변환
        person_id_str = str(persona_id)
        
        # 리다이렉트 URL에 파라미터 추가
        query_params = {
            'age': age,
            'sex': sex,
            'job': job,
            'grade': grade,
            'situation': situation,
            'subject': subject,
            'persona_id': person_id_str
        }
        redirect_url = reverse('chat') + '?' + urlencode(query_params)
        
        response_data = {
            'redirect_url': redirect_url
        }
        serializer = PersonaSerializer(data=response_data)
        # 보내고자하는 data serialize
        
        if serializer.is_valid(raise_exception=True):
            print('valid')
            serialized_data = serializer.data
            response = Response(data=serialized_data)
            response.headers['Content-Type'] = 'application/json'
            try:
                return response
            except:
                traceback.print_exc() 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)