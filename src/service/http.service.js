import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import configFile from "../config.json";

// axios.defaults.baseURL(config.endPoint)
const apiURL = axios.create({ baseURL: configFile.apiEndpoint });
function transformData(data) {
   return data ? Object.values(data) : [];
}
apiURL.interceptors.request.use(
   function (config) {
      if (configFile.isFireBase) {
         const containSlash = /\/$/gi.test(config.url);
         config.url = (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
         return config;
      };
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
