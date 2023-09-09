import { takeEvery, fork, put, all, call } from "redux-saga/effects"

//Account Redux states
import { REGISTER_USER } from "./actionTypes"
import { registerUserSuccessful, registerUserFailed } from "./actions"

import useAxios from '../../../routes/useAxios'
//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postFakeRegister,
  postJwtRegister,
} from "../../../helpers/fakebackend_helper"

// initialize relavant method of both Auth
const fireBaseBackend = getFirebaseBackend()
let api = useAxios()


export const signUp = async (user) => {

  
  const birth = user['date_of_birth']
  const year = birth.getFullYear();
  const month = birth.getMonth() + 1;
  const date = birth.getDate();
  let bd = `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`
  
  try{
      const response = await api.post('/userapp/registration/',
          {
              'name': user.name,
              'email' :user.email,
              'password1' : user.password1,
              'password2' : user.password2,
              'gender' : user.gender,
              'date_of_birth' : bd,
              'belong' : user.belong,
              'grade' : user.grade
          })
      //   "username": "",
      // "email": "",
      // "password1": "",
      // "password2": "",
      // "gender": null,
      // "date_of_birth": null,
      // "belong": "",
      // "grade": ""
        return response
      }
  catch (err) {
      console.log(err)
      throw err
  }
}

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user , history } }) {

  console.log("using the following url for registration: ")
  
  try {
    console.log("Trying to register user (within try block)")
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(
        fireBaseBackend.registerUser,
        user.email,
        user.password
      )
      yield put(registerUserSuccessful(response))
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      
      const response = yield call(signUp, user)
      yield put(registerUserSuccessful(response));

    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      const response = yield call(postFakeRegister, user)
      yield put(registerUserSuccessful(response))
    }
    history('/login');
  } catch (error) {
    console.log(error)
    if(error.response.status === 400 || error.response.status === 401){
      yield put(registerUserFailed('해당 아이디, 비밀번호가 존재합니다'));
    }
    history('/register');
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser);
}

function* accountSaga() {
  yield all([fork(watchUserRegister)])
}

export default accountSaga
