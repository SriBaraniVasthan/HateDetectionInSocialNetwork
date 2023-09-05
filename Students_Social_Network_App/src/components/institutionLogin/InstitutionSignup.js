import { Link, Navigate } from 'react-router-dom';
import AlertBox from '../utils/AlertBox';
import './insLogin.css';
import { useState } from 'react';
import Axios from 'axios';
import Constant from '../../constants/Constant';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InstitutionSignup = () => {

    const [alert, setAlert] = useState({show:false, type:"", message:""});

    const [data, setData] = useState({name:"", adminMail:"", password:"", confirmPassword:""})

    const [navigate, setNavigate] = useState(false);

    const url = Constant.base_url+"api/institute/create"

    const handleUpdate = (e) =>{
        const newdata = {...data};
        newdata[e.target.id] = e.target.value;
        setData(newdata);
    }

    const setAlertBox = (show, type, message) => {
        const newAlert = {};
        newAlert.show = show;
        newAlert.type = type;
        newAlert.message = message;
        setAlert(newAlert);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(data.password != data.confirmPassword || data.password.length < 8)
        {
            const message = data.password.length >= 8 ? "Password and Confirm Password do not match!" : "Password must be atleast 8 characters long!";
            setAlertBox(true, "warning", message);
            return;
        }

        Axios.post(url, data)
        .then(res => {
            setAlertBox(true, "success", "Institution Created successfully !");
            setTimeout(function (){
                setNavigate(true);                        
              }, 1000); 
        })
        .catch(res => {
            setAlertBox(true, "danger", "Error while creating institution !");
        })
    }
    
    return (
        <div className="content inst-container">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 contents">
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <div className="form-block position-relative institution-signup">
                                    <Link to="/institution" className='mb-2 position-absolute arrow-position'>
                                        <span><FontAwesomeIcon icon={faLeftLong} color='black' className='photo-text'></FontAwesomeIcon></span>
                                    </Link>
                                    <div className="mb-4">
                                        <h3>Institution Signup</h3>
                                    </div>
                                    {navigate && <Navigate to="/institution" replace={true} />}
                                    {alert.show && <AlertBox variant={alert.type} message={alert.message} />}
                                    <form onSubmit={(e) => handleSubmit(e)}>
                                        <div>
                                            <label htmlFor="name">Institution Name</label>
                                            <input autoComplete='off' onChange={(e) => handleUpdate(e)} type="text" className="form-control" id="name" />
                                        </div>
                                        <div>
                                            <label htmlFor="adminMail">Admin Email</label>
                                            <input autoComplete='off' onChange={(e) => handleUpdate(e)} type="text" className="form-control" id="adminMail" />
                                        </div>
                                        <div>
                                            <label htmlFor="password">Password</label>
                                            <input onChange={(e) => handleUpdate(e)} type="password" className="form-control" id="password" />
                                        </div>

                                        <div>
                                            <label htmlFor="confirmPassword">Confirm Password</label>
                                            <input onChange={(e) => handleUpdate(e)} type="password" className="form-control" id="confirmPassword" />
                                        </div>


                        <input type="submit" value="Register" className="btn btn-pill text-white btn-block btn-primary set-mid mt-4 mb-5"/>

                 
                    </form>
                    
                    <Link to="/institution"  className="d-flex justify-content-center"> Already have account? Login Here</Link>
                    </div>
                    
                </div>
                </div>
            </div>
            </div>
        </div>

        </div>
    );
}

export default InstitutionSignup;