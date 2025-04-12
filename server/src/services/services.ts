import { Server, Socket } from "Socket.io";
import Redis from "ioredis";

const pub = new Redis();
const sub = new Redis();

class SocketService {
  private _io: Server;

  constructor() {
    console.log("Init Socket service....");
    this._io = new Server();
    sub.subscribe("MESSAGES");
  }

  public initListener() {
    const io = this.io;
    io.on("Connect", (socket) => {
      console.log(`New Socket is connected ${socket.id}`);
      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log(`New message Recieved ${message}`);
        pub.publish("MESSAGES", JSON.stringify(message));
      });
    });

    sub.on("message", (channel, message) => {
      if (channel == "MESSAGES") {
        console.log("New message is from redis", message);
        io.emit("message", message);
      }
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
