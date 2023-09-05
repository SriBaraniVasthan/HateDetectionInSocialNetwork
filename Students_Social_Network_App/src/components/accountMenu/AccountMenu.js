import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faEye } from '@fortawesome/free-solid-svg-icons';
import DefaultProfilePic from '../../resources/images/ProfilePicDefault.png';

const AccountMenu = () => {

    const navigate = useNavigate();

    const imageUrl = localStorage.getItem('profile_pic_url');

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        AuthService.logout();
        navigate("/");
    }

    const handleChangePassword = () => {
        navigate("/changepassword");
    }

    const navigateToProfilePage = () => {
        navigate("/profile")
    }

    return (
        <React.Fragment>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Account settings">
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <Avatar sx={{ width: 32, height: 32 }}><img src={imageUrl != 'null' ? imageUrl : DefaultProfilePic} /></Avatar>
            </IconButton>
            </Tooltip>
        </Box>
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
            elevation: 0,
            sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
                },
                '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
                },
            },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={navigateToProfilePage}>
            <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={handleChangePassword}>
                <FontAwesomeIcon icon={faEye} color="grey"/>
                <span style={{marginLeft:"6px"}}>Change password</span>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} color="grey"/>
                <span style={{marginLeft:"6px"}}>Logout</span>
            </MenuItem>
        </Menu>
        </React.Fragment>
    );
}


export default AccountMenu;