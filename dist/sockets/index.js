"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const http_errors_1 = __importDefault(require("http-errors"));
class SocketConfig {
    constructor() {
        this.connectedSockets = new Map();
    }
    initialize(server) {
        if (this.io) {
            console.warn("Socket.io já foi inicializado.");
            return;
        }
        this.io = new socket_io_1.Server(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST", "PUT", "DELETE"],
                credentials: true,
            }
        });
        this.io.on("connection", async (socket) => {
            this.handleConnection(socket);
        });
        // console.log("Socket inicializado")
    }
    handleConnection(socket) {
        // console.log("Cliente conectado:", socket.id);
        this.connectedSockets.set(socket.id, socket); // Adiciona o socket ao Map
        this._socket = socket;
        // Evento de desconexão
        socket.on("disconnect", () => {
            // console.log("Cliente desconectado:", socket.id);
            this.connectedSockets.delete(socket.id); // Remove o socket ao desconectar
        });
    }
    getIO() {
        if (!this.io) {
            throw (0, http_errors_1.default)(400, 'Socket.IO não foi inicializado!');
        }
        return this.io;
    }
    sendNotification() {
        if (this._socket) {
            this._socket?.broadcast.emit("new_notification");
        }
    }
}
exports.default = new SocketConfig();
