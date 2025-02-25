import { Server as SocketIOServer, Socket } from "socket.io";
import { Server as HttpServer } from 'http';
import createHttpError from "http-errors";


class SocketConfig {
    private io: SocketIOServer | undefined;
    public _socket: Socket | undefined;
    private connectedSockets: Map<string, Socket>; // Map para gerenciar vários sockets

    constructor() {
        this.connectedSockets = new Map();    
    }

    initialize(server: HttpServer) {
        if (this.io){
            console.warn("Socket.io já foi inicializado.")
            return
        }

        this.io = new SocketIOServer(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST", "PUT", "DELETE"],
                credentials: true,
            }
        });

        this.io.on("connection", async (socket: Socket) => {
            this.handleConnection(socket);
        });

        // console.log("Socket inicializado")
    }

    private handleConnection(socket: Socket) {
        // console.log("Cliente conectado:", socket.id);
        this.connectedSockets.set(socket.id, socket); // Adiciona o socket ao Map
        this._socket = socket

        // Evento de desconexão
        socket.on("disconnect", () => {
            // console.log("Cliente desconectado:", socket.id);
            this.connectedSockets.delete(socket.id); // Remove o socket ao desconectar
        });
    }

    getIO(): SocketIOServer {
        if (!this.io) {
            throw createHttpError(400, 'Socket.IO não foi inicializado!');
        }
        return this.io;
    }

    sendNotification() {
        if (this._socket) {
            this._socket?.broadcast.emit("new_notification")
        }
    }
}

export default new SocketConfig();
