import Body from "../body/Body";
import Header from "../Header";
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Form from 'react-bootstrap/Form';
import MenuItem from '@mui/material/MenuItem';
import Constant from '../../constants/Constant';
import Axios from 'axios';
import AuthService from '../../services/AuthService';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import GroupCard from "./GroupCard";
import { CheckToxicity } from "../../utils/ToxicityCheck";
import CustomAlert from "../alert/Alert";
import { debounce } from "lodash";
import "./groupPage.css"

const GroupPage = () => {

    const groupUrl = Constant.base_url+"api/group";
    const [groupData, setGroupData] = useState([]);
    const [joinedGroup, setJoinedGroup] = useState([]);
    const [pendingGroup, setPendingGroup] = useState([]);
    const [departmentGroup, setDepartmentGroup] = useState([]);
    const [instituteGroup, setInstituteGroup] = useState([]);
    const [everyoneGroup, setEveryoneGroup] = useState([]);
    const [buttonclick, setButtonClick] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editGroupId, setEditGroupId] = useState(-1);
    const [toxicity, setToxicity] = useState({ groupName: { status: false }, description: { status: false } })


    useEffect(() => {
        const token = AuthService.getCurrentUserToken();
        Axios.defaults.headers.common['Authorization'] = token;
        Axios.get(groupUrl)
        .then(res => {
            const gdata = res.data;
            setGroupData(gdata);
            let uni = [];
            let joined = [];
            let pending = [];
            let department = [];
            let everyone = [];
            
            gdata.forEach((group) => {

                if(group.joined)
                {
                    joined.push(group);
                }
                else if(group.pending)
                {
                    pending.push(group);
                }
                else if(group.visibility == "DEPARTMENT")
                {
                    department.push(group);
                }
                else if(group.visibility == "UNIVERSITY")
                {
                    uni.push(group);
                }
                else if(group.visibility == "EVERYONE")
                {
                    everyone.push(group);
                }
            })
            setPendingGroup(pending);
            setJoinedGroup(joined);
            setDepartmentGroup(department);
            setInstituteGroup(uni);
            setEveryoneGroup(everyone);
        })
        .catch(res => {
            console.log(res);
        })
    },[buttonclick]);

    const eventVisibility = [
        {
          value: 'DEPARTMENT',
          label: 'School',
        },
        {
          value: 'UNIVERSITY',
          label: 'Institution',
        },
        {
          value: 'EVERYONE',
          label: 'Everyone',
        }
    ];

    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(true);
    }

    const [image, setImage] = useState(null);
    
    const [description, setDescription] = useState("");
    const [descError, setDescError] = useState(false);
    
    const [groupName, setGroupName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [visibility, setVisibility] = useState('DEPARTMENT');
    const [type, setType] = useState("OPEN");
    
    const fileInputRef = useRef();

    const handleDescription = (e) => {
        const val = e.target.value;
        setDescription(val);
        setDescError(false);
        handleTocixity(e, "description")
    }

    const handleChangeImage = (event) =>{
        const file = event.target.files[0];
        setImage(file);
    }

    const removeImage = () => {
        fileInputRef.current.value = "";
        setImage(null);
    }

    const handleEventName = (e) => {
        const val = e.target.value;
        setGroupName(val);
        setNameError(false);
        handleTocixity(e, "groupName")
    }

    const handleClose = () => {
        setShow(false);
        setGroupName("");
        setDescription("");
        setNameError(false);
        setDescError(false);
        setVisibility('DEPARTMENT');
        removeImage();
        setEdit(false);
    }

    const handleRadioChage = (e) => {
        const val = e.target.value;
        console.log(val);
        setType(val);
    }

    const handleSelectChange = (event) => {
        setVisibility(event.target.value);
    };

    const createGroup = () => {
        let err = false;
        if(groupName === "")
        {
            setNameError(true);
            err = true;
        }
        if(description === "")
        {
            setDescError(true);
            err = true;
        }
        if(err) 
        {
            return;
        }
       
        const formData = new FormData();
        formData.append("groupName", groupName);
        formData.append("desc", description);
        formData.append("groupVisibility", visibility);
        formData.append("groupType", type);
        formData.append("groupImage", image);

        const token = AuthService.getCurrentUserToken();
        Axios.defaults.headers.common['Authorization'] = token;
        
        Axios.post(groupUrl, formData)
        .then(res => {
            console.log(res.data);
            setButtonClick(!buttonclick);
        })
        .catch(res => {
            console.log(res);
        })
        handleClose();
    }

    const editGroup = () => {
        let err = false;
        if(groupName === "")
        {
            setNameError(true);
            err = true;
        }
        if(description === "")
        {
            setDescError(true);
            err = true;
        }
        if(err) 
        {
            return;
        }
        const formData = new FormData();
        formData.append("groupName", groupName);
        formData.append("desc", description);
        formData.append("image", image);

        const token = AuthService.getCurrentUserToken();
        Axios.defaults.headers.common['Authorization'] = token;
        let url = groupUrl+"/"+editGroupId;
        
        Axios.put(url, formData)
        .then(res => {
            console.log(res.data);
            setButtonClick(!buttonclick);
        })
        .catch(res => {
            console.log(res);
        })
        handleClose();

    }

    const handleJoinGroup = (group) => {
        const token = AuthService.getCurrentUserToken();
        Axios.defaults.headers.common['Authorization'] = token;
        const url = groupUrl+"/"+group.id+"/join";

        Axios.post(url)
        .then(res => {
            console.log(res.data);
            
            setButtonClick(!buttonclick);
        })
        .catch(res => {
            console.log(res);
        })
    }


    const handleLeaveGroup = (group) => {
        const token = AuthService.getCurrentUserToken();
        Axios.defaults.headers.common['Authorization'] = token;
        const url = groupUrl+"/"+group.id+"/leave";

        Axios.post(url)
        .then(res => {
            console.log(res.data);
            
            setButtonClick(!buttonclick);
        })
        .catch(res => {
            console.log(res);
        })
    }

    const handleEditGroup = (group) => {
        console.log(group);
        handleShow();
        setGroupName(group.name);
        setDescription(group.description);
        setEdit(true);
        setEditGroupId(group.id);
    }

    const handleTocixity = useCallback(debounce((event, element) => {
        CheckToxicity(event.target.value).then((value) => setToxicity({ ...toxicity, [element]: { status: value } }))
    }, 500), [toxicity])

    const disableCheck = useMemo(() => {
        return Object.keys(toxicity).filter(el => toxicity[el].status).length
    }, [toxicity])

    return (
        <div style={{ overflow: 'hidden' }}>
            <Header currElement={'groups'} />
            <div className="container-fluid main-body-bg group-page">
                <div className="row">
                    <div className="col-sm-1">
                    </div>
                    <div className="col-sm">
                        <div className="mt-3 position-relative float-end">
                            <Button variant="primary" onClick={handleShow}>
                                Create New Group
                            </Button>
                        </div>
                        <div style={{ marginTop: '70px' }}>
                            {joinedGroup.length != 0 && <div className="text-center mt-3 mb-3"><h4>Joined Groups</h4></div>}
                            <div className="d-flex flex-wrap justify-content-center align-items-center">

                                {
                                    joinedGroup.map((group) => {
                                        return <GroupCard onJoinGroupClick={handleJoinGroup} onLeaveGroup={handleLeaveGroup} group={group} handleEditGroup={handleEditGroup} />
                                    })
                                }
                            </div>

                            {departmentGroup.length != 0 && <div className="text-center mt-3 mb-3"><h4>School Groups</h4></div>}
                            <div className="d-flex flex-wrap justify-content-center align-items-center">

                                {
                                    departmentGroup.map((group) => {
                                        return <GroupCard group={group} onJoinGroupClick={handleJoinGroup} handleEditGroup={handleEditGroup} />
                                    })
                                }
                            </div>

                        {instituteGroup.length != 0 && <div className="text-center mt-3 mb-3"><h4>Institution Groups</h4></div>}
                        <div className="d-flex flex-wrap justify-content-center align-items-center">
                            
                            {
                                instituteGroup.map((group) => {
                                    return <GroupCard group={group} onJoinGroupClick={handleJoinGroup} handleEditGroup={handleEditGroup}/>
                                })
                            }
                        </div>       

                        {everyoneGroup.length != 0 &&  <div className="text-center mt-3 mb-3"><h4>External Groups</h4></div>}
                        <div className="d-flex flex-wrap justify-content-center align-items-center">
                            
                            {
                                everyoneGroup.map((group) => {
                                    return <GroupCard group={group} onJoinGroupClick={handleJoinGroup} handleEditGroup={handleEditGroup}/>
                                })
                            }
                        </div>               
                </div>
                <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                        <Modal.Title>{edit ? "Edit Group" : "Create New Group"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="input-group mb-3">
                                <TextField id="outlined-basic" className="w-100" label="Group Name" error={nameError} value={groupName} autoComplete='off' variant="outlined" onChange={(e) => handleEventName(e)}/>
                            </div>
                                {toxicity.groupName.status ?
                                    <div className='py-2'>
                                        <CustomAlert severity={Constant.Alert.ERROR} text={Constant.ToxicAlertText} /></div> :""
                                    //(groupName && <div className='py-2'> <CustomAlert severity={Constant.Alert.SUCCESS} text={Constant.SuccessAlertText} /></div>)
                                }
                                <div className="input-group mb-3">
                                    <TextField id="outlined-multiline-static" className="w-100" error={descError} value={description} autoComplete='off' inputProps={{ maxLength: 200 }}
                                        label="Description" multiline rows={5} onChange={(e) => handleDescription(e)} />
                                </div>
                                {toxicity.description.status ?
                                    <div className='py-2'>
                                        <CustomAlert severity={Constant.Alert.ERROR} text={Constant.ToxicAlertText} /></div> :""
                                    //(description && <div className='py-2'><CustomAlert severity={Constant.Alert.SUCCESS} text={Constant.SuccessAlertText} /></div>)
                                }
                                {/* <FormControl className="mb-3"> */}
                                {/* <FormLabel id="demo-row-radio-buttons-group-label">Acess</FormLabel> */}
                                {/* <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    defaultValue="OPEN"
                                    onChange={(e) => handleRadioChage(e)}
                                >
                                    <FormControlLabel value="OPEN" control={<Radio />} label="Open to all" />
                                    <FormControlLabel value="CLOSED" control={<Radio />} label="Closed" />
                                </RadioGroup> */}
                            {/* </FormControl> */}
                            { !edit && <TextField id="outlined-select-currency" fullWidth select label="Open to" value={visibility} onChange={handleSelectChange} >
                                    {eventVisibility.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                        </MenuItem>
                                    ))}
                            </TextField>}
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Group Icon</Form.Label>
                                <Form.Control type="file" multiple={false} ref={fileInputRef} onChange={(e) => handleChangeImage(e)} accept="image/*" />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                                <Button variant="primary" disabled={disableCheck} onClick={edit ? editGroup : createGroup}>Submit</Button>
                        </Modal.Footer>
                    </Modal>
            </div>
            <div className="col-sm-1">
            </div>
        </div>
    </div>
    </div>
    );
}

export default GroupPage;