import { compareSync } from "bcryptjs";
import { Request, Response } from "express";
import { AppDataSource } from "../db/data-source";
import { generateJWT } from "../helpers/jwt-generate";
import { User } from "../src/entity/User";


const loginPost = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const userRepo = AppDataSource.getRepository(User)
    const user = await userRepo.findOne({
        select: ["id_user", "email", "password"],
        where: { email }
    })
    if (!user) return res.status(400).json({
        err: "Check out your email or password"
    })
    if (!compareSync(password, user.password)) return res.status(400).json({
        err: "Check out your email or password"
    })

    const token = await generateJWT(user.id_user);

    res.json({ token })
}

export { loginPost }