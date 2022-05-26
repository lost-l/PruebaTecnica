import { AppDataSource } from "../db/data-source"
import { Priority } from "../src/entity/Priority"
import { State } from "../src/entity/State"
import { User } from "../src/entity/User"

const userRepo = AppDataSource.getRepository(User)
const stateRepo = AppDataSource.getRepository(State)
const priorityRepo = AppDataSource.getRepository(Priority)

const emailExists = async (email: string) => {
    const user = await userRepo.findOne({
        select: ["email"],
        where: { email }
    })
    if (user) throw new Error("Email already exists");
}

const defaultValues = () => {
    //State
    const states = ['pending', 'done'] // , 'deleted'
    states.forEach(async (name) => {
        const existsState = await stateRepo.findOne({ where: { name } })
        if (!existsState) {
            const defaultState = stateRepo.create({ name })
            await stateRepo.save(defaultState);
        }
    })

    //Priority
    const priorities = ['high', 'medium', 'low']
    priorities.forEach(async (name) => {
        const existsPriority = await priorityRepo.findOne({ where: { name } })
        if (!existsPriority) {
            const defaultPriority = priorityRepo.create({ name })
            await priorityRepo.save(defaultPriority)
        }
    })
}

const checkStateName = async (name: string) => {
    if (name.length <= 2) throw new Error('Invalid state')
    name = name.trim().toLowerCase();
    const names = await stateRepo.find({
        select: ["name"]
    })
    if (!names.some(stateNames => stateNames.name == name))
        throw new Error('Invalid state')
}

const checkPriorityName = async (name: string) => {
    if (name.length <= 2) throw new Error('Invalid state')
    name = name.trim().toLowerCase();
    const names = await priorityRepo.find({
        select: ["name"]
    })
    if (!names.some(priorityNames => priorityNames.name == name))
        throw new Error('Invalid state')
}

export { emailExists, defaultValues, checkStateName, checkPriorityName }