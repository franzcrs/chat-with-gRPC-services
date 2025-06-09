import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.resolve(__dirname, '../grpc/chat.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const grpcObj: any = grpc.loadPackageDefinition(packageDefinition);

const client = new grpcObj.ChatService('127.0.0.1:50051', grpc.credentials.createInsecure());

export function sayHello(): Promise<string> {
  return new Promise((resolve, reject) => {
    client.SayHello({}, (err: any, response: any) => {
      if (err) reject(err);
      else resolve(response.message);
    });
  });
}

export function processText(text: string): Promise<string> {
  return new Promise((resolve, reject) => {
    client.ProcessText({ text }, (err: any, response: any) => {
      if (err) reject(err);
      else resolve(response.message);
    });
  });
}