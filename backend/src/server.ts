import express, { Request, Response } from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import cookieSession from 'cookie-session'
import userRouter from "./routes/user.routes";
import cookieParser from "cookie-parser";
import teamRouter from "./routes/team.routes";
dotenv.config()

//Create server
const app = express()

//Middleware
app.use(cors({
    origin: "http://localhost:4321",
    credentials: true
}))
app.use(express.json())
const SIGN_KEY = process.env.COOKIE_SIGN_KEY
const ENCRYPT_KEY = process.env.COOKIE_ENCRYPT_KEY
if (!SIGN_KEY || !ENCRYPT_KEY) {
    throw new Error("Missing cookie keys")
}
app.use(cookieSession({
    name: "Session",
    keys: [
        SIGN_KEY,
        ENCRYPT_KEY
    ],
    maxAge: 5 * 60 * 1000
}))
app.use(cookieParser(process.env.COOKIE_KEY))


//Routes
app.use('/user', userRouter)
app.use('/team', teamRouter)

//Fallback
app.use((req: Request, res: Response) => {
    res.status(404).send("Error 404. Page not found!")
})


//Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`)
})