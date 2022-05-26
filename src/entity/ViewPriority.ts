import { ViewEntity, ViewColumn, DataSource } from "typeorm";
import { Priority } from "./Priority";

@ViewEntity({
    database: "test",
    expression: (dataSource: DataSource) =>
        dataSource
            .createQueryBuilder()
            .select("priority.id_prt", "id")
            .addSelect("priority.name", "name")
            .from(Priority, "priority")
})
export class ViewPriorityFields {

    @ViewColumn()
    id: number;

    @ViewColumn()
    name: string;

}