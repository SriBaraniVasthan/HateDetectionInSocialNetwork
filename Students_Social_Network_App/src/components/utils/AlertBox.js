import Alert from 'react-bootstrap/Alert';

const AlertBox = ({variant, message}) => {
    return (
            
        <Alert key={variant} variant={variant} className="mt-3 text-center">
            {message}
        </Alert>
    );
}

export default AlertBox;