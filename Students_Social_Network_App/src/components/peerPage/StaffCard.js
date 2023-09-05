import AuthService from "../../services/AuthService";
import ContactCard from "./ContactCard";

const StaffCard = ({course}) => {

    return (
        <div>
            <div className="text-center mt-4">
                <h5>{course.name}</h5>
            </div> 
            <div className="d-flex flex-wrap justify-content-center align-items-center">
                {
                    course.users.map((user) => {
                        if(user.email != AuthService.getCurrentUserMail())
                            return <ContactCard key={user.id} user={user} />
                    })
                }
            </div>
     </div>
    );
}

export default StaffCard;