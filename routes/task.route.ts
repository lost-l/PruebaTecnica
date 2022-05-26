import express from "express";
import { check, query } from "express-validator";
import { taskGet, taskPost, taskPut, taskDelete } from "../controller/task.control";
import { checkPriorityName, checkStateName } from "../helpers/db_validation";
import { fieldValidation } from "../middlewares/fieldValidation";
import { validateJwt } from "../middlewares/validate_JWT";
const router = express();

router.use(express.json())

router.get('/(:id_task)?', [
    validateJwt,
    check('id_task', 'it must be a number').optional().isNumeric(),
    query('state', 'State must be a valid state').optional({ checkFalsy: true }).custom(checkStateName),
    query('priority', 'Priority must be a valid priority').optional({ checkFalsy: true }).custom(checkPriorityName),
    fieldValidation
], taskGet)

router.post('/', [
    validateJwt,
    check('info', 'Info must have content').notEmpty(),
    check('state', 'Invalid state').custom(checkStateName),
    check('priority', 'Invalid priority').custom(checkPriorityName),
    fieldValidation
], taskPost)

router.put('/(:id_task)', [
    validateJwt,
    check('id_task', 'The task id must be a number').isNumeric(),
    check('info', 'the info field must have content').optional({ checkFalsy: true }).notEmpty(),
    check('state', 'Invalid state').optional({ checkFalsy: true }).custom(checkStateName),
    check('priority', 'Invalid priority').optional({ checkFalsy: true }).custom(checkPriorityName),
    check('id_user', 'Must be a number').optional({ checkFalsy: true }).isNumeric(),
    fieldValidation
], taskPut)

router.delete('/(:id_task)', [
    validateJwt,
    check('id_task', 'The id task is required and it must be a number').isNumeric(),
    fieldValidation
], taskDelete)

export { router };