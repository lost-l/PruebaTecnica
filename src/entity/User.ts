import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Task } from "./Task"

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_user: number

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({ default: true })
    active: boolean = true

    @OneToMany(
        type => Task, (task) => task.fk_user
    )
    task: Task[]

}