import socketIOClient from "socket.io-client";
 
// socketIOClient connects front-end to with socket backend URL

// class Socket {
//   constructor() {
//     if(!Socket.instance) {
//       this.socket = socketIOClient('http://localhost:3500', {
//         transports: [ "websocket" ],
//         reconnectionAttempts: 20,
//         reconnectionDelay: 5000
//        });

//        Socket.instance = this;
//     }
//     return Socket.instance
//   }

// }

// const SocketClient = new Socket();
// Object.freeze(SocketClient);

// export default SocketClient;

export const socket = socketIOClient('http://localhost:3500', {
          transports: [ "websocket" ],
          reconnectionAttempts: 20,
          reconnectionDelay: 5000
         });
  
