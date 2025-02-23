import "dotenv/config"
import { Express } from "express";
import express from "express";
import { Server as HttpServer, createServer } from "http";

// @types/prisma typescript nodemon @types/jsonwebtoken
export class App {
    public app: Express;
    public server: HttpServer;
    private _port: number = Number(process.env.PORT);

    constructor() {
        this.app = express();
        this.server = createServer(this.app);

        this.routes();
        this.middleares();
    }

    middleares() {
        this.app.use(express.json())
    }

    routes() {
        // Rota Raiz
        this.app.get("/", (Request, Response) => {
            Response.send("WELCOME TO Stivy API.")
        });
    }

    start() {
        this.app.listen(this._port || 1111, () => {
            console.log("Rodando")
        })
    }
}