import Header from "../Header";
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
import EventCard from "./EventCard";
import { debounce } from 'lodash';
import { CheckToxicity } from "../../utils/ToxicityCheck";
import CustomAlert from "../alert/Alert";

const EventPage = () => {

    const eventUrl = Constant.base_url + "api/event";
    const [toxicity, setToxicity] = useState({ eventName: { status: false }, place: { status: false }, description: { status: false } })

    const [eventData, setEventData] = useState([]);

    useEffect(() => {
        const token = AuthService.getCurrentUserToken();
        Axios.defaults.headers.common['Authorization'] = token;
        Axios.get(eventUrl)
        .then(res => {
            setEventData(res.data);
        })
        .catch(res => {
            console.log(res);
        })
    },[]);

    const [time, setTime] = useState(new Date());

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

    const handleSelectChange = (event) => {
        setVisibility(event.target.value);
      };

    const handleTimeChange = (newValue) => {
        setTime(newValue);
        setTimeError(false);
    };
  
    const [show, setShow] = useState(false);
    const handleShow = (dontChangeTime) => {
        if(!dontChangeTime)
            setTime(new Date());
        setShow(true);
    }

    const [eventName, setEventName] = useState("");
    const [place, setPlace] = useState("");
    const [description, setDescription] = useState("");
    const [visibility, setVisibility] = useState('DEPARTMENT');
    const [image, setImage] = useState(null);
    const fileInputRef = useRef();

    const [eventError, setEventError] = useState(false);
    const [placeError, setPlaceError] = useState(false);
    const [descError, setDescError] = useState(false);
    const [timeError, setTimeError] = useState(false);

    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState(-1);

    const handleEventName = (e) => {
        const val = e.target.value;
        setEventName(val);
        setEventError(false);
        handleTocixity(e, "eventName")
    }

    const handlePlace = (e) => {
        const val = e.target.value;
        setPlace(val);
        setPlaceError(false);
        handleTocixity(e, "place")
    }

    const handleDescription = (e) => {
        const val = e.target.value;
        setDescription(val);
        setDescError(false);
        handleTocixity(e, "description")
    }

    const createEvent = () => {
        let err = false;
        if(eventName === "")
        {
            setEventError(true);
            err = true;
        }
        if(place === "")
        {
            setPlaceError(true);
            err = true;
        }
        if(description === "")
        {
            setDescError(true);
            err = true;
        }
        if(time < new Date())
        {
            setTimeError(true);
            err = true;
        }
        if(err) 
        {
            return;
        }
       
        const formData = new FormData();
        formData.append("eventName", eventName);
        formData.append("eventPlace", place);
        formData.append("desc", description);
        formData.append("time", time);
        formData.append("eventVisibility", visibility);
        formData.append("eventImage", image);

        const token = AuthService.getCurrentUserToken();
        Axios.defaults.headers.common['Authorization'] = token;
        Axios.post(eventUrl, formData)
        .then(res => {
            const newEvent = res.data;
            setEventData([...eventData, newEvent]);
        })
        .catch(res => {
            console.log(res);
        })
        handleClose();
    }

    const handleClose = () => {
        setShow(false);
        setEventName("");
        setPlace("");
        setDescription("");
        setEventError(false);
        setDescError(false);
        setPlaceError(false);
        setTimeError(false);
        setVisibility('DEPARTMENT');
        setTime(new Date());
        removeImage();
    }

    const removeImage = () => {
        fileInputRef.current.value = "";
        setImage(null);
    }

    const handleChangeImage = (event) =>{
        const file = event.target.files[0];
        setImage(file);
    }

    const handleEditEvent = (event) => {
        console.log(event);
        setEdit(true);
        setEditId(event.id);
        setEventName(event.name);
        setDescription(event.description);
        setPlace(event.place);
        setTime(new Date(event.eventDateTime));
        setVisibility(event.visibility);
        handleShow(true);
    }

    const editEvent = () => {
        let err = false;
        if(eventName === "")
        {
            setEventError(true);
            err = true;
        }
        if(place === "")
        {
            setPlaceError(true);
            err = true;
        }
        if(description === "")
        {
            setDescError(true);
            err = true;
        }
        if(time < new Date())
        {
            setTimeError(true);
            err = true;
        }
        if(err) 
        {
            return;
        }
       
        const formData = new FormData();
        formData.append("eventName", eventName);
        formData.append("eventPlace", place);
        formData.append("desc", description);
        formData.append("time", time);
        formData.append("eventVisibility", visibility);
        formData.append("eventImage", image);

        const token = AuthService.getCurrentUserToken();
        Axios.defaults.headers.common['Authorization'] = token;
        let url = eventUrl+"/"+editId;
        Axios.put(url, formData)
        .then(res => {
            const newEvent = res.data;
            const newDataList = eventData.map((event) => {
                return event.id == editId ? newEvent : event;
            })
            setEventData(newDataList);
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
            <Header currElement={'events'}/>
            <div className="container-fluid main-body-bg">
            <div className="row">
                <div className="col-sm-3">
                </div>
                <div className="col-sm">
                    <div className="mt-3 position-relative float-end">
                        <Button variant="primary" onClick={handleShow}>
                            Create New Event
                        </Button>

                        <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                            <Modal.Title>{edit ? "Edit Event" : "Create New Event"}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="input-group mb-3">
                                    <TextField id="outlined-basic" className="w-100" label="Event Name" value={eventName} error={eventError} autoComplete='off' variant="outlined" onChange={(e) => handleEventName(e)}/>
                                </div>
                                    {toxicity.eventName.status ?
                                        <div className='py-2'>
                                            <CustomAlert severity={Constant.Alert.ERROR} text={Constant.ToxicAlertText} /></div> :""
                                        //(eventName && <div className='py-2'> <CustomAlert severity={Constant.Alert.SUCCESS} text={Constant.SuccessAlertText} /></div>)
                                            }
                                    <div className="input-group mb-3">
                                        <TextField id="outlined-basic" className="w-100" label="Place" value={place} error={placeError} autoComplete='off' variant="outlined" onChange={(e) => handlePlace(e)} />
                                    </div>
                                    {toxicity.place.status ?
                                        <div className='py-2'>
                                            <CustomAlert severity={Constant.Alert.ERROR} text={Constant.ToxicAlertText} /></div> :""
                                        //(place && <div className='py-2'> <CustomAlert severity={Constant.Alert.SUCCESS} text={Constant.SuccessAlertText} /></div>)
                                    }
                                    <div className="input-group mb-3">
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DateTimePicker label="Event Start Date and Time" value={time} onChange={handleTimeChange} renderInput={(params) => <TextField className="w-100" {...params} error={timeError} />} />
                                        </LocalizationProvider>
                                    </div>
                                    <div className="input-group mb-3">
                                        <TextField id="outlined-multiline-static" className="w-100" error={descError} value={description} autoComplete='off' label="Description" multiline rows={5} onChange={(e) => handleDescription(e)} />
                                    </div>
                                    {toxicity.description.status ?
                                        <div className='py-2'>
                                            <CustomAlert severity={Constant.Alert.ERROR} text={Constant.ToxicAlertText} /></div> :""
                                        //(description && <div className='py-2'><CustomAlert severity={Constant.Alert.SUCCESS} text={Constant.SuccessAlertText} /></div>)
                                    }

                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Event Icon</Form.Label>
                                        <Form.Control type="file" multiple={false} ref={fileInputRef} onChange={(e) => handleChangeImage(e)} accept="image/*" />
                                    </Form.Group>
                                    <TextField id="outlined-select-currency" fullWidth select label="Open to" value={visibility} onChange={handleSelectChange} >
                                        {eventVisibility.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                            </MenuItem>
                                        ))}
                                </TextField>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                                    <Button disabled={disableCheck} variant="primary" onClick={edit ? editEvent : createEvent}>Submit</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                    <div style={{marginTop:'80px'}}>
                            {
                                eventData.map((event) => {
                                    return <EventCard event={event} key={event.id} editEvent={handleEditEvent}/>
                                })
                            }
                        </div>
                </div>
                <div className="col-sm-3">
                </div>
            </div>
        </div>
        </div>
    );
}

export default EventPage;