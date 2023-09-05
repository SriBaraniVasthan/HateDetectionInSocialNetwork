import Table from 'react-bootstrap/Table';
import './insHome.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Constant from '../../constants/Constant';
import AuthService from '../../services/AuthService';

const StudentPage = () => {

    useEffect(() => {
        const token = AuthService.getCurrentUserToken();
        Axios.defaults.headers.common['Authorization'] = token;
        Axios.get(users_url)
        .then(res => {
            setUsers(res.data);
        })
        .catch(res => {
            console.log(res);
        })
    },[]);

    const [users, setUsers] = useState([]);    
    const users_url = Constant.base_url+"api/institute/students"

    const handleDisableUser = (e) => {
        const id = e.target.id;
        const token = AuthService.getCurrentUserToken();
        Axios.defaults.headers.common['Authorization'] = token;
        let url = users_url+"/"+id+"/disable";
        Axios.post(url)
        .then(res => {
            const data = res.data;
            const userdata = users.map((user) => {
                return user.id == id ? data : user;
            })
            setUsers(userdata);
        })
        .catch(res => {
            console.log(res);
        })
    }

    const handleEnableUser = (e) => {
        const id = e.target.id;
        const token = AuthService.getCurrentUserToken();
        Axios.defaults.headers.common['Authorization'] = token;
        let url = users_url+"/"+id+"/enable";
        Axios.post(url)
        .then(res => {
            const data = res.data;
            const userdata = users.map((user) => {
                return user.id == id ? data : user;
            })
            setUsers(userdata);
        })
        .catch(res => {
            console.log(res);
        })      
    }

    return (
        <div className=''>
            <h4 className="h4 mb-3">Students</h4>
            <div className="container-fluid background-color dash-board">
                <div className="p-3">
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Course</th>
                                <th className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user) => {
                                    return (
                                        <tr key={user.id}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.departmentName}</td>
                                            <td>{user.course}</td>
                                            <td className='text-center'>
                                                {user.enabled && <button className='btn btn-danger' onClick={handleDisableUser} id={user.id}>Disable Account</button>}
                                                {!user.enabled && <button className='btn btn-success' onClick={handleEnableUser} id={user.id}>Enable Account</button>}
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

export default StudentPage;