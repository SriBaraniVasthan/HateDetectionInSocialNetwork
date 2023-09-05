import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DefaultEventPic from '../../resources/images/DefaultEventImage.png';
import AuthService from '../../services/AuthService';
import EventDropDown from './EventDropDown';

const EventCard = ({event, editEvent}) => {

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

    const handleEditCurrentEvent = () => {
        editEvent(event);
    }


  return (
    <Card sx={{ height: '150px',width:'500px',display: 'flex', marginTop: '10px', }} className="position-relative shadow">
      {AuthService.getCurrentUserMail() == event.createdUser.email && <EventDropDown handleEditEvent={handleEditCurrentEvent}/>}
      <CardMedia
        component="img"
        image={event.imageUrl != null ? event.imageUrl : DefaultEventPic}
        alt="Live from space album cover"
        style={{width:'150px'}}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <h5>{event.name}</h5>
          <p><b>Place:</b> {event.place}</p>
          <p><b>Time:</b> {getDateTime(event.eventDateTime)}</p>
          <p><b>Description:</b> {event.description}</p>
        </CardContent>
      </Box>
    </Card>
  );
}

export default EventCard;
