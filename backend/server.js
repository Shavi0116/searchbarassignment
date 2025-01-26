const express = require("express");
const cors = require("cors");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { grpcWebMiddleware } = require("grpc-web-middleware"); // Import grpc-web-middleware
const mongoose = require("mongoose");
const Question = require("./schema");

const PROTO_PATH = "./questions.proto";
const GRPC_PORT = "50051";
const PROXY_PORT = 8080;

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const questionsProto = grpc.loadPackageDefinition(packageDefinition).QuestionService;
const grpcServer = new grpc.Server();

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

grpcServer.addService(questionsProto.service, {
  SearchQuestions: searchQuestions,
});

grpcServer.bindAsync(`0.0.0.0:${GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`gRPC server running on port ${GRPC_PORT}`);
  grpcServer.start();
});

const app = express();
app.use(cors());

app.use(grpcWebMiddleware(`localhost:${GRPC_PORT}`));

app.listen(PROXY_PORT, () => {
  console.log(`CORS-enabled gRPC-Web proxy server running on port ${PROXY_PORT}`);
});
