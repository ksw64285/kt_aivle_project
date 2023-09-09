import {
  GET_CHATS,
  GET_CHATS_FAIL,
  GET_CHATS_SUCCESS,
  GET_GROUPS,
  GET_GROUPS_FAIL,
  GET_GROUPS_SUCCESS,
  GET_CONTACTS,
  GET_CONTACTS_FAIL,
  GET_CONTACTS_SUCCESS,
  GET_MESSAGES,
  GET_MESSAGES_FAIL,
  GET_MESSAGES_SUCCESS,
  POST_ADD_MESSAGE,
  POST_ADD_MESSAGE_FAIL,
  POST_ADD_MESSAGE_SUCCESS,
  COACHING_MESSAGE_SUCCESS,
  COACHING_MESSAGE_FAIL,
  GET_PERSONALIST,
  GET_PERSONALIST_FAIL,
  GET_PERSONALIST_SUCCESS,
  GET_CHATHISTORY_SUCCESS,
  GET_CHATHISTORY_FAIL,
  POST_ADD_GUIDE,
  POST_ADD_GUIDE_SUCCESS,
  POST_ADD_GUIDE_FAIL,
  INIT_MESSAGES,
} from "./actionTypes"

export const getChats = () => ({
  type: GET_CHATS,
})

export const getChatsSuccess = chats => ({
  type: GET_CHATS_SUCCESS,
  payload: chats,
})

export const getChatsFail = error => ({
  type: GET_CHATS_FAIL,
  payload: error,
})

export const getGroups = () => ({
  type: GET_GROUPS,
})

export const getGroupsSuccess = groups => ({
  type: GET_GROUPS_SUCCESS,
  payload: groups,
});

export const getGroupsFail = error => ({
  type: GET_GROUPS_FAIL,
  payload: error,
})

export const getContacts = () => ({
  type: GET_CONTACTS,
})

export const getContactsSuccess = contacts => ({
  type: GET_CONTACTS_SUCCESS,
  payload: contacts,
})

export const getContactsFail = error => ({
  type: GET_CONTACTS_FAIL,
  payload: error,
})

// 채팅방 변경시 메세지 불러오기

export const getMessages = roomId => ({
  type: GET_MESSAGES,
  roomId,
})

export const getMessagesSuccess = chathistory => ({
  type: GET_MESSAGES_SUCCESS,
  payload: chathistory,
})

export const getMessagesFail = error => ({
  type: GET_MESSAGES_FAIL,
  payload: error,
})

// 메세지 추가

export const addMessage = (message, params) => ({
  type: POST_ADD_MESSAGE,
  message,
  params,
})

export const addMessageSuccess = answermessage => ({
  type: POST_ADD_MESSAGE_SUCCESS,
  payload: answermessage,
})

export const addMessageFail = error => ({
  type: POST_ADD_MESSAGE_FAIL,
  payload: error,
})

// 코칭 메세지
export const addCoachingMessageSuccess = coachingmessage => ({
  type: COACHING_MESSAGE_SUCCESS,
  payload: coachingmessage,
})

export const addCoachingMessageFail = error => ({
  type: COACHING_MESSAGE_FAIL,
  payload: error,
})

// 페르소나 리스트

export const getPersonalist = () => ({
  type: GET_PERSONALIST,
})

export const getPersonalistSuccess = personalist => ({
  type: GET_PERSONALIST_SUCCESS,
  payload: personalist,
})

export const getPersonalistFail = error => ({
  type: GET_PERSONALIST_FAIL,
  payload: error,
})

// 챗 히스토리 / 페르소나 리스트 get할때 같이 갱신

export const getChatHistoryMessageSuccess = chathistory => ({
  type: GET_CHATHISTORY_SUCCESS,
  payload: chathistory,
})

export const getChatHistoryMessageFail = error => ({
  type: GET_CHATHISTORY_FAIL,
  payload: error,
})

// guide

export const addGuide = params => ({
  type: POST_ADD_GUIDE,
  params,
})

export const addGuideSuccess = guidemessage => ({
  type: POST_ADD_GUIDE_SUCCESS,
  payload: guidemessage,
})

export const addGuideFail = error => ({
  type: POST_ADD_GUIDE_FAIL,
  payload: error,
})


export const initMessages = () => ({
  type: INIT_MESSAGES
});
