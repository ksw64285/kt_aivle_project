import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const Login = () => {
  let {loginUser} = useContext(AuthContext)
  return (
    <div>
        <form onSubmit={loginUser}>
            <input type='text' name="email" placeholder='Enter Email'/>
            <input type='password' name="password" placeholder='Enter Password'/>
            <input type='submit'/>
        </form>
    </div>
  )
}

export default Login
