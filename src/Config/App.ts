import "dotenv/config"
import { Express } from "express";
import express from "express";
import { Server as HttpServer, createServer } from "http";
import SocketConfig from "../sockets/index"
import { routes } from "../routes";
import path from "path";
import { checkIfInterestExist } from "../helpers/checkIfInterestExist";
import { InterestType } from "../Types";
import { DEFAULT_INTERESTS } from "../utils/default-interests";

// @types/prisma typescript nodemon @types/jsonwebtoken
export class App {
    public app: Express;
    public server: HttpServer;
    private _port: number = Number(process.env.PORT);

    constructor() {
        this.app = express();
        this.server = createServer(this.app);

        this.middlewares();
        this.routes();
        this.sockets();
    }

    async middlewares() {
        this.app.use(express.json())

        // Servindo arquivos estáticos
        this.app.use('/files', express.static(path.resolve(__dirname, '..', 'Files')));
        
        for (const role of DEFAULT_INTERESTS) {
            await checkIfInterestExist({ name: role.name, type: role.type })
        }
    }

    routes() {
        // Rota Raiz
        this.app.get("/", (Request, Response) => {
            Response.send("WELCOME TO Stivy API.")
        });

        this.app.use(routes)
    }

    start() {
        this.app.listen(this._port || 1111, () => {
            console.log(`Servidor rodando na porta ${this._port ? this._port : 1111}`)
        })
    }

    sockets() {
        SocketConfig.initialize(this.server)
    }
}