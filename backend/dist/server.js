"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const team_routes_1 = __importDefault(require("./routes/team.routes"));
dotenv_1.default.config();
//Create server
const app = (0, express_1.default)();
//Middleware
app.use((0, cors_1.default)({
    origin: "http://localhost:4321",
    credentials: true
}));
app.use(express_1.default.json());
const SIGN_KEY = process.env.COOKIE_SIGN_KEY;
const ENCRYPT_KEY = process.env.COOKIE_ENCRYPT_KEY;
if (!SIGN_KEY || !ENCRYPT_KEY) {
    throw new Error("Missing cookie keys");
}
app.use((0, cookie_session_1.default)({
    name: "Session",
    keys: [
        SIGN_KEY,
        ENCRYPT_KEY
    ],
    maxAge: 5 * 60 * 1000
}));
app.use((0, cookie_parser_1.default)(process.env.COOKIE_KEY));
//Routes
app.use('/user', user_routes_1.default);
app.use('/team', team_routes_1.default);
//Fallback
app.use((req, res) => {
    res.status(404).send("Error 404. Page not found!");
});
//Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});
