import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";
import authInstance from '../../../routes/axiosInstance'
import useAxios from '../../../routes/useAxios'
let api = useAxios()
//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeLogin,
  postJwtLogin,
  postSocialLogin,
} from "../../../helpers/fakebackend_helper";
// import axiosInstance from "routes/axiosInstance";


export const signIn = async (user) => {
  try{
  //     const response = await fetch('http://127.0.0.1:8000/userapp/login/', {
  //     method:'POST',
  //     headers:{
  //         'Content-Type' : 'application/json',
  //     },
  //     credentials: 'include',
  //     body:JSON.stringify({"username": "", 
  //     'email':user.email, 
  //     'password':user.password}),
    const response = await api.post('/userapp/login/',
    {"username": "", 
        'email':user.email, 
        'password':user.password})

    return response
  }
  catch (err) {
      console.log(err)
      throw err
  }
  
}
const fireBaseBackend = getFirebaseBackend();
function* loginUser({ payload: { user, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const response = yield call(
        fireBaseBackend.loginUser,
        user.email,
        user.password
      );
      yield put(loginSuccess(response));
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      //error 객체에 대한 return 값이 없을떄 오류가 발생한다
      const response = yield call(signIn, user)

      localStorage.setItem("authUser", JSON.stringify(response.data));
      
      yield put(loginSuccess(response));
      //로그인이 성공했을때 더는 popup창을 보여주지 않습니다.
      yield put(apiError(''));
      
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      const response = yield call(postFakeLogin, {
        email: user.email,
        password: user.password,
      });
      console.log(response.status)

    }
    history('/dashboard');
  } catch (error) {
    console.log('Error')
    // 400 error가 발생했을때 다시 로그인 화면으로 돌아가도록 합니다.
    //여기다 if를 넣고 현재 오류가 무엇인지 확인
    if(error.response.status === 400 || error.response.status === 401){
      yield put(apiError('아이디 또는 비밀번호가 틀렸습니다. 다시 입력해주세요.'));
    }
    history('/login');
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser");
    
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout);
      yield put(logoutUserSuccess(response));
    }
    // history('/login');
    // window.location.reload(); // 페이지 새로 고침
    window.location.assign('/login');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* socialLogin({ payload: { type, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend();
      const response = yield call(fireBaseBackend.socialLoginUser, type);
      
      if (response) {
        history('/dashboard');
      } else {
        history('/login');
      }
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    }
    
    history('/dashboard');
  } catch (error) {
    console.log("error",error)
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeLatest(SOCIAL_LOGIN, socialLogin);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
