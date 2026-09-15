import { BASE_API_URL } from "../config/api";
import { io, Socket } from "socket.io-client";

class SocketService {
  socket: Socket | null = null;

  connect() {
    if (!this.socket) {
      this.socket = io(BASE_API_URL);

      this.socket.on("connect", () => {
        console.log("Connected:", this.socket?.id);
      });
    }
  }

  on<T>(event: string, callback: (data: T) => void) {
    this.socket?.on(event, callback);
  }

  off(event: string) {
    this.socket?.off(event);
  }
}

export const socketService = new SocketService();