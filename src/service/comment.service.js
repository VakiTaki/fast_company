import httpService from "./http.service";

const commentsEndpoint = "comments/";

const commentsService = {
   createComment: async (content) => {
      const { data } = await httpService.put(commentsEndpoint + content._id, content);
      return data;
   },
   getComments: async (pageId) => {
      const { data } = await httpService.get(commentsEndpoint, {
         params: {
            orderBy: `"pageId"`,
            equalTo: `"${pageId}"`
         }
      });
      return data;
   },
   removeComment: async (id) => {
      const { data } = await httpService.delete(commentsEndpoint + id);
      return data;
   }
};
export default commentsService;
