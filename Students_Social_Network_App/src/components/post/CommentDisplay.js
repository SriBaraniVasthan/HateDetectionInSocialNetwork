
import DefaultProfilePic from '../../resources/images/ProfilePicDefault.png';
import { Link } from 'react-router-dom';

const CommentDisplay = ({commentData}) => {
    return (
        <div className="d-flex align-items-center my-1">
            <img src={commentData.user.userProfile.imageUrl != null ? commentData.user.userProfile.imageUrl : DefaultProfilePic} alt="avatar" className="rounded-circle me-2 avatar-style"/>
            <div className="p-3 rounded comment__input w-100">    
                <Link to={`/peers/${commentData.user.id}`} style={{ textDecoration: 'none' }}><p className="fw-bold m-0">{commentData.user.name}</p></Link>
                
                <p className="m-0 fs-7 bg-gray p-2 rounded">{commentData.content}</p>
            </div>
        </div>
    )
}

export default CommentDisplay;