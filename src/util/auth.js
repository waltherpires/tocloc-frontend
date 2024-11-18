import { redirect } from "react-router-dom";

export function getTokenDuration() {
    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export function getAuthToken() {
    const token = localStorage.getItem('token');

    if(!token){
        return null;
    }

    const tokenDuration = getTokenDuration();
    if(tokenDuration < 0) {
        return  'EXPIRED';
    }

    return token;
}

export function globalLoader(){
    const token = localStorage.getItem('token');
    const loggedUserId = localStorage.getItem('userId');
    const typeOfUser = localStorage.getItem('typeOfUser');

    if(!token) {
        return { token: null, loggedUserId: null, typeOfUser: null};
    }

    const tokenDuration = getTokenDuration();
    if (tokenDuration < 0) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('typeOfUser');
      localStorage.removeItem('expiration');
      return { token: 'EXPIRED', loggedUserId: null, typeOfUser: null };
    }

    return { token, loggedUserId, typeOfUser };
}

export function checkAuthLoader() {
    const token = getAuthToken();
    
    if(!token) {
        return redirect('/login');
    }

    return null;
}
