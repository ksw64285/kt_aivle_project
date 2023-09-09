// import { Navigate } from 'react-router-dom';
// import { useAuthStore } from '../store/auth';

// const PrivateRoute = ({ children }) => {
//     const loggedIn = useAuthStore((state) => state.isLoggedIn)();
//     return loggedIn ? <>{children}</> : <Navigate to="/login" />;
// };

// export default PrivateRoute;
import { Navigate } from 'react-router-dom'
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
// 'react-router-dom'안에 Redirect는 사라지고 Routes안에는 Route만 넣을 것을 권고
// Redirect는 Route 아래 element 속성에 Navigate로 replace속성과 to="url" 속성을 넣어줘서 redirect가 가능하도록 한다.
const PrivateRoute = ({children}) => {
    let {user} = useContext(AuthContext)
    return (
      user ? <>{children}</> : <Navigate to="/login" />
  );
}

export default PrivateRoute;
