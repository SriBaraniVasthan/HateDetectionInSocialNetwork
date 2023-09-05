import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

/* Alert Severities
error
warning
info
success
*/


export default function CustomAlert({ severity, text }) {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity={severity}>{text}</Alert>
        </Stack>
    );
}