"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const team_model_1 = __importDefault(require("../models/team.model"));
/**
 * Get Team
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} returns list of pokemon
 */
const getPokemons = (req, res) => {
    const pokemons = team_model_1.default.getTeam();
    res.status(200).json(pokemons);
};
/**
 * Get Favorites
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} returns list of favorite pokemon
 */
const getFavList = (req, res) => {
    const pokemons = team_model_1.default.getFavorites();
    res.status(200).json(pokemons);
};
/**
 * Add pokemon to team database
 *
 * @param {Request<{}, {}, {}>} req
 * @param {Response} res
 * @returns add pokemon to database and team
 */
const addPokemon = (req, res) => {
    const { pokeId, pokeName, assignedTeam } = req.body;
    if (!pokeId || !pokeName || !assignedTeam) {
        res.status(422).json({ message: "You should fill all inputs" });
    }
    const pokemon = team_model_1.default.addPoke({ pokeId, pokeName, assignedTeam });
    res.status(201).json(pokemon);
};
/**
 * Add pokemon to favorite database
 *
 * @param {Request<{}, {}, {}>} req
 * @param {Response} res
 * @returns add pokemon to database and favorite List
 */
const favoritePokemon = (req, res) => {
    const { pokeId, pokeName, assignedTeam } = req.body;
    if (!pokeId || !pokeName || !assignedTeam) {
        res.status(422).json({ message: "You should fill all inputs" });
    }
    const pokemon = team_model_1.default.addFavorite({ pokeId, pokeName, assignedTeam });
    if (!pokemon) {
        res.status(409).json({
            error: "pokemon is already favorite!"
        });
    }
    res.status(201).json(pokemon);
};
/**
 * Delete pokemon from team by Id
 *
 * @param {Request<{ pokeId: string }>} req
 * @param {Response} res
 * @returns {void} returns success or fail message
 */
const deletePokemon = (req, res) => {
    const { pokeId } = req.params;
    const result = team_model_1.default.removePokeById(pokeId);
    if (!result) {
        res.status(404).json({ error: "Pokemon not found!" });
        return;
    }
    res.status(200).json({ message: "Removed pokemon!" });
};
/**
 * Unfavorite pokemon from team by Id
 *
 * @param {Request<{ pokeId: string }>} req
 * @param {Response} res
 * @returns {void} returns success or fail message
 */
const UnfavoritePokemon = (req, res) => {
    const { pokeId } = req.params;
    const result = team_model_1.default.removeFavById(pokeId);
    if (!result) {
        res.status(404).json({ error: "Pokemon not found!" });
        return;
    }
    res.status(200).json({ message: "Unfavorited Pokemon!" });
};
/**
 * search by Id on team list
 */ 
