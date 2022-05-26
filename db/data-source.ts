import "reflect-metadata"
import { DataSource } from "typeorm"
import { Priority } from "../src/entity/Priority"
import { State } from "../src/entity/State"
import { Task } from "../src/entity/Task"
import { User } from "../src/entity/User"
import { ViewPriorityFields } from "../src/entity/ViewPriority"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [User, Task, Priority, State, ViewPriorityFields],
    migrations: [],
    subscribers: [],
})
