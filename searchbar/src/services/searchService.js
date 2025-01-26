import * as grpcWeb from "../protos/questions_grpc_web_pb"; 
import * as proto from "../protos/questions_pb"; 

const client = new grpcWeb.QuestionServiceClient("http://localhost:8080");



export async function searchQuestions(query, page = 1, pageSize = 10) {
  return new Promise((resolve, reject) => {
    const request = new proto.SearchRequest(); 
    request.setQuery(query);
    request.setPage(page);
    request.setPageSize(pageSize);

    client.searchQuestions(request, {}, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response.toObject());
      }
    });
  });
}
