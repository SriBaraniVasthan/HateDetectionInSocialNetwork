import jwtDecode from "jwt-decode";

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_type");
};
  
const login = (token, usertype) => {
    localStorage.setItem("token", token);
    if(usertype != null && getUserRoles().includes(usertype))
    {
        localStorage.setItem("user_type", usertype);
        return true;
    }
    return false;
}
const isLoggedIn = (userType) => {
    return localStorage.getItem("token") != null && localStorage.getItem("user_type") == userType;
}

const getCurrentUserToken = () => {
    return localStorage.getItem("token");
};

const decodeToken = () => {
    return jwtDecode(localStorage.getItem("token"));
}

const getCurrentUserMail = () => {
    const token = decodeToken();
    return token.sub;
}

const getUserRoles = () => {
    const token = decodeToken();
    return token.roles;

}


const AuthService = {
    logout,
    login,
    getCurrentUserToken,
    isLoggedIn,
    getCurrentUserMail
};

export default AuthService;

  