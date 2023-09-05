import DropdownMenu from "./DropdownMenu";
import { Link } from "react-router-dom";
import DefaultProfilePic from '../../resources/images/ProfilePicDefault.png';

const AuthorImage = ({postData, user, handleDeletePost}) => {

    const getDateTime = (dateTime) => {
        const date = new Date(dateTime);
        return `${formatDate(date)} at ${formatAMPM(date)}`;
    }

    const formatAMPM = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    const formatDate = (date) => {
        let monthNames = ["Jan","Feb","Mar","Apr", "May","Jun","Jul","Aug", "Sep", "Oct","Nov","Dec"];
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = today.getMonth(); //January is 0!
        let monthName = monthNames[mm];
        const yyyy = today.getFullYear();
        return monthName + ' ' + dd + ' ' + yyyy;
    }


    return (
        <div className="d-flex justify-content-between position-relative">
            <div className="d-flex ">
                <img src={postData.createdUser.userProfile.imageUrl != null ? postData.createdUser.userProfile.imageUrl : DefaultProfilePic} alt="avatar" className="rounded-circle me-2 avatar-style" />
                <div>
                    <Link to={`/peers/${postData.createdUser.id}`} style={{ textDecoration: 'none' }}><p className="m-0 fw-bold">{postData.createdUser.name}</p></Link>
                    <span className="text-muted fs-7">{getDateTime(postData.createdTime)}</span>
                </div>
                {user.email == postData.createdUser.email && <DropdownMenu handleDeletePost={handleDeletePost}/>}
            </div>
        </div>
    );
}

export default AuthorImage;