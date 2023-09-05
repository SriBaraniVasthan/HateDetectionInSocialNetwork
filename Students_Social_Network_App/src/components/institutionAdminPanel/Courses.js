import Table from 'react-bootstrap/Table';
import './insHome.css';
import DialogBox from '../utils/DialogBox';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from 'axios';
import Constant from '../../constants/Constant';
import AuthService from '../../services/AuthService';

const Courses = ({department, updateDepartmentAndClose}) => {


    useEffect(() => {
        let token = AuthService.getCurrentUserToken();
        Axios.defaults.headers.common['Authorization'] = token;
    },[]);


    const [showFormDialog, setShowFormDialog] = useState(false);
    const [courseName, setCourseName] = useState("");
    const [courses, setCourses] = useState(department.courses);
    const [targetId, setTargetId] = useState(-1);
    const [showEditFormDialog, setShowEditFormDialog] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    
    const course_url = Constant.base_url+`api/department/${department.id}/course`;
    const dialogHeading = "Confirm Delete Course ?"
    const dialogContent = "Deleting the course, deletes all the contents associated with it. Do you want to continue ?"

    const openFormDialog = () => {
        setShowFormDialog(true);
    }

    const handleCloseFormDialog = () => {
        setShowFormDialog(false);
        setCourseName("");
    }

    const handleCourseNameChange = (e) => {
        const name = e.target.value;
        setCourseName(name);
    }

    const handleCreateCourse = () => {
        if(courseName != "")
        {    
            const data = {name: courseName};
            Axios.post(course_url, data)
            .then(res => {
                const newCourse = res.data;
                setCourses([...courses, newCourse]);
            })
            .catch(res => {
                console.log(res);
            })
            handleCloseFormDialog();    
        }
    }

    const handleDelete = (e) => {
        setTargetId(e.target.id);
        setShowDialog(true);
    }

    const handleDialogContinueDelete = () => {

        Axios.delete(`${course_url}/${targetId}`)
            .then(res => {         
                const currCourse = courses.filter(course => course.id != targetId);
                setCourses(currCourse);
            })
            .catch(res => {
                console.log(res);
            })
        handleDialogClose();
    }

    const handleDialogClose = () => {
        setShowDialog(false);
        setTargetId(-1);
    }

    const handleEditButton = (e) => {
        const id = e.target.id;
        setTargetId(id);
        const currCourse = courses.filter((course) => course.id == id)[0];
        setCourseName(currCourse.name);
        setShowEditFormDialog(true);
    }

    const handleCloseEditFormDialog = () => {
        setShowEditFormDialog(false);
    }

    const handleEditCourse = () => {
        if(courseName != "")
        {
            const data = {name: courseName};
            Axios.put(`${course_url}/${targetId}`, data)
            .then(res => {
                const currCourse = courses.map(course => {
                    if(course.id == targetId)
                    {
                        course.name = courseName;
                    }
                    return course;
                });
                setCourses(currCourse);
            })
            .catch(res => {
                console.log(res);
            })
            handleCloseEditFormDialog();    
        }
    }


    return (
        <div className=''>
            <h4 className="h4 mb-3"><a onClick={() => updateDepartmentAndClose(department.id, courses)} className="pointer text-decoration-none">Departments -&gt;</a> {department.name}</h4>
            <div className="container-fluid background-color dash-board">
                <div className="p-3">
                    <div className='float-end mb-3'>
                        <button className='btn btn-primary' onClick={openFormDialog}>Add New Course</button>
                    </div>
                    {showDialog && <DialogBox heading={dialogHeading} content={dialogContent} handleContinueAction={handleDialogContinueDelete} handleCloseAction={handleDialogClose} />}
                    <Dialog open={showFormDialog} onClose={handleCloseFormDialog} fullWidth>
                        <DialogTitle>Create Course</DialogTitle>
                        <DialogContent>
                            <TextField autoFocus margin="dense" id="name" label="Department Name" type="text" fullWidth variant="standard" autoComplete='off' onChange={(e) => handleCourseNameChange(e)} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseFormDialog}>Cancel</Button>
                            <Button onClick={handleCreateCourse}>Create</Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={showEditFormDialog} onClose={handleCloseEditFormDialog} fullWidth>
                        <DialogTitle>Edit Course</DialogTitle>
                        <DialogContent>
                            <TextField autoFocus margin="dense" id="name" label="Department Name" type="text" fullWidth variant="standard" autoComplete='off' value={courseName} onChange={(e) => handleCourseNameChange(e)} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseEditFormDialog}>Cancel</Button>
                            <Button onClick={handleEditCourse}>Edit</Button>
                        </DialogActions>
                    </Dialog>
                    <Table striped>
                        <thead>
                            <tr>
                                {/* <th>#</th> */}
                                <th>Course Name</th>
                                {/* <th className='text-center'>Courses</th> */}
                                <th className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                courses.map((course, index) => {
                                    return (
                                        <tr key={index}>
                                            {/* <td>{index+1}</td> */}
                                            <td>{course.name}</td>
                                            {/* <td className='text-center'>
                                            <button className='btn btn-primary' onClick={toggleShowCourse} id={department.id}>View Courses</button>
                                        </td> */}
                                        <td className='text-center'>
                                            <button className='btn btn-secondary' onClick={handleEditButton} id={course.id}>Edit</button>
                                            <button className='btn btn-danger dep-btn' onClick={handleDelete} id={course.id}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
            </div>
        </div>
    );
}

export default Courses;