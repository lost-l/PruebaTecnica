import express, { Request, Response } from "express";
import { check } from "express-validator";
import { loginPost } from "../controller/login.control";
import { fieldValidation } from "../middlewares/fieldValidation";
const router = express();

router.use(express.json())

router.post('/', [
    check('email', 'Email must be valid').isEmail(),
    check('password', 'Password is necessary').notEmpty(),
    fieldValidation
], loginPost)

export { router };