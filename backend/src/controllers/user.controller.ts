import { Request, Response } from 'express'
import userModel from '../models/user.model'
import { User } from '../types/user'




/**
 * Get All Users
 * 
 * @param {Request} req
 * @param {Response} res
 * @returns {void} returns list of users.
 */
const getUsers = (req: Request, res: Response) => {
    const users = userModel.getUsers()
    res.status(200).json(users)
}

/**
 * creates a new user and add to dataBase
 * 
 * @param {Request<{}, {}, Omit<User, 'id'>>} req
 * @param {Response} res
 * @returns returns new user
 */
const addUser = async (req: Request<{}, {}, Omit<User, 'id'>>, res: Response) => {
    const { username, password, favoritePokemon } = req.body
    if (!username || !password || !favoritePokemon) {
        res.status(422).json({ message: "You should fill all inputs!" })
    }
    const user = await userModel.CreateUser({ username, password, favoritePokemon })
    if(!user) {
        res.status(409).json({ error: "Username taken!" })
        return
    }
    res.status(201).json(user)

}

/**
 * search by username
 * 
 * @param {Request<{ username: string }>} req
 * @param {Response} res
 * @returns returns user with matching username
 */
const searchByUsername = (req: Request<{ username: string }>, res: Response) => {
    if (req.session && req.session.username) {
        const user = userModel.findByUsername(req.session.username)
        res.status(200).json(user)
        return
    }
    res.status(500).send("User is not logged in")
}

/**
 * Login User
 * 
 * @param {Request<{}, {}, Omit<User, 'id'>>} req
 * @param {Response} res
 * @returns {void} returns cookie and redirect
 */
const loginUser = async (req: Request<{}, {}, Omit<User, 'id'>>, res: Response) => {
    const { username, password } = req.body
    if(!username || !password) {
        res.status(500).send("Username/Password is missing")
        return
    }

    const user = await userModel.login(username, password)
    if (!user) {
        res.status(500).send("Login details incorrect!")
        return
    }

    if (req.session) {
        req.session.isLoggedIn = true
        req.session.username = user.username
    }
    res.status(200).send('logged')
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns  clear cookies
 */
const logout = (req: Request, res: Response) => {
    req.session = null
    res.status(301).json({
        message: "Cookie cleared, logout user"
    })
}

const checkCookie = (req: Request, res: Response) => {
    if (req.session && req.session.isLoggedIn) {
        res.status(200).json({
            content: req.session.isLoggedIn
        })
        return
    }
    res.status(500).json({
        content: 'No cookies, have to login!'
    })
}

export default {
    getUsers,
    addUser,
    searchByUsername,
    loginUser,
    logout,
    checkCookie
}




