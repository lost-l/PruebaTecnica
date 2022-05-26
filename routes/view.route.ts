import express from "express";
import { priorityGet } from "../controller/view.controll";
const router = express();

router.use(express.json());

router.get('/priority', priorityGet)

export { router };