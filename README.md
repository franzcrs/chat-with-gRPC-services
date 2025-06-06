# Chat with gRPC Services

Chat app using gRPC services developed as practice.

練習として開発した gRPC サービスを使用したチャットアプリです。

## Setup and lunching the app ・ セットアップとアプリの起動

### Prerequisites ・ 前提条件

- **Node.js v21 or higher**  
  Install globally on your computer from [Node.js Downloads](https://nodejs.org/en/download/package-manager). Verify the installation by running this in a terminal:
  
  [Node.js Downloads](https://nodejs.org/ja/download/package-manager) からグローバルにインストールしてください。インストールを確認するにはターミナルで次を実行します:  
   ```bash
   node -v
   npm -v
   ```

### Launching the app ・ アプリの起動

1. Open a terminal window and navigate to the directory where you want to clone this repository.
  ・ターミナルを開き、このリポジトリをクローンしたいディレクトリに移動します。
   ```bash
   cd 'YOUR_FOLDER'
   ```

2. Clone this repository with a name of your preference
  ・お好みの名前でこのリポジトリをクローンします:
   ```bash
   git clone https://github.com/franzcrs/chat-with-gRPC-services.git
   cd chat-with-gRPC-services
   ```
   or
   ```bash
   git clone https://github.com/franzcrs/chat-with-gRPC-services.git new-name
   cd new-name
   ```
   
3. Install dependencies
  ・Dependenciesをインストールします:
   ```bash
   npm install
   ```

4. Try out the app
  ・アプリを起動して試します: 
   ```bash
   npm run dev
   ```
   Type in the letter `o`+`Enter` to open the browser and navigate to the app server URL (http://localhost:3000)
   ・ターミナルで `o` + `Enter` を入力すると、ブラウザで http://localhost:3000 が開きます。
   ```bash
   o
   ```