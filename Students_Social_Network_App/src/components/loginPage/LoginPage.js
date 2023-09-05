
import './loginPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faBuildingColumns, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { BootstrapDialog, BootstrapDialogTitle } from '../dialogAlert/DiaogAlert';
import Typography from '@mui/material/Typography';
import AuthService from '../../services/AuthService';
import Constant from '../../constants/Constant';
import Axios from 'axios';
import AlertBox from '../utils/AlertBox';

const LoginPage = () => {

    const navigate = useNavigate();
    const [data, setData] = useState({email:"", password:""});
    const [showError, setShowError] = useState(false);
    const [open, setOpen] = useState(false);

    
    const login_url = Constant.base_url+"login";

    useEffect(() => {
        if(AuthService.isLoggedIn(Constant.userTypes.ADMIN))
        {
            navigate("/institution/home");
        }
        if(AuthService.isLoggedIn(Constant.userTypes.USER))
        {
            navigate("/home");
        }
    },[])


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
            AuthService.login(token, Constant.userTypes.USER);
            navigate("/home");
        })
        .catch(res => {
            console.log(res);
            setShowError(true);
        })
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleTermsAndCodition = (e) => {
        e.preventDefault()
        setOpen(true)
    }

    return (
        <div className="container-fluid login-page">
            <div className="row">
                <div className="col-lg-6 col-md-6 d-none d-md-block infinity-image-container-login"></div>
                <div className="col-lg-6 col-md-6 infinity-form-container">
                    <div className="col-lg-9 col-md-12 col-sm-8 col-xs-12 infinity-form">
                        <div className="text-center mb-3 mt-5">
                            <h1 className='sn-title'>Students Social Network</h1>
                        </div>
                        <div className="text-center mb-4">
                    <h4>Already have an account ?</h4>
                    
                    {showError &&  <AlertBox variant={'danger'} message={'Error while logging in'} />}
                </div>
                        <form className="px-3" onSubmit={(e) => handleSubmit(e)}>
                            <div className="form-input">
                                <span><FontAwesomeIcon icon={faEnvelope} color='grey' className='photo-text'></FontAwesomeIcon></span>
                                <input type="email" id='email' placeholder="Email Address" tabIndex="10" onChange={(e) => handleUpdate(e)} required/>
                            </div>
                            <div className="form-input">
                                <span><FontAwesomeIcon icon={faLock} color='grey' className='photo-text'></FontAwesomeIcon></span>
                                <input type="password" id='password' name="" placeholder="Password" onChange={(e) => handleUpdate(e)} required/>
                            </div>
                        <div className="row mb-5">
                            <div className="">
                                <input type="checkbox" className="" id="cb1"/>
                                <label className="custom-control-label" htmlFor="cb1">Remember me</label>
                                <a href="reset.html" className="forget-link float-end">Forgot password?</a>
                            </div>
                        </div>
                        <div className="mb-3"> 
                                <button type="submit" className="btn btn-block login-btn">Login</button>
                        </div>
                        <div className="text-center mt-3 mb-3">Don't have an account? 
                            <Link to="/register"> Register here</Link>
                        </div>
                        </form>
                        <div className="text-center mt-3 mb-3">Read sample 
                            <Link to="/" onClick={handleTermsAndCodition}> Terms & Conditions </Link>here
                        </div>
                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                        >
                            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                                Terms and conditions
                            </BootstrapDialogTitle>
                            <DialogContent dividers>
                                <Typography gutterBottom>
                                <ul>
                                 <li>Eligibility: You must be a student to use</li>

                                <li>Content Sharing: You're responsible for the content you share.</li> 

                                <li>Privacy: We respect your privacy. Our Privacy Policy outlines data collection and usage.</li>

                                <li>Account Security: Keep your account credentials safe and report unauthorized access.</li>

                                <li>Termination: App may suspend or terminate accounts for violations.</li>
                                </ul>
                                </Typography>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={handleClose}>
                                    Ok
                                </Button>
                            </DialogActions>
                        </BootstrapDialog>
                        <div className='d-flex space-between'>
                            <Link to="/institution" className="btn btn-secondary btn-effect m-auto">
                                Login as Institution
                            </Link>
                        </div>
                        
                    </div>		
                </div>
                
            </div>
	    </div>
    );
}

export default LoginPage;