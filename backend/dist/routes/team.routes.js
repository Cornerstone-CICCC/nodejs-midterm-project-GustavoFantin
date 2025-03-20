"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_controller_1 = __importDefault(require("../controllers/team.controller"));
const teamRouter = (0, express_1.Router)();
teamRouter.get('/get-team', team_controller_1.default.getPokemons);
teamRouter.get('/get-fav', team_controller_1.default.getFavList);
teamRouter.post('/add-team', team_controller_1.default.addPokemon);
teamRouter.post('/add-fav', team_controller_1.default.favoritePokemon);
teamRouter.delete('/rmv-team', team_controller_1.default.deletePokemon);
teamRouter.delete('/rmv-fav', team_controller_1.default.unfavoritePokemon);
teamRouter.get('/info-team', team_controller_1.default.searchById);
teamRouter.get('/info-fav', team_controller_1.default.searchFavById);
exports.default = teamRouter;
