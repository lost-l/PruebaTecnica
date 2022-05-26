import { Request, Response } from "express";
import { AppDataSource } from "../db/data-source";
import { ViewPriorityFields } from "../src/entity/ViewPriority";



const priorityGet = async (req: Request, res: Response) => {
    const data = await AppDataSource.manager.find(ViewPriorityFields);
    res.json(data)
    // console.log(data)
}

export { priorityGet }