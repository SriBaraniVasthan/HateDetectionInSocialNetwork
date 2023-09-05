
import { useState, useEffect, useRef } from 'react';
import Constant from '../../constants/Constant';
import Header from '../Header';
import AlertBox from '../utils/AlertBox';
import AuthService from '../../services/AuthService';
import Axios from 'axios';

const ChangePassword = () => {


    const [currPassword, setCurrPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [showalert, setShowalert] = useState(false);
    const [alert, setAlert] = useState("");
    const [type, setType] = useState("");

    const userUrl = Constant.base_url+"api/user/changepassword";

    const changepassword = (e) => {
        e.preventDefault();
        if(newPassword != conPassword)
        {
            setShowalert(true);
            setAlert("Password and confirm password should be same !");
            setType("warning");
            return;
        }
        const token = AuthService.getCurrentUserToken();
        Axios.defaults.headers.common['Authorization'] = token;
        const formData = new FormData();
        formData.append("oldpwd", currPassword);
        formData.append("newpwd", newPassword);
        formData.append("confirmpwd", conPassword);
        
        Axios.post(userUrl, formData)
        .then(res => {
            setShowalert(true);
            setAlert("Password changed successfully !");
            setType("success");
        })
        .catch(res => {
            setShowalert(true);
            setAlert("Error while changing password");
            setType("danger");
        })
    }

    return (
        <div style={{overflow:'hidden'}}>
            <Header currElement={''}/>
            <div className="container-fluid main-body-bg">
            <div className="row">
                <div className="col-sm-2">
                </div>
                <div className="col-sm">
                        <div className='background-color m-5 p-5 '>
                        <div className='p-5'>
                            
                        {showalert && <AlertBox variant={type} message={alert}/>}
                        <form onSubmit={(e) => changepassword(e)}>
                        <div class="form-group mt-3">
                            <label htmlFor="exampleInputPassword1">Current Password</label>
                            <input type="password" class="form-control" onChange={(e) => setCurrPassword(e.target.value)} id="exampleInputPassword1" placeholder="Current Password"/>
                        </div>
                        
                        <div class="form-group mt-3">
                            <label htmlFor="exampleInputPassword1">New Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword2" onChange={(e) => setNewPassword(e.target.value)}  placeholder="New Password"/>
                        </div>
                        
                        <div class="form-group mt-3">
                            <label htmlFor="exampleInputPassword1">Confirm Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword3" onChange={(e) => setConPassword(e.target.value)}  placeholder="Confirm Password"/>
                        </div>
                        <div className='text-center mt-5'>
                            
                            <button type="submit" class="btn btn-primary text-center">Change Password</button>
                        </div>
                        </form>

                        </div>
                    </div>
                    
                </div>
                <div className="col-sm-2">
                </div>
            </div>
        </div>
        </div>
        
    );
}

export default ChangePassword;