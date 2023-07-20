import httpService from "./http.service";
import localStorageServise from "./localStorage.service";

const userEndpoint = "user/";

const userService = {
   get: async () => {
      const { data } = await httpService.get(userEndpoint);
      return data;
   },
   create: async (content) => {
      const { data } = await httpService.put(userEndpoint + content._id, content);
      return data;
   },
   getCurrentUser: async () => {
      const { data } = await httpService.get(userEndpoint + localStorageServise.getUserId());
      return data;
   },
   editUser: async (content) => {
      const { data } = await httpService.patch(userEndpoint + localStorageServise.getUserId(), content);
      return data;
   }
};
export default userService;
