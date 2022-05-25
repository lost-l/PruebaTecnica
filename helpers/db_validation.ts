import { AppDataSource } from "../db/data-source"
import { User } from "../src/entity/User"


export const emailExists = async (email: string) => {
    const userRepo = AppDataSource.getRepository(User)
    const user = await userRepo.findOne({
        select: ["email"],
        where: { email }
    })
    if (user) throw new Error("Email already exists");
}