import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Priority } from "./Priority";
import { State } from "./State";
import { User } from "./User";


@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_task: number

    @CreateDateColumn()
    date_init: Date

    @UpdateDateColumn()
    date_upd: Date

    @Column()
    info: string

    @ManyToOne(
        type => User, user => user.id_user
    )
    fk_user: User

    @ManyToOne(
        type => Priority, priority => priority.task
    )
    fk_pr: Priority

    @ManyToOne(
        type => State, state => state.task
    )
    fk_st: State
}