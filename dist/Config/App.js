"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const index_1 = __importDefault(require("../sockets/index"));
const routes_1 = require("../routes");
const path_1 = __importDefault(require("path"));
// @types/prisma typescript nodemon @types/jsonwebtoken
class App {
    constructor() {
        this._port = Number(process.env.PORT);
        this.app = (0, express_1.default)();
        this.server = (0, http_1.createServer)(this.app);
        this.middlewares();
        this.routes();
        this.sockets();
    }
    middlewares() {
        this.app.use(express_1.default.json());
        // Servindo arquivos estáticos
        this.app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '..', 'Files')));
    }
    routes() {
        // Rota Raiz
        this.app.get("/", (Request, Response) => {
            Response.send("WELCOME TO Stivy API.");
        });
        this.app.use(routes_1.routes);
    }
    start() {
        this.app.listen(this._port || 1111, () => {
            console.log(`Servidor rodando na porta ${this._port ? this._port : 1111}`);
        });
    }
    sockets() {
        index_1.default.initialize(this.server);
    }
}
exports.App = App;
