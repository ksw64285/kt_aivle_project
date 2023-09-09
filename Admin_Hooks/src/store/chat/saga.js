import axios from 'axios';
import { takeEvery, takeLatest, put, call, select } from "redux-saga/effects";
import useAxios from '../../routes/useAxios'
let api = useAxios()

// Chat Redux States
import {
  GET_CHATS,
  GET_CONTACTS,
  GET_GROUPS,
  GET_MESSAGES,
  POST_ADD_MESSAGE,
  GET_PERSONALIST,
  POST_ADD_GUIDE,
  INIT_MESSAGES,
} from "./actionTypes";
import {
  getChatsSuccess,
  getChatsFail,
  getGroupsSuccess,
  getGroupsFail,
  getContactsSuccess,
  getContactsFail,
  getMessagesSuccess,
  getMessagesFail,
  addMessageSuccess,
  addMessageFail,
  addCoachingMessageSuccess,
  addCoachingMessageFail,
  getPersonalistSuccess,
  getPersonalistFail,
  getChatHistoryMessageSuccess,
  getChatHistoryMessageFail,
  addGuideSuccess,
  addGuideFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getChats,
  getGroups,
  getContacts,
  getMessages,
  addMessage,
} from "../../helpers/fakebackend_helper";

let cnt = 0;

function* onGetChats() {
  try {
    const response = yield call(getChats);
    yield put(getChatsSuccess(response));
  } catch (error) {
    yield put(getChatsFail(error));
  }
}

function* onGetGroups() {
  try {
    const response = yield call(getGroups);
    yield put(getGroupsSuccess(response));
  } catch (error) {
    yield put(getGroupsFail(error));
  }
}

function* onGetContacts() {
  try {
    const response = yield call(getContacts);
    yield put(getContactsSuccess(response));
  } catch (error) {
    yield put(getContactsFail(error));
  }
}

//
function* onGetMessages({ roomId }) {
  try {
    const arr = yield select(state => state.chat.chathistory);

    yield put(getMessagesSuccess(arr));
  } catch (error) {
    yield put(getMessagesFail(error));
  }
}

//메세지 서버에 post하는 부분 추
function* onAddMessage({ message, params }) {
  try {
    const response = yield api.post('/chat/', { 
      message: message.message,
      age : params.age,
      sex : params.sex,
      job : params.job,
      grade : params.grade,
      situation: params.situation,
      subject: params.subject,
      persona_id: params.persona_id,
   });
    const answermessage = {
      id: message.id + 1,
      roomId: message.roomId,
      sender:"ChatGPT",
      message:response.data.answer,
      createdAt: new Date(),
    };
    yield put(addMessageSuccess(answermessage));
    yield put(addCoachingMessageSuccess(response.data.prediction));
  } catch (error) {
    yield put(addMessageFail(error));
    yield put(addCoachingMessageFail(error));
  }
}

function* onGetPersonalist() {
  try {
    const response = yield api.get('/chat/');
    let chathistory = [];
    const arr = response.data.chatlist;
    for(let i = 0; i < arr.length; i++){
      const value = arr[i];
      const quemessage = {
        id:value.id + "Q",
        persona_id: value.persona_id,
        sender:"You",
        message:value.question,
        createdAt: value.my_datetime_field,
      };
      chathistory.push(quemessage);
      const ansmessage = {
        id: value.id + "A",
        persona_id: value.persona_id,
        sender:"ChatGPT",
        message:value.answer,
        createdAt: value.my_datetime_field,
      };
      chathistory.push(ansmessage);
     
    }
    yield put(getPersonalistSuccess(response.data.personalist));
    yield put(getChatHistoryMessageSuccess(chathistory));
  } catch (error) {
    yield put(getPersonalistFail(error));
    yield put(getChatHistoryMessageFail(error));
  }

}

function* onAddGuide({ params }) {
  try {
    const response = yield api.post('/chat/guide', { 
      age : params.age,
      sex : params.sex,
      job : params.job,
      grade : params.grade,
      situation: params.situation,
      subject: params.subject,
   });
    const answermessage = {
      id: params.persona_id + "G",
      sender:"ChatGPT",
      message:response.data.response,
      createdAt: new Date(),
    };
    yield put(addGuideSuccess(answermessage));
  } catch (error) {
    yield put(addGuideFail(error));
  }
}

function* initMessages() {

}

//redux store 상태변화 감지
function* chatSaga() {
  yield takeEvery(GET_CHATS, onGetChats);
  yield takeEvery(GET_GROUPS, onGetGroups);
  yield takeEvery(GET_CONTACTS, onGetContacts);
  yield takeEvery(GET_MESSAGES, onGetMessages);
  yield takeEvery(POST_ADD_MESSAGE, onAddMessage);
  yield takeEvery(GET_PERSONALIST, onGetPersonalist);
  yield takeEvery(POST_ADD_GUIDE, onAddGuide);
  yield takeLatest(INIT_MESSAGES, initMessages);
}

export default chatSaga;
