const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt_expires";

export function setTokens({ refreshToken, idToken, expiresIn = 3600 }) {
   const expiresDate = new Date().getTime() + expiresIn * 1000;
   localStorage.setItem(TOKEN_KEY, idToken);
   localStorage.setItem(REFRESH_KEY, refreshToken);
   localStorage.setItem(EXPIRES_KEY, expiresDate);
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

const localStorageServise = {
   setTokens,
   getAccessToken,
   getExpireaToken
};

export default localStorageServise;
