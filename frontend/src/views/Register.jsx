import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'


const Register = () => {
  const {registerUser} = useContext(AuthContext)
  return (
    <div>
        <form onSubmit={registerUser}>
          <div>
            <input type='text' name="email" placeholder='Enter Email'/>
          </div>
          <div>
            <input type='text' name="username" placeholder='Enter User Name'/>
          </div>
          <div>
            <input type='password' name="password1" placeholder='Enter Password'/>
          </div>
          <div>
            <input type='password' name="password2" placeholder='check Password'/>
          </div>
          <div>
            <select name='gender'>
                  <option value='0'>Female</option>
                  <option value='1'>Male</option>
                  <option value='2'>Not to disclose</option>
              </select>
          </div>
          <div>
            <input type='date' name="date_of_birth" placeholder='Enter date_of_birth'/>
          </div>
          <div>
            <input type='text' name="belong" placeholder='Enter belong'/>
          </div>
          <div>
            <input type='text' name="grade" placeholder='Enter grade'/>
          </div>
          <div>
            <input type='submit'/>
          </div>
        </form>
    </div>
  )
}

export default Register