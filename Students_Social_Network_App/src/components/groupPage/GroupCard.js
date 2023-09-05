import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import './groupStyle.css'
import DefaultProfilePic from '../../resources/images/DefaultGroupPic.png';
import { Link, useNavigate } from 'react-router-dom';
import GroupDropDown from './GroupDropDown';

import AuthService from '../../services/AuthService';

export default function GroupCard({group, onJoinGroupClick, onLeaveGroup, handleEditGroup}) {

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/groups/"+group.id);
    }

    const handleJoinGroup = () => {
        onJoinGroupClick(group);
    }

    const handleLeaveGroup = () => {
        onLeaveGroup(group);
    }

    const handleEditCurrentGroup = () => {
        handleEditGroup(group);
    }

    return (
        <Card sx={{ height: '380px', margin: '15px', width: '360px', borderRadius:"2%" }} className="position-relative shadow">
        {AuthService.getCurrentUserMail() == group.createdUser.email && <GroupDropDown handleEditGroup={handleEditCurrentGroup}/>}
        <Box sx={{  }}>
        <CardMedia
            component="img"
            image= {group.imageUrl != null ? group.imageUrl : DefaultProfilePic}
            alt="Live from space album cover"
            className='image-adjust-group text-center'
        />
            <CardContent sx={{ flex: '1 0 auto' }}>
            <div className='text-center'><h6>{group.name}</h6></div>
            <div className='text-center'><p style={{fontSize:'14px'}}>{group.description}</p></div>
            <div className=''>
            {!group.joined && <div className='text-center'><button className="btn btn-secondary" onClick={handleJoinGroup}>Join Group</button></div>}
            {group.joined && <div className='text-center d-flex justify-content-around'><button className="btn btn-primary" onClick={handleNavigate}>View Group</button><button className="btn btn-danger" onClick={handleLeaveGroup}>Leave Group</button></div>}
            </div>
            </CardContent>
        </Box>
        </Card>
    );
}
