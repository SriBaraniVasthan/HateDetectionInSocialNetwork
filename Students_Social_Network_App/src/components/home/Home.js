import Body from "../body/Body";
import Header from "../Header";
import { useState, useEffect } from 'react';
import Axios from "axios";
import AuthService from "../../services/AuthService";
import Constant from "../../constants/Constant";

const Home = ({groupId}) => {

    const [userData, setUserData] = useState({name:"User Name", email:"user@mail.com"});
    const userUrl = Constant.base_url+"api/user";


    useEffect(() => {
        const token = AuthService.getCurrentUserToken();
        Axios.defaults.headers.common['Authorization'] = token;
        Axios.get(userUrl)
        .then(res => {
            setUserData(res.data);
            localStorage.setItem('profile_pic_url', res.data.userProfile.imageUrl);
        })
        .catch(res => {
            console.log(res);
        })

    },[]);

    return (
        <div style={{overflow:'hidden'}}>
            <Header currElement={groupId != undefined ? 'groups' : 'home'}/>
            <Body user={userData} groupId={groupId}/>
        </div>
    );
}

export default Home;