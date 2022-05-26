import * as jwt from "jsonwebtoken";

export const generateJWT = (uid: number) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ uid }, process.env.PRIVATE_KEY!, { expiresIn: "4h" }, (err, token) => {
            if (err) reject(`It could'nt generate the token ${err}`)
            else resolve(token);
        })
    })
}