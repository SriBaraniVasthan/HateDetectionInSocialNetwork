import Body from "../body/Body";
import Header from "../Header";
import { useState, useEffect, useMemo } from 'react';
import Axios from "axios";
import AuthService from "../../services/AuthService";
import Constant from "../../constants/Constant";
import ContactCard from "./ContactCard";
import CourseCard from "./CourseCard";

const PeerPage = () => {

    const [peerData, setPeerData] = useState([]);
    const [staffData, setStaffData] = useState([]);
    const peerUrl = Constant.base_url+"api/department/peers";
    const staffUrl = Constant.base_url+"api/department/staffs";

    useEffect(() => {
        const token = AuthService.getCurrentUserToken();
        Axios.defaults.headers.common['Authorization'] = token;
        Axios.get(peerUrl)
        .then(res => {
            setPeerData(res.data.courses);
        })
        .catch(res => {
            console.log(res);
        })
        

        Axios.get(staffUrl)
        .then(res => {
            setStaffData(res.data);
        })
        .catch(res => {
            console.log(res);
        })
    },[]);

    const users = useMemo(() => {
        let users = []
        peerData.map(course => {
            users.push(...course.users)
        })

        return users

    }, [peerData])

    return (
        <div style={{overflow:'hidden'}}>
            <Header currElement={'peers'}/>
            <div className="container-fluid main-body-bg">
                <div className="row">
                    <div className="col-sm-2">
                    </div>
                    <div className="col-sm">
                        {/* {
                            peerData.map((course) => {
                                // return <CourseCard key={course.id} course={course}/>
                                course.users.map((user) => {
                                    if (user.email != AuthService.getCurrentUserMail())
                                        return <ContactCard key={user.id} user={user} />
                                })
                            })
                        } */}
                        <div className="d-flex flex-wrap justify-content-center align-items-center">
                            {
                                users.map((user) => {
                                    if (user.email != AuthService.getCurrentUserMail())
                                        return <ContactCard key={user.id} user={user} />
                                })
                            }
                        </div>
                        {
                            staffData.length > 0 && <div className="text-center mt-4"> <h5>Staffs</h5> </div>
                        }
                        <div className="d-flex flex-wrap justify-content-center align-items-center">
                            {
                                staffData.map((staff) => {
                                    if (staff.email != AuthService.getCurrentUserMail())
                                        return <ContactCard key={staff.id} user={staff} />
                                })
                            }
                        </div>
                    </div>
                    <div className="col-sm-2">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PeerPage;