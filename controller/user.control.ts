import { genSaltSync, hashSync } from "bcryptjs";
import { Request, Response } from "express";
import { AppDataSource } from "../db/data-source";
import { Priority } from "../src/entity/Priority";
import { State } from "../src/entity/State";
import { User } from "../src/entity/User";

const defaultValues = () => {
    //State
    const stateRepo = AppDataSource.getRepository(State)
    const states = ['pending', 'done', 'deleted']
    states.forEach(async (name) => {
        const existsState = await stateRepo.findOne({ where: { name } })
        if (!existsState) {
            const defaultState = stateRepo.create({ name })
            await stateRepo.save(defaultState);
        }
    })

    //Priority
    const priorityRepo = AppDataSource.getRepository(Priority)
    const priorities = ['high', 'medium', 'low']
    priorities.forEach(async (name) => {
        const existsPriority = await priorityRepo.findOne({ where: { name } })
        if (!existsPriority) {
            const defaultPriority = priorityRepo.create({ name })
            await priorityRepo.save(defaultPriority)
        }
    })
}

export const userPost = async (req: Request, res: Response) => {
    defaultValues()
    const { name, email, password } = req.body;
    const userRepo = AppDataSource.getRepository(User);
    const user = userRepo.create({
        name, email, password
    })
    user.password = hashSync(password, genSaltSync());

    await userRepo.save(user);
    return res.json(user)
}

