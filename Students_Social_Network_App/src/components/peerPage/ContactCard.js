import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import './peerPageStyle.css'
import DefaultProfilePic from '../../resources/images/ProfilePicDefault.png';
import { Link } from 'react-router-dom';

export default function ContactCard({user}) {

  return (
    <Card sx={{ height: '120px', display: 'flex', margin: '15px', width: '360px' }}>
      <CardMedia
        component="img"
        image= {user.userProfile.imageUrl != null ? user.userProfile.imageUrl : DefaultProfilePic}
        alt="Live from space album cover"
        className='image-adjust'
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Link to={`/peers/${user.id}`} style={{ textDecoration: 'none' }}><h5>{user.name}</h5></Link>
          <div>{user.userProfile.headline}</div>
          <div>{user.email}</div>
        </CardContent>
      </Box>
    </Card>
  );
}
