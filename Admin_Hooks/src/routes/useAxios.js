import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'

const baseURL = 'http://127.0.0.1:8000'


const useAxios = () => {

    const axiosInstance = axios.create({
        baseURL,
        headers:{'Content-type': 'multipart/form-data',},
        withCredentials: true,
    });


    axiosInstance.interceptors.request.use(async req => {
        const authUsers = JSON.parse(localStorage.getItem('authUser'))
        //NonAuthLayout으로 접근시에는
        if(authUsers){
            req.headers.Authorization = `Bearer ${authUsers.access}`
            const user = jwt_decode(authUsers.access)
            const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

            if(!isExpired) return req
        
            const response = await axios.post(`${baseURL}/userapp/token/refresh/`, {
                refresh: authUsers.refresh
            });

            const a = authUsers
            // 현재 local storage에 저장되어 있는 만료된 access token을 재발급한 access token을 재등록
            a.access = response.data.access
            
            localStorage.setItem('authUser', JSON.stringify(a))
            req.headers.Authorization = `Bearer ${response.data.access}`
        }
        
        return req
    })
    
    return axiosInstance
}

export default useAxios;