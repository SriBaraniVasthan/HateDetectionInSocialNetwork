import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const LikeCount = ({postData}) => {

    const text = postData.likesCount == 1 ? "Liked by 1 person" : `Liked by ${postData.likesCount} people`;

    return (
        <div className="post__comment mt-3 position-relative pd-10">
            <div className=" d-flex align-items-center top-0 start-0 position-absolute like-style">
                <div className="me-2">
                    <FontAwesomeIcon icon={faThumbsUp} className="text-primary"/>
                </div>
                <p className="m-0 text-muted fs-7">{text}</p>
            </div>
        </div>
    );
}

export default LikeCount;