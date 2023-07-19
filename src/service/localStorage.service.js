const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt_expires";
const USER_ID_KEY = "user_local_id";

export function setTokens({ refreshToken, idToken, expiresIn = 3600, email, localId }) {
   const expiresDate = new Date().getTime() + expiresIn * 1000;
   localStorage.setItem(TOKEN_KEY, idToken);
   localStorage.setItem(REFRESH_KEY, refreshToken);
   localStorage.setItem(EXPIRES_KEY, expiresDate);
   localStorage.setItem(USER_ID_KEY, localId);
}

export function getAccessToken() {
   return localStorage.getItem(TOKEN_KEY);
}
export function getRefreshToken() {
   return localStorage.getItem(REFRESH_KEY);
}
export function getExpiresToken() {
   return localStorage.getItem(EXPIRES_KEY);
}
export function getUserId() {
   return localStorage.getItem(USER_ID_KEY);
}
export function removeAuthData() {
   localStorage.removeItem(TOKEN_KEY);
   localStorage.removeItem(REFRESH_KEY);
   localStorage.removeItem(EXPIRES_KEY);
   localStorage.removeItem(USER_ID_KEY);
}
const localStorageServise = {
   setTokens,
   getAccessToken,
   getExpiresToken,
   getUserId,
   getRefreshToken,
   removeAuthData
};

export default localStorageServise;
