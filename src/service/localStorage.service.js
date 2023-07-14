const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt_expires";
const USER_EMAIL = "user_email";

export function setTokens({ refreshToken, idToken, expiresIn = 3600, email }) {
   const expiresDate = new Date().getTime() + expiresIn * 1000;
   localStorage.setItem(TOKEN_KEY, idToken);
   localStorage.setItem(REFRESH_KEY, refreshToken);
   localStorage.setItem(EXPIRES_KEY, expiresDate);
   localStorage.setItem(USER_EMAIL, email);
}

export function getAccessToken() {
   return localStorage.getItem(TOKEN_KEY);
}
export function getRefreshToken() {
   return localStorage.getItem(REFRESH_KEY);
}
export function getExpireaToken() {
   return localStorage.getItem(EXPIRES_KEY);
}
export function getEmail() {
   return localStorage.getItem(USER_EMAIL);
}

const localStorageServise = {
   setTokens,
   getAccessToken,
   getExpireaToken,
   getEmail
};

export default localStorageServise;
