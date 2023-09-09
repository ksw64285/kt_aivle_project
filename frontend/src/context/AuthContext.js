import { createContext, useEffect, useState} from "react";
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()


export default AuthContext;

export const AuthProvider = ({children}) => {
    console.log('Update token called')
    
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)
    
    // useHistory는 useNavigate로 변경됨, v5 -> v6으로 바뀜으로 인해
    let navigate = useNavigate()

    const registerUser = async (e) => {
        e.preventDefault()
        console.log(e.target.username.value)
        console.log(e.target.email.value)
        console.log(e.target.password1.value)
        console.log(e.target.password2.value)
        console.log(e.target.date_of_birth.value)
        console.log(e.target.gender.value)

        let response = await fetch('http://127.0.0.1:8000/userapp/registration/', {
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            credentials: 'include',
            body:JSON.stringify({"username": e.target.username.value, 
                                'email':e.target.email.value, 
                                'password1':e.target.password1.value,
                                'password2':e.target.password2.value,
                                'gender':e.target.gender.value,
                                'date_of_birth':e.target.date_of_birth.value,
                                'belong':e.target.belong.value,
                                'grade':e.target.grade.value}),

        })

        if(response.status === 201 || response.status === 200){
            navigate('/')
        }else{
            alert('something went wrong!')
        }
    }


    let loginUser = async (e ) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/userapp/login/', {
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            credentials: 'include',
            body:JSON.stringify({"username": "", 'email':e.target.email.value, 'password':e.target.password.value}),

        })
        
        let data = await response.json()
        
        console.log(jwt_decode(data.access))
        

        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            //access token을 browser에 저장 
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        }else{
            alert('something went wrong!')
        }
    } 
    //그냥 localStorage에서 삭제
    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }
    
    let contextData = {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,
        registerUser:registerUser,
        authTokens:authTokens
    }

    let updateToken = async () => {
        console.log('Updata token')
        let response = await fetch('http://127.0.0.1:8000/userapp/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            credentials: 'include',
            body:JSON.stringify({"refresh": authTokens?.refresh}),
        })

        let data = await response.json()
        console.log(data)

        if (response.status === 200){
            const a = JSON.parse(localStorage.getItem('authTokens'))
            a.access = data.access
            setAuthTokens(a)
            setUser(jwt_decode(data.access))
            //access token을 browser에 저장 
            localStorage.setItem('authTokens', JSON.stringify(a))
        }else{
            logoutUser()
        }
        if(loading){
            setLoading(false)
        }
    }

    useEffect(() => {
        if(loading){
            updateToken()
        }
        let fourMinutes = 1000 * 60 * 4
        let interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)
    }, [authTokens, loading])


    // Context 전달하기: Context.Provider
    return(
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}