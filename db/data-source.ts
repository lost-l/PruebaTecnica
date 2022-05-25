import "reflect-metadata"
import { DataSource } from "typeorm"
import { Priority } from "../src/entity/Priority"
import { State } from "../src/entity/State"
import { Task } from "../src/entity/Task"
import { User } from "../src/entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    synchronize: false,
    logging: true,
    entities: [User, Task, Priority, State],
    migrations: [],
    subscribers: [],
})
