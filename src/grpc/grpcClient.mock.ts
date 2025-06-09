export function sayHello(): Promise<string> {
  return Promise.resolve("Hello from mock");
}

export function processText(text: string): Promise<string> {
  return Promise.resolve(`mocked: ${text.split('').reverse().join('')}`);
}