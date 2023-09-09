// 유튜브에서 생성
import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import AuthContext from '../context/AuthContext';

const Header = () => {
  // Context 접근하기(Hook) : useContext(Context)
  // React Hook에서 COntext의 Provider values에 접근할 때 사용되는 방법
  //이때 사용되는 인자는 context 객체 그자체
  let {user, logoutUser} = useContext(AuthContext)
  return (
    <div>
       <Link to='/'>Home</Link>
        <span> | </span>
        {user ? (<Link to='/logout'>Logout</Link>)
         : (<Link to='/login'>Login</Link>)}
        <span> | </span>
        {user ? (<Link to='/board'>Board</Link>)
         : (<Link to='/register'>signup</Link>) }
        {user ? (<span> | <Link to='/chat'>Chat</Link></span>)
         :(<p> </p>)}
        {user ? (<span> | <Link to='/guide'>Guide</Link></span>)
         :(<p> </p>)}
        {user && <p>Hello {user.user_id}</p>}
        
    </div>
  )
}

export default Header