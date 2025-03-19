import { Request, Response } from 'express'
import { Pokemon } from "../types/team";
import pokeModel from '../models/team.model'

/**
 * Get Team
 * 
 * @param {Request} req
 * @param {Response} res
 * @returns {void} returns list of pokemon
 */
const getPokemons = (req: Request, res: Response) => {
    const pokemons = pokeModel.getTeam()
    res.status(200).json(pokemons)
}

/**
 * Get Favorites
 * 
 * @param {Request} req
 * @param {Response} res
 * @returns {void} returns list of favorite pokemon
 */
const getFavList = (req: Request, res: Response) => {
    const pokemons = pokeModel.getFavorites()
    res.status(200).json(pokemons)
}

/**
 * Add pokemon to team database
 * 
 * @param {Request<{}, {}, {}>} req
 * @param {Response} res
 * @returns add pokemon to database and team
 */
const addPokemon = (req: Request, res: Response) => {
    const { pokeId, pokeName, assignedTeam } = req.body
    if (!pokeId || !pokeName || !assignedTeam) {
        res.status(422).json({ message: "You should fill all inputs" })
    }
    const pokemon = pokeModel.addPoke({ pokeId, pokeName, assignedTeam })
    res.cookie('pokeId-team', pokeId, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true, 
        signed: true
    })
    
    res.status(201).json(pokemon)
}

/**
 * Add pokemon to favorite database
 * 
 * @param {Request<{}, {}, {}>} req
 * @param {Response} res
 * @returns add pokemon to database and favorite List
 */
const favoritePokemon = (req: Request, res: Response) => {
    const { pokeId, pokeName, assignedTeam } = req.body
    if (!pokeId || !pokeName || !assignedTeam) {
        res.status(422).json({ message: "You should fill all inputs" })
    }
    const pokemon = pokeModel.addFavorite({ pokeId, pokeName, assignedTeam })
    
    res.cookie('pokeId-fav', pokeId, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true, 
        signed: true
    })
    

    if (!pokemon) {
        res.status(409).json({
            error: "pokemon is already favorite!"
        })
    }

    res.status(201).json(pokemon)
}

/**
 * Delete pokemon from team by Id
 * 
 * @param {Request<{ pokeId: string }>} req
 * @param {Response} res
 * @returns {void} returns success or fail message
 */
const deletePokemon = (req: Request<{ pokeId: string }>, res: Response) => {
    const { pokeId } = req.params
    const result: boolean = pokeModel.removePokeById(pokeId)
    if (!result) {
        res.status(404).json({ error: "Pokemon not found!" })
        return
    }
    res.status(200).json({ message: "Removed pokemon!" })
}

/**
 * Unfavorite pokemon from team by Id
 * 
 * @param {Request<{ pokeId: string }>} req
 * @param {Response} res
 * @returns {void} returns success or fail message
 */
const unfavoritePokemon = (req: Request<{ pokeId: string }>, res: Response) => {
    const { pokeId } = req.params
    const result: boolean = pokeModel.removeFavById(pokeId)
    if (!result) {
        res.status(404).json({ error: "Pokemon not found!" })
        return
    }
    res.status(200).json({ message: "Unfavorited Pokemon!" })
}

/**
 * search by Id on team list
 * 
 * @param {Request<{ pokeId: string, assignedTeam: number }>} req
 * @param {Response} res
 * @returns returns pokemon that matches details
 */
const searchById = (req: Request<{ pokeId: string, assignedTeam: number }>, res: Response) => {
    const { pokeId, assignedTeam } = req.signedCookies
    if ( pokeId && assignedTeam ) {
        const pokemon = pokeModel.findById(req.signedCookies.pokeId, req.signedCookies.assignedTeam)
        res.status(200).json(pokemon)
        return
    }
    res.status(500).json({
        error: "Pokemon has not been added"
    })
}

/**
 * search by Id on fav list
 * 
 * @param {Request<{ pokeId: string }>} req
 * @param {Response} res
 * @returns returns pokemon that matches details
 */
const searchFavById = (req: Request<{ pokeId: string }>, res: Response) => {
    const { pokeId } = req.signedCookies
    if ( pokeId ) {
        const pokemon = pokeModel.findFavById(req.signedCookies.pokeId)
        res.status(200).json(pokemon)
        return
    }
    res.status(500).json({
        error: "Pokemon has not been added"
    })
}

export default {
    getPokemons,
    getFavList,
    addPokemon,
    favoritePokemon,
    deletePokemon,
    unfavoritePokemon,
    searchById,
    searchFavById

}