import { v4 as uuidv4 } from "uuid";
import { Pokemon } from "../types/team";

class PokeModel {
    team: Pokemon[] = []
    favorite: Pokemon[] = []

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
        const { pokeName, pokeId, assignedTeam } = newPoke
        const foundIndex = this.team.findIndex(t => t.pokeName === pokeName)
        if (foundIndex !== -1) return false
        const pokemon = {
            pokeId,
            pokeName,
            assignedTeam
        }

        this.team.push(pokemon)
        return pokemon
    }
    
    removePokeById (pokeId: string) {
        const foundIndex = this.team.findIndex(u => u.pokeId === pokeId)
        if (foundIndex === -1) return false
        this.team.splice(foundIndex, 1)
        return true
    }

    getFavorites() {
        return this.favorite
    }

    addFavorite(newPoke: Pokemon) {
        const { pokeName, pokeId, assignedTeam } = newPoke
        const foundIndex = this.favorite.findIndex(t => t.pokeName === pokeName)
        if (foundIndex !== -1) return false
        const pokemon = {
            pokeId,
            pokeName,
            assignedTeam
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
