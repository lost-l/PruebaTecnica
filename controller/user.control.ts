import { genSaltSync, hashSync } from "bcryptjs";
import { Request, Response } from "express";
import { AppDataSource } from "../db/data-source";
import { defaultValues } from "../helpers/db_validation";
import { User } from "../src/entity/User";


const userPost = async (req: Request, res: Response) => {
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

const userGet = async (req: Request, res: Response) => {
    const userRepo = AppDataSource.getRepository(User);
    const users = await userRepo.find({
        where: { active: true }
    })
    res.json({ users })
}

export { userPost, userGet }