import { Router } from "express";
import teamController from "../controllers/team.controller";

const teamRouter = Router()

teamRouter.get('/get-team', teamController.getPokemons)
teamRouter.get('/get-fav', teamController.getFavList)
teamRouter.post('/add-team', teamController.addPokemon)
teamRouter.post('/add-fav', teamController.favoritePokemon)
teamRouter.delete('/rmv-team', teamController.deletePokemon)
teamRouter.delete('/rmv-fav', teamController.unfavoritePokemon)
teamRouter.get('/info-team', teamController.searchById)
teamRouter.get('/info-fav', teamController.searchFavById)

export default teamRouter