import axios from 'axios'
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs'
const baseURL = 'http://127.0.0.1:8000'

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
            'Content-type': 'application/json',},
    withCredentials: true,
  });

// Add a request interceptor
axiosInstance.interceptors.request.use(async req => {
    // Do something before request is sent
    //authUser가 있으면 해당 요청에 authUser값을 넣어준다.
    //localStorage에 authUser가 있다는 것은 로그인이 되었다는 것임 없으면 안된거라 그냥 요청 보내면 됨
    if(localStorage.getItem("authUser")){
        // 평소 페이지에 접근할때 localStorage는 분명히 있어야한다.
        //그래서 거기서 accessToken을 가지고 올 수 있어야합
        // authUser에 access token이 있음
        let authUser = localStorage.getItem('authUser')
        const user = jwt_decode(authUser.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        console.log('isExpired:', isExpired)
        //
        if(!isExpired) return req

        const response = await axios.post(`${baseURL}}/userapp/token/refresh/`,{
              refresh:authUser.refresh
        })
        authUser.access = response.data
        console.log(response.data)
        console.log(authUser)
        localStorage.setItem('authUser', JSON.stringify(authUser))
        req.headers.Authorization = `Bearer ${authUser?.access}`
    }
    
    
    return req;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axiosInstance.interceptors.response.use(async res => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return res;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export default axiosInstance;