let client: typeof import('./grpc/grpcClient.node');

if (import.meta.env.MODE === 'development' && typeof window !== 'undefined') {
  client = await import('./grpc/grpcClient.mock');
} else {
  client = await import('./grpc/grpcClient.node');
}

export const sayHello = client.sayHello;
export const processText = client.processText;