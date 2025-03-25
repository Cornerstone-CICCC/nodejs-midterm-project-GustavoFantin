import { v4 as uuidv4 } from "uuid";
import { favPokemon, Pokemon } from "../types/team";

class PokeModel {
    team: Pokemon[] = []
    favorite: favPokemon[] = []
    counter = 0

    getTeam() {
        return this.team
    }

    findById(pokeId: string, assignedTeam: number) {
        const pokemon = this.team.find(p => p.pokeId === pokeId && p.assignedTeam === assignedTeam)
        if (!pokemon) return null
        return pokemon
    }

    findFavById(pokeId: string) {
        const pokemon = this.favorite.find(p => p.pokeId === pokeId)
        if (!pokemon) return null
        return pokemon
    }

    addPoke(newPoke: Pokemon) {
        this.counter++
        const { pokeName, pokeId, assignedTeam } = newPoke
        const foundIndex = this.team.findIndex(t => t.pokeName === pokeName)
        if (foundIndex !== -1) return false
        const pokemon = {
            pokeId,
            pokeName,
            assignedTeam
        }
        const teamMax = 6
        if (this.counter > teamMax) {
            return 
        }

        this.team.push(pokemon)
        return pokemon
    }
    
    removePokeById (pokeId: string) {
        this.counter--
        const foundIndex = this.team.findIndex(u => u.pokeId === pokeId)
        if (foundIndex === -1) return false
        this.team.splice(foundIndex, 1)
        return true
    }

    getFavorites() {
        return this.favorite
    }

    addFavorite(newPoke: favPokemon) {
        const { pokeName, pokeId } = newPoke
        const foundIndex = this.favorite.findIndex(t => t.pokeName === pokeName)
        if (foundIndex !== -1) return false
        const pokemon = {
            pokeId,
            pokeName,
        }

        this.favorite.push(pokemon)
        return pokemon
    }
    
    removeFavById (pokeId: string) {
        const foundIndex = this.favorite.findIndex(u => u.pokeId === pokeId)
        if (foundIndex === -1) return false
        this.favorite.splice(foundIndex, 1)
        return true
    }
}

export default new PokeModel
