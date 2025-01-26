const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const mongoose = require("mongoose");
const Question = require("./schema");

const PROTO_PATH = "./questions.proto";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const questionsProto = grpc.loadPackageDefinition(packageDefinition).QuestionService;

const server = new grpc.Server();

async function searchQuestions(call, callback) {
  const { query, page, pageSize } = call.request;
  const skip = (page - 1) * pageSize;

  try {
    const questions = await Question.find({
      title: { $regex: query, $options: "i" }, 
    })
      .skip(skip)
      .limit(pageSize);

    const totalResults = await Question.countDocuments({
      title: { $regex: query, $options: "i" },
    });

    callback(null, {
      questions: questions.map((q) => ({
        id: q._id.toString(),
        type: q.type,
        title: q.title,
      })),
      totalResults,
    });
  } catch (error) {
    callback(error, null);
  }
}

server.addService(questionsProto.service, {
  SearchQuestions: searchQuestions,
});

const PORT = "50051";
server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`gRPC server running on port ${PORT}`);
  server.start();
});
