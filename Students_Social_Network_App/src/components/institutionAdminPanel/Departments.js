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
import Courses from './Courses';

const Departments = () => {

    useEffect(() => {
        const token = AuthService.getCurrentUserToken();
        Axios.defaults.headers.common['Authorization'] = token;
        Axios.get(department_url)
        .then(res => {
            setDepartments(res.data);
        })
        .catch(res => {
            console.log(res);
        })
    },[]);

    const [showCourses, setShowCourses] = useState(false);    
    const [courseDepartment, setCourseDepartment] = useState({});

    const [showDialog, setShowDialog] = useState(false);
    const [showEditFormDialog, setShowEditFormDialog] = useState(false);
    const [showFormDialog, setShowFormDialog] = useState(false);
    const [targetId, setTargetId] = useState(-1);
    const [departments, setDepartments] = useState([]);
    const [departmentName, setDepartmentName] = useState("");
    const department_url = Constant.base_url+"api/department"

    const dialogHeading = "Confirm Delete Department ?"
    const dialogContent = "Deleting the department, removes all the contents associated with it. Do you want to continue ?"

    const handleDelete = (e) => {
        setTargetId(e.target.id);
        setShowDialog(true);
    }

    const handleEditButton = (e) => {
        const id = e.target.id;
        setTargetId(id);
        const dep = departments.filter((department) => department.id == id)[0];
        setDepartmentName(dep.name);
        setShowEditFormDialog(true);
    }

    const handleDialogContinueDelete = () => {

        Axios.delete(`${department_url}/${targetId}`)
            .then(res => {         
                const currDepartment = departments.filter(department => department.id != targetId);
                setDepartments(currDepartment);
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

    const handleCloseFormDialog = () => {
        setShowFormDialog(false);
        setDepartmentName("");
    }

    const handleCloseEditFormDialog = () => {
        setShowEditFormDialog(false);
    }

    const openFormDialog = () => {
        setShowFormDialog(true);
    }

    const handleDepartmentChange = (e) => {
        setDepartmentName(e.target.value);
    }

    const handleCreateDepartment = () => {
        if(departmentName != "")
        {    
            const data = {name: departmentName};
            Axios.post(department_url, data)
            .then(res => {
                const newDep = res.data;
                setDepartments([...departments, newDep]);
            })
            .catch(res => {
                console.log(res);
            })
            handleCloseFormDialog();    
        }
    }

    const handleEditDepartment = () => {
        if(departmentName != "")
        {
            const data = {name: departmentName};
            Axios.put(`${department_url}/${targetId}`, data)
            .then(res => {
                const dep = departments.map(department => {
                    if(department.id == targetId)
                    {
                        department.name = departmentName;
                    }
                    return department;
                });
                setDepartments(dep);
            })
            .catch(res => {
                console.log(res);
            })
            handleCloseEditFormDialog();    
        }
        setDepartmentName("");    
    }

    const handleShowCourse = (e) => {
        setShowCourses(true);
        const depId = e.target.id;
        const department = departments.filter(department => department.id == depId)[0];
        setCourseDepartment(department);
    }

    const handleCloseShowCourse = (deptId, courseList) => {
        const newData = departments.map((department) => {
            if(department.id == deptId)
            {
                department.courses = courseList;
            }
            return department;
        })
        setDepartments(newData);
        setShowCourses(false);

    }

    if(showCourses)
    {
        return (
            <Courses updateDepartmentAndClose={handleCloseShowCourse} department={courseDepartment}/>
        );
    }

    return (
        <div className=''>
            <h4 className="h4 mb-3">Departments</h4>
            <div className="container-fluid background-color dash-board">
            <div className="p-3">   
                <div className='float-end mb-3'>
                    <button className='btn btn-primary' onClick={openFormDialog}>Add New Department</button>
                </div>
                {showDialog && <DialogBox heading={dialogHeading} content={dialogContent} handleContinueAction={handleDialogContinueDelete} handleCloseAction={handleDialogClose}/>}
                <Dialog open={showFormDialog} onClose={handleCloseFormDialog} fullWidth>
                    <DialogTitle>Create Department</DialogTitle>
                    <DialogContent>
                    <TextField autoFocus margin="dense" id="name" label="Department Name" type="text" fullWidth variant="standard" autoComplete='off' onChange={(e) => handleDepartmentChange(e)} />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCloseFormDialog}>Cancel</Button>
                    <Button onClick={handleCreateDepartment}>Create</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={showEditFormDialog} onClose={handleCloseEditFormDialog} fullWidth>
                    <DialogTitle>Edit Department</DialogTitle>
                    <DialogContent>
                    <TextField autoFocus margin="dense" id="name" label="Department Name" type="text" fullWidth variant="standard" autoComplete='off' value={departmentName} onChange={(e) => handleDepartmentChange(e)} />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCloseEditFormDialog}>Cancel</Button>
                    <Button onClick={handleEditDepartment}>Edit</Button>
                    </DialogActions>
                </Dialog>

                <Table striped>
                    <thead>
                        <tr>
                        {/* <th>#</th> */}
                        <th>Department Name</th>
                        <th className='text-center'>Courses</th>
                        <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            departments.map((department, index) => {
                                return (  
                                    <tr key={index}>
                                        {/* <td>{index+1}</td> */}
                                        <td>{department.name}</td>
                                        <td className='text-center'>
                                            <button className='btn btn-primary' onClick={handleShowCourse} id={department.id}>View Courses</button>
                                        </td>
                                        <td className='text-center'>
                                            <button className='btn btn-secondary' onClick={handleEditButton} id={department.id}>Edit</button>
                                            <button className='btn btn-danger dep-btn' onClick={handleDelete} id={department.id}>Delete</button>
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
    )
}

export default Departments;