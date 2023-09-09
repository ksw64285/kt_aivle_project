import {
  GET_GROUPS_SUCCESS,
  GET_CHATS_SUCCESS,
  GET_GROUPS_FAIL,
  GET_CHATS_FAIL,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAIL,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
  POST_ADD_MESSAGE,
  POST_ADD_MESSAGE_SUCCESS,
  POST_ADD_MESSAGE_FAIL,
  COACHING_MESSAGE_SUCCESS,
  COACHING_MESSAGE_FAIL,
  GET_PERSONALIST_FAIL,
  GET_PERSONALIST_SUCCESS,
  GET_CHATHISTORY_SUCCESS,
  GET_CHATHISTORY_FAIL,
  POST_ADD_GUIDE,
  POST_ADD_GUIDE_SUCCESS,
  POST_ADD_GUIDE_FAIL,
  INIT_MESSAGES,
} from "./actionTypes"

const chatinitmessage = {
  id: 0,
  sender:"ChatGPT",
  message:"ChatGPT와 롤플레잉을 시작해보세요",
  createdAt: new Date(),
}

const guideinitmessage = {
    id: 0,
    sender:"ChatGPT",
    message:"ChatGPT에게 추천 질문을 받아보세요",
    createdAt: new Date(),
}

//최초의 redux store 생성
const INIT_STATE = {
  chats: [],
  groups: [],
  contacts: [],
  messages: [chatinitmessage],
  error: {},
  personalist: [],
  coachingmessage: [],
  chathistory: [],
  guidemessage: [guideinitmessage],
}

const Calendar = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CHATS_SUCCESS:
      return {
        ...state,
        chats: action.payload,
      }

    case GET_CHATS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_GROUPS_SUCCESS:
      return {
        ...state,
        groups: action.payload,
      }

    case GET_GROUPS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: action.payload,
      }

    case GET_CONTACTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        chathistory: action.payload,
      }

    case GET_MESSAGES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case POST_ADD_MESSAGE:
      return {
        ...state, // 기존의 상태 객체의 속성을 복사
        messages: [...state.messages, action.message], //새로운 값을 할당하여 업데이트
        params: action.params
      }
    
    case POST_ADD_MESSAGE_SUCCESS:
      return {
        ...state, // 기존의 상태 객체의 속성을 복사
        messages: [...state.messages, action.payload], //새로운 값을 할당하여 업데이트
      }

    case POST_ADD_MESSAGE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case COACHING_MESSAGE_SUCCESS:
      return {
        ...state,
        coachingmessage: action.payload
      }
    
    case COACHING_MESSAGE_FAIL:
      return{
        ...state,
        error: action.payload
      }

    case GET_PERSONALIST_SUCCESS:
      return {
        ...state,
        personalist: action.payload,
      }
    case GET_PERSONALIST_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    
    case GET_CHATHISTORY_SUCCESS:
      return {
        ...state,
        chathistory: action.payload,
      }

    case GET_CHATHISTORY_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case POST_ADD_GUIDE:
      return {
        ...state,
        params: action.params,
      }

    case POST_ADD_GUIDE_SUCCESS:
      return {
        ...state,
        guidemessage: [...state.guidemessage, action.payload],
      }

    case POST_ADD_GUIDE_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    
    case INIT_MESSAGES:
      return {
        ...state,
        messages: [],
        guidemessage: [guideinitmessage],
        loading: false,
        error: null
      };

    default:
      return state
  }
}

export default Calendar
