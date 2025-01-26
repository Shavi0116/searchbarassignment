const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { getDB } = require("./connect.js");

const PROTO_PATH = __dirname + "/search.proto";

// Load the protobuf file
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const searchProto = grpc.loadPackageDefinition(packageDefinition).SearchService;

// Implement the SearchQuestions RPC
const searchQuestions = async (call, callback) => {
  const query = call.request.query;
  const db = getDB();

  try {
    const results = await db
      .collection("questions")
      .find({ title: { $regex: query, $options: "i" } }) // Case-insensitive search
      .toArray();

    const response = results.map((question) => ({
      id: question._id.toString(),
      title: question.title,
      type: question.type,
    }));

    callback(null, { questions: response });
  } catch (err) {
    callback(err);
  }
};

// Start the gRPC server
const startServer = () => {
  const server = new grpc.Server();
  server.addService(searchProto.service, { SearchQuestions: searchQuestions });
  server.bindAsync(
    `0.0.0.0:${process.env.PORT}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log(`gRPC server running on port ${process.env.PORT}`);
      server.start();
    }
  );
};

module.exports = startServer;
