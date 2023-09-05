import { Link, useNavigate } from 'react-router-dom';
import './insLogin.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Constant from '../../constants/Constant';
import AuthService from '../../services/AuthService';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AlertBox from '../utils/AlertBox';

const InstitutionLogin = () => {

    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if(AuthService.isLoggedIn(Constant.userTypes.ADMIN))
        {
            navigate("/institution/home");
        }
    },[])
    

    const [data, setData] = useState({email:"", password:""});

    const login_url = Constant.base_url+"login";
    
    const handleUpdate = (e) =>{
        const newdata = {...data};
        newdata[e.target.id] = e.target.value;
        setData(newdata);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        Axios.post(login_url, data)
        .then(res => {
            const token = res.headers.authorization;
            if(!AuthService.login(token, Constant.userTypes.ADMIN))
            {
                setShowError(true);
            }
            else
            {
                navigate("/institution/home");
            }
        })
        .catch(res => {
            console.log(res);
            setShowError(true);
        })
    }

    return (
        <div className="content inst-container">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 contents">
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <div className="form-block position-relative institution-modal">
                                    <Link to="/" className='mb-2 position-absolute arrow-position'>
                                        <span><FontAwesomeIcon icon={faLeftLong} color='black' className='photo-text'></FontAwesomeIcon></span>
                                    </Link>
                                    <div className="mb-4">
                                        <h3>Institution Login</h3>
                                    </div>

                                    {showError && <AlertBox variant={'danger'} message={'Error while logging in'} />}
                                    <form onSubmit={(e) => handleSubmit(e)}>
                                        <div>
                                            <label htmlFor="email">Email</label>
                                            <input type="text" className="form-control" id="email" autoComplete='off' onChange={(e) => handleUpdate(e)} />
                                        </div>
                                        <div>
                                            <label htmlFor="password">Password</label>
                                            <input type="password" className="form-control" id="password" onChange={(e) => handleUpdate(e)} />
                                        </div>

                                        <div className="mb-4 mt-2">
                                            <label><span className="caption">Remember me</span>
                                                <input type="checkbox" defaultChecked />
                                                <div className="control__indicator"></div>
                                            </label>

                                            <span className='float-end'><a href="#" className="">Forgot Password</a></span>
                                        </div>

                        <input type="submit" value="Log In" className="btn btn-pill text-white btn-block btn-primary set-mid" />
                        <Link to="/institution/create" className='mt-4'> Sign up here</Link>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}

export default InstitutionLogin;