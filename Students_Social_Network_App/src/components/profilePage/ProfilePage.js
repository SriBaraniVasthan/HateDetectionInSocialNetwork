
import './profile.css'
import Header from '../Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons"
import DefaultProfilePic from '../../resources/images/ProfilePicDefault.png';
import { useState, useEffect, useRef,useCallback,useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TextField from '@mui/material/TextField';
import Form from 'react-bootstrap/Form';
import Constant from '../../constants/Constant';
import Axios from 'axios';
import AuthService from '../../services/AuthService';
import { CheckToxicity } from "../../utils/ToxicityCheck";
import CustomAlert from "../alert/Alert";
import { debounce } from "lodash";

const ProfilePage = ({id}) => {

    
    const [userData, setUserData] = useState({name:"User Name", email:"user@mail.com", userProfile: undefined});

    const [show, setShow] = useState(false);
    const [headline, setHeadline] = useState("");
    const [bio, setBio] = useState("");
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [twitter, setTwitter] = useState("");
    const [youtube, setYoutube] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [image, setImage] = useState(null);
    const fileInputRef = useRef();
    const [toxicity, setToxicity] = useState({ headline: { status: false }, bio: { status: false } })

    const userUrl = Constant.base_url+"api/user";


    useEffect(() => {
        const token = AuthService.getCurrentUserToken();
        Axios.defaults.headers.common['Authorization'] = token;

        console.log(id);
        let callurl = id == undefined ? userUrl : userUrl+"/"+id;

        Axios.get(callurl)
        .then(res => {
            const userdata = res.data;
            setUserData(userdata);
            setHeadline(userdata.userProfile.headline);
            setBio(userdata.userProfile.bio);
            setFacebook(userdata.userProfile.facebook);
            setInstagram(userdata.userProfile.instagram);
            setTwitter(userdata.userProfile.twitter);
            setYoutube(userdata.userProfile.youtube);
            setLinkedin(userdata.userProfile.linkedin);
        })
        .catch(res => {
            console.log(res);
        })
    },[]);

    const handleHeadline = (e) => {
        const val = e.target.value;
        console.log(val);
        setHeadline(val);
        handleTocixity(e, "headline")
    }

    const handleBio = (e) => {
        const val = e.target.value;
        setBio(val);
        handleTocixity(e, "bio")
    }

    const handleShow = () => {
        setShow(true);
        setHeadline(userData.userProfile.headline);
        setBio(userData.userProfile.bio);
        setFacebook(userData.userProfile.facebook);
        setInstagram(userData.userProfile.instagram);
        setTwitter(userData.userProfile.twitter);
        setYoutube(userData.userProfile.youtube);
        setLinkedin(userData.userProfile.linkedin);
    }

    const handleClose = () => {
        setShow(false);
    }
    
    const removeImage = () => {
        fileInputRef.current.value = "";
        setImage(null);
    }

    const handleChangeImage = (event) =>{
        const file = event.target.files[0];
        setImage(file);
    }

    const handleFacebook = (e) => {
        const val = e.target.value;
        setFacebook(val);
    }

    const handleYoutube = (e) => {
        const val = e.target.value;
        setYoutube(val);
    }

    const handleTwitter = (e) => {
        const val = e.target.value;
        setTwitter(val);
    }
    
    const handleInstagram = (e) => {
        const val = e.target.value;
        setInstagram(val);
    }

    const handleLinkedin = (e) => {
        const val = e.target.value;
        setLinkedin(val);
    }

    const editProfile = () => {
        const token = AuthService.getCurrentUserToken();
        Axios.defaults.headers.common['Authorization'] = token;
        const updateProfileUrl = userUrl+"/"+userData.id+"/profile";

        const formData = new FormData();
        if(headline != null && headline.trim() != "") formData.append("description",headline);
        if(bio != null && bio.trim() != "") formData.append("bio",bio);
        if(facebook != null && facebook.trim() != "") formData.append("facebook",facebook);
        if(instagram != null && instagram.trim() != "") formData.append("instagram",instagram);
        if(twitter != null && twitter.trim() != "") formData.append("twitter",twitter);
        if(youtube != null && youtube.trim() != "") formData.append("youtube", youtube);
        if(linkedin != null && linkedin.trim() != "") formData.append("linkedin", linkedin);
        formData.append("profileImage", image);

        Axios.put(updateProfileUrl, formData)
        .then(res => {
            const userdata = res.data;
            setUserData(userdata);
            setHeadline(userdata.userProfile.headline);
            setBio(userdata.userProfile.bio);
            setFacebook(userdata.userProfile.facebook);
            setInstagram(userdata.userProfile.instagram);
            setTwitter(userdata.userProfile.youtube);
            setYoutube(userdata.userProfile.youtube);
            setLinkedin(userdata.userProfile.linkedin);
        })
        .catch(res => {
            console.log(res);
        })
        handleClose();
    }
    
    const handleTocixity = useCallback(debounce((event, element) => {
        CheckToxicity(event.target.value).then((value) => setToxicity({ ...toxicity, [element]: { status: value } }))
    }, 500), [toxicity])
    const disableCheck = useMemo(() => {
        return Object.keys(toxicity).filter(el => toxicity[el].status).length
    }, [toxicity])

    return (
        <div style={{overflow:'hidden'}}>
            <Header currElement={''}/>
            <div className="container-fluid main-body-bg">
            <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                        >
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Profile</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="input-group mb-3">
                                    <TextField id="outlined-basic" className="w-100" label="Headline" value={headline}  autoComplete='off' variant="outlined" onChange={(e) => handleHeadline(e)}/>
                                </div>
                                {toxicity.headline.status ?
                                    <div className='py-2'>
                                        <CustomAlert severity={Constant.Alert.ERROR} text={Constant.ToxicAlertText} /></div> :""
                                    //(headline && <div className='py-2'><CustomAlert severity={Constant.Alert.SUCCESS} text={Constant.SuccessAlertText} /></div>)
                                }
                                <div className="input-group mb-3">
                                    <TextField id="outlined-multiline-static" className="w-100" value={bio} autoComplete='off' label="Bio" multiline rows={5} onChange={(e) => handleBio(e)}/>
                                </div>
                                {toxicity.bio.status ?
                                    <div className='py-2'>
                                        <CustomAlert severity={Constant.Alert.ERROR} text={Constant.ToxicAlertText} /></div> :""
                                   // (bio && <div className='py-2'> <CustomAlert severity={Constant.Alert.SUCCESS} text={Constant.SuccessAlertText} /></div>)
                                }
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Profile Pic</Form.Label>
                                    <Form.Control type="file" multiple={false} ref={fileInputRef} onChange={(e) => handleChangeImage(e)} accept="image/*" />
                                </Form.Group>
                                </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="primary" disabled={disableCheck} onClick={editProfile}>Submit</Button>
                            </Modal.Footer>
                    </Modal>
            <div className="row">
                <div className="col-sm-2">
                </div>
                <div className="col-sm">
                <div className="container mt-5">
                    <div className="row no-gutters">
                        <div className="col-md-4 col-lg-4">
                        {(userData.userProfile != undefined && userData.userProfile.imageUrl) ? <img src={userData.userProfile.imageUrl} alt="post image" className="profile-img"/>  : <img src={DefaultProfilePic}/> }
                            
                        </div>
                            <div className="col-md-8 col-lg-8">
                                <div className="d-flex flex-column">
                                    <div className="d-flex flex-row justify-content-between align-items-center p-5 bg-dark text-white">
                                        <h3 className="display-5">{userData.name}</h3>
                                        { userData.userProfile != undefined && userData.userProfile.facebook != null && <a target="_blank" href={facebook}><FontAwesomeIcon icon={faFacebook} swapOpacity color='white' size='lg' className='photo-text' ></FontAwesomeIcon></a> }
                                        { userData.userProfile != undefined && userData.userProfile.instagram != null && <a target="_blank" href={instagram}><FontAwesomeIcon icon={faInstagram} swapOpacity color='white' size='lg' className='photo-text' ></FontAwesomeIcon></a> }
                                        { userData.userProfile != undefined && userData.userProfile.youtube != null && <a target="_blank" href={youtube}><FontAwesomeIcon icon={faYoutube} swapOpacity color='white' size='lg' className='photo-text' ></FontAwesomeIcon></a> }
                                        { userData.userProfile != undefined && userData.userProfile.linkedin != null && <a target="_blank" href={linkedin}><FontAwesomeIcon icon={faLinkedin} swapOpacity color='white' size='lg' className='photo-text' ></FontAwesomeIcon></a> }
                                        { userData.userProfile != undefined && userData.userProfile.twitter != null && <a target="_blank" href={twitter}><FontAwesomeIcon icon={faTwitter} swapOpacity color='white' size='lg' className='photo-text' ></FontAwesomeIcon></a> }
                                    </div>
                                    <div className="p-3 bg-black text-white">
                                        <h6>{userData.userProfile != undefined && userData.userProfile.headline}</h6>
                                    </div>
                                    <div className="">
                                        <div className="bg-primary">
                                            <div className='bg-white p-3 show-space'>
                                                {userData.userProfile != undefined && userData.userProfile.bio}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='text-center mt-5'>
                       {id == undefined && <button className='btn btn-primary' onClick={handleShow}>Edit profile </button> }
                    </div>
                    
                </div>
                <div className="col-sm-2">
                </div>
            </div>
        </div>
        </div>
        
    );
}

export default ProfilePage;