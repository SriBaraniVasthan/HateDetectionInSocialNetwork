import { Outlet, Navigate } from 'react-router-dom'
import AuthService from '../../services/AuthService'

const PrivateRoutes = ({navigateTo, userType}) => {

    return(
        AuthService.isLoggedIn(userType) ? <Outlet/> : <Navigate to={navigateTo}/>
    )
}

export default PrivateRoutes;