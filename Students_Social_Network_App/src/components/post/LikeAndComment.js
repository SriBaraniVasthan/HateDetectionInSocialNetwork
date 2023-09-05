
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faCommentAlt } from '@fortawesome/free-solid-svg-icons'
import './post.css';
import { useState } from 'react';

const LikeAndComment = ({postData, onClickLike, handleFocusCommentBox}) => {


    const [colorClass, setColorClass] = useState(postData.likedByUser ? "text-primary" : "");
    const [likedByUser, setLikedByUser] = useState(postData.likedByUser);

    const toggleLike = () => {
        if(likedByUser)
        {
            setLikedByUser(false);
            setColorClass("");
            onClickLike(postData, false);
        }
        else
        {
            setLikedByUser(true);
            setColorClass("text-primary");
            onClickLike(postData, true);
        }
    }

    return (
        <div className="d-flex justify-content-around pt-3">
            <div className="dropdown-item rounded d-flex justify-content-center align-items-center pointer text-muted p-1" onClick={toggleLike}>
                <FontAwesomeIcon icon={faThumbsUp} id="like-button" className={colorClass}></FontAwesomeIcon>
                <p className={`m-0 likecomment-margin ${colorClass}`}  id='like-text'>Like</p>
            </div>
            <div className="dropdown-item rounded d-flex justify-content-center align-items-center pointer text-muted p-1" data-bs-toggle="collapse" data-bs-target="#collapsePost1" aria-expanded="false" aria-controls="collapsePost1">
                <FontAwesomeIcon icon={faCommentAlt}></FontAwesomeIcon>
                <p className="m-0 likecomment-margin" id='comment-text' onClick={handleFocusCommentBox}>Comment</p>
            </div>
        </div>
    );
}

export default LikeAndComment;