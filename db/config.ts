import { AppDataSource } from "../db/data-source"

export const connection = async () => {
    try {
        await AppDataSource.initialize()
        console.log("Connection succesfully")
    } catch (error) { console.log(`Connection ${error}`) }
}