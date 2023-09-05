import './App.css';
import Header from './components/Header';
import Body from './components/body/Body';
import { Route, Routes } from "react-router-dom";
import InstitutionLogin from './components/institutionLogin/InstitutionLogin';
import InstitutionSignup from './components/institutionLogin/InstitutionSignup';
import InstitutionHome from './components/institutionAdminPanel/InstitutionHome';
import PrivateRoutes from './components/utils/PrivateRoute';
import LoginPage from './components/loginPage/LoginPage';
import RegisterPage from './components/loginPage/RegisterPage';
import Constant from './constants/Constant';
import Home from './components/home/Home';
import PeerPage from './components/peerPage/PeerPage';
import GroupPage from './components/groupPage/GroupPage';
import EventPage from './components/eventsPage/EventPage';
import ProfilePage from './components/profilePage/ProfilePage';
import PeerProfilePage from './components/profilePage/PeerProfilePage';
import ChangePassword from './components/changePassword/ChangePassword';
import GroupPostPage from './components/groupPage/GroupPostPage';

function App() {
  return (
    <div className='main-bg'>
      <Routes> 
        
        <Route exact path="/" element = { <LoginPage/> } /> 
        <Route exact path="/register" element = { <RegisterPage/> } />

        
        <Route element={<PrivateRoutes navigateTo="/" userType={Constant.userTypes.USER} />}>
          <Route exact path="/home" element={ <Home /> } />
          <Route exact path="/peers" element={ <PeerPage /> } />
          <Route exact path="/groups" element={ <GroupPage /> } />
          <Route exact path="/events" element={ <EventPage /> } />
          <Route exact path="/profile" element={ <ProfilePage /> } />
          <Route path='/peers/:id' element={<PeerProfilePage/>} /> 
          <Route path='/groups/:id' element={<GroupPostPage/>} />          
          <Route path='/changepassword' element={<ChangePassword/>} />
        </Route>
        
        <Route exact path="/institution" element={ <InstitutionLogin /> } />
        <Route element={<PrivateRoutes navigateTo="/institution" userType={Constant.userTypes.ADMIN} />}>
          <Route exact path="/institution/home" element={ <InstitutionHome /> } />
        </Route>

        <Route exact path="/institution/create" element = { <InstitutionSignup/> } />
        
        
      </Routes>

    </div>
  );
}

export default App;
