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
    const userId = localStorage.getItem('userId');
    const typeOfUser = localStorage.getItem('typeOfuser');

    if(!token) {
        return { token: null, userId: null, typeOfUser: null};
    }

    const tokenDuration = getTokenDuration();
    if (tokenDuration < 0) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('typeOfUser');
      localStorage.removeItem('expiration');
      return { token: 'EXPIRED', userId: null, typeOfUser: null };
    }

    return { token, userId, typeOfUser };
}

export function checkAuthLoader() {
    const token = getAuthToken();
    
    if(!token) {
        return redirect('/login');
    }

    return null;
}
