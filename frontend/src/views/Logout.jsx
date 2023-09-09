import { useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Logout = () => {
    let {logoutUser} = useContext(AuthContext)

    useEffect(() => {
        logoutUser()
    },[]);

    return;
};

export default Logout;