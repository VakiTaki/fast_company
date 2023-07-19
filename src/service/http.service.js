import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import configFile from "../config.json";
import { httpAuth } from "../hooks/useAuth";
import localStorageServise from "./localStorage.service";

// axios.defaults.baseURL(config.endPoint)
const apiURL = axios.create({ baseURL: configFile.apiEndpoint });
function transformData(data) {
   return data && !data._id ? Object.values(data) : data;
}
apiURL.interceptors.request.use(
   async function (config) {
      if (configFile.isFireBase) {
         const containSlash = /\/$/gi.test(config.url);
         config.url = (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
         const expiresDate = localStorageServise.getExpiresToken();
         const refreshToken = localStorageServise.getRefreshToken();
         if (refreshToken && expiresDate < Date.now()) {
            const { data } = await httpAuth.post("token", { grant_type: "refresh_token", refresh_token: refreshToken });
            localStorageServise.setTokens({
               refreshToken: data.refresh_token,
               idToken: data.id_token,
               expiresIn: data.expires_in,
               localId: data.user_id
            }
            );
         }
         const accessToken = localStorageServise.getAccessToken();
         if (accessToken) {
            config.params = { ...config.params, auth: accessToken };
         }
      };
      return config;
   }, function (error) {
      return Promise.reject(error);
   }
);
apiURL.interceptors.response.use(
   (response) => {
      if (configFile.isFireBase) {
         response.data = { content: (transformData(response.data)) };
      }
      return response;
   },
   function (error) {
      const expectedErrors =
         error.response &&
         error.response.status >= 400 &&
         error.response.status >= 400;
      if (!expectedErrors) {
         toast.dark("Error");
         toast("Unexpected errors");
      }
      return Promise.reject(error);
   }
);
const httpService = {
   get: apiURL.get,
   post: apiURL.post,
   put: apiURL.put,
   delete: apiURL.delete
};

export default httpService;
