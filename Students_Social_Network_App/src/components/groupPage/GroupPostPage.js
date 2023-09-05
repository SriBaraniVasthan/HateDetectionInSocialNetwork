
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import Home from "../home/Home";

const GroupPostPage = () =>{

    const { id } = useParams();

    return (
        <div><Home groupId={id} /></div>
    )
}

export default GroupPostPage;