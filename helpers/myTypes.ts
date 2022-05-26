import { Request } from "express";
import { Priority } from "../src/entity/Priority";
import { State } from "../src/entity/State";
import { User } from "../src/entity/User";

declare module "jsonwebtoken" {
    export interface Tokenn {
        uid: number;
    }
}
export interface myRequest extends Request {
    uid?: number
}


export type SearchOptions = {
    fk_user?: User,
    fk_st?: State,
    fk_pr?: Priority,
}