import httpService from "./http.service";

const commentsEndpoint = "comments/";

const commentsService = {
   createComment: async (data) => {
      const { content } = await httpService.put(commentsEndpoint + data._id, data);
      return content;
   },
   getComments: async (pageId) => {
      const { data } = await httpService.get(commentsEndpoint, {
         params: {
            orderBy: `"pageId"`,
            equalTo: `"${pageId}"`
         }
      });
      return data;
   }
};
export default commentsService;
