import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./Task";

@Entity()
export class State extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_st: number

    @Column()
    name: string

    @OneToMany(
        type => Task, task => task.fk_st
    )
    task: Task[]
}