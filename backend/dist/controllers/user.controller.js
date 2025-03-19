"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
/**
 * Get All Users
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} returns list of users.
 */
const getUsers = (req, res) => {
    const users = user_model_1.default.getUsers();
    res.status(200).json(users);
};
/**
 * creates a new user and add to dataBase
 *
 * @param {Request<{}, {}, Omit<User, 'id'>>} req
 * @param {Response} res
 * @returns returns new user
 */
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, favoritePokemon } = req.body;
    if (!username || !password || !favoritePokemon) {
        res.status(422).json({ message: "You should fill all inputs!" });
    }
    const user = yield user_model_1.default.CreateUser({ username, password, favoritePokemon });
    if (!user) {
        res.status(409).json({ error: "Username taken!" });
        return;
    }
    res.status(201).json(user);
});
/**
 * search by username
 *
 * @param {Request<{ username: string }>} req
 * @param {Response} res
 * @returns returns user with matching username
 */
const searchByUsername = (req, res) => {
    if (req.session && req.session.username) {
        const user = user_model_1.default.findByUsername(req.session.username);
        res.status(200).json(user);
        return;
    }
    res.status(500).send("User is not logged in");
};
/**
 * Login User
 *
 * @param {Request<{}, {}, Omit<User, 'id'>>} req
 * @param {Response} res
 * @returns {void} returns cookie and redirect
 */
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(500).send("Username/Password is missing");
        return;
    }
    const user = yield user_model_1.default.login(username, password);
    if (!user) {
        res.status(500).send("Login details incorrect!");
        return;
    }
    if (req.session) {
        req.session.isLoggedIn = true;
        req.session.username = user.username;
    }
    res.status(200).send('logged');
});
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns  clear cookies
 */
const logout = (req, res) => {
    req.session = null;
    res.status(301).json({
        message: "Cookie cleared, logout user"
    });
};
const checkCookie = (req, res) => {
    if (req.session && req.session.isLoggedIn) {
        res.status(200).json({
            content: req.session.isLoggedIn
        });
        return;
    }
    res.status(500).json({
        content: 'No cookies, have to login!'
    });
};
exports.default = {
    getUsers,
    addUser,
    searchByUsername,
    loginUser,
    logout,
    checkCookie
};
