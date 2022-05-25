import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./Task";

@Entity()
export class Priority extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_prt: number

    @Column()
    name: string

    @OneToMany(
        type => Task, task => task.fk_pr
    )
    task: Task[]
}