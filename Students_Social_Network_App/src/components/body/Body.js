import './body.css';
import Post from '../post/Post';
import AddContent from '../addContent/AddContent';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Constant from '../../constants/Constant';
import AuthService from '../../services/AuthService';
import GroupHead from '../groupPage/GroupHead';

const Body = ({user, groupId}) => {

    const [postData, setPostData] = useState([]);
    const [groupData, setGroupData] = useState([]);
    const postUrl = groupId == undefined ? Constant.base_url+"api/post" : Constant.base_url+"api/group/"+groupId+"/post"

    useEffect(() => {
        const token = AuthService.getCurrentUserToken();
        Axios.defaults.headers.common['Authorization'] = token;
        Axios.get(postUrl)
        .then(res => {
            setPostData(res.data);
        })
        .catch(res => {
            console.log(res);
        })

        if(groupId != undefined)
        {
            const url = Constant.base_url+"api/group/"+groupId;
            Axios.get(url)
            .then(res => {
                setGroupData(res.data);
            })
            .catch(res => {
                console.log(res);
            })
        }
    },[]);

    const addContent = (content, image) => {
        const data = {content:content, image:image };

        const formData = new FormData();
        formData.append("postContent", content);
        formData.append("postImage", image);
        
        const token = AuthService.getCurrentUserToken();
        Axios.defaults.headers.common['Authorization'] = token;
        Axios.post(postUrl, formData)
        .then(res => {
            const currData = postData;
            setPostData([res.data, ...currData]);
        })
        .catch(res => {
            console.log(res);
        })
    }

    const deletePost = (post) => {
        
        const token = AuthService.getCurrentUserToken();
        Axios.defaults.headers.common['Authorization'] = token;
        let url = Constant.base_url+"api/post"
        url = url+"/"+post.id;
        Axios.delete(url)
        .then(res => {
            const currData = postData.filter((currPost) => currPost != post);
            setPostData(currData);
        })
        .catch(res => {
            console.log(res);
        })
    }

    const onClickLike = (post, isLiked) => {

        console.log("Called");
        const token = AuthService.getCurrentUserToken();
        Axios.defaults.headers.common['Authorization'] = token;
        let url = Constant.base_url+"api/post"
        url = url+"/"+post.id+"/"+(isLiked ? "like" : "unlike");
        
        Axios.post(url)
        .then(res => {
            const currData = postData.map((currPost) => {
                if(currPost == post)
                {
                    return res.data;
                }
                return currPost;
            });
            setPostData(currData);
        })
        .catch(res => {
            console.log(res);
        })
    }

    const handleAddComment = (post, comment) => {

        const token = AuthService.getCurrentUserToken();
        Axios.defaults.headers.common['Authorization'] = token;
        
        let url = Constant.base_url+"api/post"
        const commentUrl = url+"/"+post.id+"/comment";
        const data = {comment: comment};
        Axios.post(commentUrl, data)
        .then(res => {
            const currData = postData.map((currPost) => {
                if(currPost == post)
                {
                    return res.data;
                }
                return currPost;
            });
            setPostData(currData);
        })
        .catch(res => {
            console.log(res);
        })
    }

    return (
        
        <div className="container-fluid main-body-bg">
            <div className="row">
                <div className="col-sm">
                </div>
                <div className="col-sm">
                    {groupId != undefined && <div><GroupHead group={groupData}/></div>}
                    <AddContent onAddContent={addContent}/>
                    { postData.map((post) => {
                        return <Post key={post.id} postData={post} user={user} deletePostAction={deletePost} onClickLike={onClickLike} onAddComment={handleAddComment}/>
                    })}
                </div>
                <div className="col-sm">
                </div>
            </div>
        </div>
    );
}

export default Body;