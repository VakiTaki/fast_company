import httpService from "./http.service";

const userEndpoint = "user/";

const userService = {
   get: async () => {
      const { data } = await httpService.get(userEndpoint);
      return data;
   },
   create: async (content) => {
      const { data } = await httpService.put(userEndpoint + content._id, content);
      return data;
   }
};
export default userService;
