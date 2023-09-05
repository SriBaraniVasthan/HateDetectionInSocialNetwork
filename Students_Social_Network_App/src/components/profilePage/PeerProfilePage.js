
import { useParams } from "react-router-dom";
import ProfilePage from "./ProfilePage";

const PeerProfilePage = () =>{

    const { id } = useParams();

    return (
        <div><ProfilePage id={id} /></div>
    )
}

export default PeerProfilePage;