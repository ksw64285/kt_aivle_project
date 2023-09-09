import './App.css';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Home from './views/home';
// import MainWrapper from './layouts/MainWrapper';
import Login from './views/login';
import Logout from './views/Logout';
import PrivateRoute from './layouts/PrivateRoute';
// import Logout from './views/logout';
// import Private from './views/private';
// import Register from './views/register';
import Header from './components/Header'
import { AuthProvider } from './context/AuthContext'
import BlogList from './components/bloglist';
import BlogDetail from './components/blogdetail';
import BlogCreate from './components/blogcreate';
import BlogUpdate from './components/blogupdate';
import Chat from './components/chat';
import Guide from './components/guide';
import Persona from './components/persona';
import Register from './views/Register';
import BlogAdmin from './components/blogdetail_admin'

function App() {
    return (
        // <BrowserRouter>
        //     <MainWrapper>
        //         <Routes>
        //             <Route
        //                 path="/private"
        //                 element={
        //                     <PrivateRoute>
        //                         <Private />
        //                     </PrivateRoute>
        //                 }
        //             />
        //             <Route path="/" element={<Home />} />
        //             <Route path="/login" element={<Login />} />
        //             <Route path="/register" element={<Register />} />
        //             <Route path="/logout" element={<Logout />} />
        //         </Routes>
        //     </MainWrapper>
        // </BrowserRouter>
        <div className='App'>
            <Router>
                <AuthProvider>
                    <Header />
                    <Routes>
                        <Route path='/' 
                        element={
                            <PrivateRoute>
                                <Home />
                            </PrivateRoute>
                        }
                        exact/>
                        <Route path='/register' element={<Register />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/logout' element={<Logout />} />
                        <Route path="/board" element={<BlogList />} />
                        <Route path="/board/:id" element={<BlogDetail />} />
                        <Route path="/board/:id/admin" element={<BlogAdmin />} />
                        <Route path="/board/create" element={<BlogCreate />} />
                        <Route path="/board/:id/edit" element={<BlogUpdate />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/persona" element={<Persona />} />
                        <Route path="/guide" element={<Guide />} />
                    </Routes>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;