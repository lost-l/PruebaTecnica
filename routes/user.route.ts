import express, { Request, Response } from "express";
import { check } from "express-validator";
import { userGet, userPost } from "../controller/user.control";
import { emailExists } from "../helpers/db_validation";
import { fieldValidation } from "../middlewares/fieldValidation";
const router = express();

router.use(express.json())

router.post('/', [
    check('name', 'The name is required').notEmpty(),
    check('password', 'Minimun 6 character for password').isLength({ min: 6 }),
    check('email', 'Email must be valid').isEmail(),
    check('email').custom(emailExists),
    fieldValidation
], userPost)

router.get('/', userGet)

export { router };