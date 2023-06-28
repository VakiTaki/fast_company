import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config.json";

// axios.defaults.baseURL(config.endPoint)
const apiURL = axios.create({ baseURL: config.apiEndpoint });

apiURL.interceptors.response.use(
   (response) => response,
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
