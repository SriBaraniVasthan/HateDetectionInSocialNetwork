import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DialogBox = ({heading, content, handleCloseAction, handleContinueAction}) => {
    const [open, setOpen] = useState(true);


    const handleClose = () => {
        handleCloseAction();
        setOpen(false);
    };

    const handleContinue = () => {
        handleContinueAction();
        setOpen(false);
    }


  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
             {heading}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleContinue} autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}

export default DialogBox;

