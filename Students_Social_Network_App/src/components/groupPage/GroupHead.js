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
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';

export default function GroupHead({group}) {

    return (
        <Card sx={{ marginTop: '15px' }} className="position-relative">
        <Link to="/groups" className='position-absolute arrow-position-box m-4'>
            <span><FontAwesomeIcon icon={faLeftLong} color='black' className='photo-text'></FontAwesomeIcon></span>
        </Link>
        
        <Box sx={{  }}>
        <CardMedia
            component="img"
            image= {group.imageUrl != null ? group.imageUrl : DefaultProfilePic}
            alt="Live from space album cover"
            className='image-adjust-group text-center'
        />
            <CardContent sx={{ flex: '1 0 auto' }}>
            <div className='text-center'><h5>{group.name}</h5></div>
            <div className='text-center'><p>{group.description}</p></div>
           </CardContent>
        </Box>
        </Card>
    );
}
