import express, { Request, Response } from "express";
const router = express();

router.use(express.json())

router.get("/", (req: Request, res: Response) => {
    res.send("Hi")
})
export { router };