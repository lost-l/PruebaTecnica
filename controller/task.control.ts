import { Response } from "express"
import { AppDataSource } from "../db/data-source"
import { myRequest, SearchOptions } from "../helpers/myTypes"
import { Priority } from "../src/entity/Priority";
import { State } from "../src/entity/State";
import { Task } from "../src/entity/Task"
import { User } from "../src/entity/User";

const taskRepo = AppDataSource.getRepository(Task);
const userRepo = AppDataSource.getRepository(User);
const stateRepo = AppDataSource.getRepository(State);
const prtRepo = AppDataSource.getRepository(Priority);

const taskGet = async (req: myRequest, res: Response) => {

    const { state, priority } = req.query
    const { id_task } = req.params;
    const searchTask = parseInt(id_task, 10)
    const user = await userRepo.findOne({ where: { id_user: req.uid } })
    let stateSearch: State, prioritySearch: Priority;
    if (state) {
        stateSearch = (await stateRepo.findOneBy({ name: state as string }))!
    }
    if (priority) {
        prioritySearch = (await prtRepo.findOneBy({ name: priority as string }))!
    }

    if (isNaN(searchTask)) {
        const task = await taskRepo.createQueryBuilder('task')
            .where('task.fkUserIdUser = :id', { id: user?.id_user })
            .getMany()
        if (!task.length) return res.json({ msg: "You don't have tasks" })
        return res.json(task)
    } else {
        const task = await taskRepo.createQueryBuilder('task')
            .where('task.fkUserIdUser = :id', { id: user?.id_user })
            .andWhere('(task.id_task = :id_task)', { id_task: searchTask })
            // .andWhere('(task.fkStIdSt = :id_state)', { id_state: stateSearch.id_st })
            // .andWhere('(task.fkPrIdPrt = :id_prt)', { id_prt: })
            .getOne()

        if (!task) return res.status(400).json({ err: `Id task ${id_task} was not found` })
        return res.json(task)
    }
}

const taskPost = async (req: myRequest, res: Response) => {
    const { info, state, priority } = req.body
    const fk_user = await userRepo.findOne({ where: { id_user: req.uid } })
    const fk_st = await stateRepo.findOne({ where: { name: state } })
    const fk_pr = await prtRepo.findOne({ where: { name: priority } })
    const task = new Task();
    task.info = info;
    task.fk_user = fk_user!;
    task.fk_st = fk_st!;
    task.fk_pr = fk_pr!;

    await taskRepo.save(task)
    res.json(task)
}

const taskPut = async (req: myRequest, res: Response) => {
    const { id_task } = req.params;
    const { info, state, priority, user_id } = req.body
    const searchTask = parseInt(id_task, 10)

    const updateTask = await taskRepo.findOne({
        where: { id_task: searchTask }
    })

    if (!updateTask) return res.status(400).json({ err: `The task id ${id_task} was not found` })

    if (info) updateTask.info = info
    if (state) {
        const updateState = await stateRepo.findOne({
            where: { name: state }
        })
        console.log(updateState)
        updateTask.fk_st = updateState!
    }
    if (priority) {
        const updatePriority = await prtRepo.findOne({
            where: { name: priority }
        })
        console.log(updatePriority, priority)
        updateTask.fk_pr = updatePriority!
    }
    if (user_id) {
        const updateUser = await userRepo.findOneBy({
            id_user: user_id
        })
        if (!updateUser) return res.status(400).json({
            err: `User id ${user_id} was not found`
        })
        else updateTask.fk_user = updateUser
    }
    await taskRepo.save(updateTask);
    res.json(updateTask)
}

const taskDelete = async (req: myRequest, res: Response) => {
    const { id_task } = req.params;
    const deletedTask = await taskRepo.findOneBy({
        id_task: +id_task
    })
    if (!deletedTask) return res.status(400).json({
        err: `The id task ${id_task} was not found`
    })

    const deleted = await taskRepo.remove(deletedTask);
    res.json({ deleted })
}

export { taskGet, taskPost, taskPut, taskDelete }