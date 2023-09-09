import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import AuthContext from '../context/AuthContext';


const Chat = () => {
    let {authTokens} = useContext(AuthContext)
    let navigate = useNavigate()
    let [persona, setpersona] = useState([])
    let [personas, setpersonas] = useState([])
    let [chats, setchats] = useState([])
    
    let [message, setmessage] = useState('')
    let [answers, setanswers] = useState([])
    let [predictions, setpredictions] = useState([])
    let [message_list, setmessage_list] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target)
        if(message.trim() !== ''){
            try{
                const response = await axios.post('http://localhost:8000/chat/', {
                    message: message,
                    age : persona.age,
                    sex : persona.sex,
                    job : persona.job,
                    grade : persona.grade,
                    situation: persona.situation,
                    subject: persona.subject,
                    persona_id: persona.persona_id,
                }, {
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization' : 'Bearer ' + String(authTokens.access)
                    },
                  });
                console.log(response)
                setanswers(response.data.answer)
                setpredictions(response.data.predictions)
                setmessage_list(message)

                // const audioPlayer = document.getElementById('audio-player'); 
                // const mediaUrl = '{% get_media_prefix %}'; 
                // console.log(mediaUrl); 
                // audioPlayer.src = mediaUrl + 'tts.mp3'; 
                // audioPlayer.load(); // 음성 파일 로드

                // audioPlayer.onloadedmetadata = function () { audioPlayer.play(); };
                console.log(message_list)
            }catch (error){
                console.error(error.response.data);     // NOTE - use "error.response.data` (not "error")
            }
        }
    };


    const chatlist = async (persona) => {
        console.log('chatlist!!')
        try{
            const response = await axios.get('http://localhost:8000/chat/', {persona}, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization' : 'Bearer ' + String(authTokens.access)
                },
              });

            setpersona(response.data.context)
            // request, context
            setpersonas(response.data.context.personalist)
            setchats(response.data.context.chatlist)
        }catch (error){
            console.error(error);
        }
    }

    const chatlist_init = async () => {
        console.log('chatlist-init!!')
        
        try {
            let response = await axios.get('http://localhost:8000/chat/', {
                    headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization' : 'Bearer ' + String(authTokens.access)
                    },
                });
                console.log(response)
            // request, context
            setpersonas(response.data.personalist)
            setchats(response.data.chatlist)
        } catch (error) {
            console.error(error.response.data);     // NOTE - use "error.response.data` (not "error")
        }
    }

    const move_persona = () => {
        navigate('/persona')
    }
    
    useEffect(() => {
        console.log(persona)
        if(persona.length){
            chatlist(persona)
        }else{
            chatlist_init()
        }
      },[persona])

    // const handleVoice = async (e) => {

    //     const startVoiceRecognition = () => {
    //         var recognition = new webkitSpeechRecognition();
    //         recognition.continuous = false;
    //         recognition.lang = 'ko-KR';
    //         recognition.interimResults = false;
    //         recognition.onresult = function(event) {
    //         var result = event.results[0][0].transcript;
    //         setmessage(result);
    //         };
    //         recognition.start();
    //     }
    //     startVoiceRecognition()
    // }
    //         // 음성 인식 버튼 클릭 이벤트 처리
    //         $('#voice-input-btn').click(function() {
    //             startVoiceRecognition();
    //         });

    //         // 음성 인식 시작
    //         function startVoiceRecognition() {
    //             var recognition = new webkitSpeechRecognition();
    //             recognition.continuous = false;
    //             recognition.lang = 'ko-KR';
    //             recognition.interimResults = false;
    //             recognition.onresult = function(event) {
    //                 var result = event.results[0][0].transcript;
    //                 $('#message-input').val(result);
    //             };
    //             recognition.start();
    //         }

    //     });
    // </script>

  return (
    <div>
    <div id="chatbox">
        <div id="messages"></div>
        <form id="chat-form">
            <input type="text" value={message} onChange={(e) => setmessage(e.target.value)} placeholder="Type your message..."/>
            <button type="submit" onClick={handleSubmit}>Send</button>
        </form>
        <button >Start Voice Input</button>
        <div id="personalist">
        
        {personas.map((v) => {
            return (
            <div key={v.id}>
                <p>{v.age}</p> 
                <p>{v.sex}</p> 
                <p>{v.job}</p> 
                <p>{v.grade}</p> 
                <p>{v.situation}</p> 
                <p>{v.subject}</p>
                {chats.filter(chat => chat.persona_id === v.id).map(chat => ( 
                <div key={chat.id}> 
                    <p>{chat.persona_id}</p> 
                    <p>{chat.question}</p> 
                    <p>{chat.answer}</p> 
                </div> ))} 
                </div>
        )
    }
        )}

        
        </div>

         <input type="hidden" id="age-input" name="age"  value="{{ age }}" />
         <input type="hidden" id="sex-input" name="sex"  value="{{ sex }}" />
         <input type="hidden" id="job-input" name="job"  value="{{ job }}" />
         <input type="hidden" id="grade-input" name="grade"  value="{{ grade }}" />
         <input type="hidden" id="situation-input" name="situation"  value="{{ situation }}" />
         <input type="hidden" id="subject-input" name="subject"  value="{{ subject }}" />
         <input type="hidden" id="persona_id-input" name="persona_id"  value="{{ persona_id }}" />
    </div>
    <div>
        <audio id="audio-player"></audio>
    </div>
    <div>
        <button type="submit" onClick={move_persona}>Create Persona</button>
    </div>
    </div>
  )
}

export default Chat
