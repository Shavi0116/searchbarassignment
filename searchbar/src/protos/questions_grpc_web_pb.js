

import * as grpcWeb from 'grpc-web';
import * as proto from './questions_pb.js';

export class QuestionServiceClient {
  constructor(hostname, credentials, options) {
    if (!options) options = {};
    options.format = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname.replace(/\/+$/, '');
  }

  searchQuestions(request, metadata, callback) {
    return this.client_.rpcCall(
      this.hostname_ + '/QuestionService/SearchQuestions',
      request,
      metadata || {},
      methodDescriptor_QuestionService_SearchQuestions,
      callback
    );
  }
}

export class QuestionServicePromiseClient {
  constructor(hostname, credentials, options) {
    if (!options) options = {};
    options.format = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname.replace(/\/+$/, '');
  }

  searchQuestions(request, metadata) {
    return this.client_.unaryCall(
      this.hostname_ + '/QuestionService/SearchQuestions',
      request,
      metadata || {},
      methodDescriptor_QuestionService_SearchQuestions
    );
  }
}

export const methodDescriptor_QuestionService_SearchQuestions = new grpcWeb.MethodDescriptor(
  '/QuestionService/SearchQuestions',
  grpcWeb.MethodType.UNARY,
  proto.SearchRequest,
  proto.SearchResponse,
  function (request) {
    return request.serializeBinary();
  },
  proto.SearchResponse.deserializeBinary
);
