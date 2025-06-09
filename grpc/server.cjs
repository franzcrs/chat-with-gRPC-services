const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.resolve(__dirname, './chat.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const grpcObj = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(grpcObj.ChatService.service, {
  SayHello: (_, callback) => {
    callback(null, { message: "hello" });
  },
  ProcessText: (call, callback) => {
    const input = call.request.text;
    callback(null, { message: `${input.split('').reverse().join('')}` });
  }
});

const PORT = '50051';
server.bindAsync(`127.0.0.1:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`gRPC server running at http://127.0.0.1:${PORT}`);
  server.start();
});