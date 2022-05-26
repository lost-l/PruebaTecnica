import express from "express"
import cors from "cors"
import { connection } from "../db/config";
import { router as router_user } from "../routes/user.route";
import { router as router_login } from "../routes/login.route";
import { router as router_task } from "../routes/task.route";
import { router as router_views } from "../routes/view.route";

export class Server {
    readonly app = express();
    readonly port = process.env.PORT;
    readonly paths = {
        login: "/api/login",
        user: "/api/user",
        task: "/api/task",
        views: "/api/views",
    }

    constructor() {
        this.DBconnection();
        this.middlewares();
        this.routes();
    }

    async DBconnection() {
        await connection()
    }

    middlewares() {
        this.app.use(cors())
    }

    routes() {
        this.app.use(this.paths.user, router_user)
        this.app.use(this.paths.login, router_login)
        this.app.use(this.paths.task, router_task)
        this.app.use(this.paths.views, router_views)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server on http://localhost:${this.port}`)
        })
    }
}