"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PokeModel {
    constructor() {
        this.team = [];
        this.favorite = [];
    }
    getTeam() {
        return this.team;
    }
    findById(pokeId, assignedTeam) {
        const pokemon = this.team.find(p => p.pokeId === pokeId && p.assignedTeam === assignedTeam);
        if (!pokemon)
            return null;
        return pokemon;
    }
    findFavById(pokeId) {
        const pokemon = this.favorite.find(p => p.pokeId === pokeId);
        if (!pokemon)
            return null;
        return pokemon;
    }
    addPoke(newPoke) {
        const { pokeName, pokeId, assignedTeam } = newPoke;
        const foundIndex = this.team.findIndex(t => t.pokeName === pokeName);
        if (foundIndex !== -1)
            return false;
        const pokemon = {
            pokeId,
            pokeName,
            assignedTeam
        };
        this.team.push(pokemon);
        return pokemon;
    }
    removePokeById(pokeId) {
        const foundIndex = this.team.findIndex(u => u.pokeId === pokeId);
        if (foundIndex === -1)
            return false;
        this.team.splice(foundIndex, 1);
        return true;
    }
    getFavorites() {
        return this.favorite;
    }
    addFavorite(newPoke) {
        const { pokeName, pokeId, assignedTeam } = newPoke;
        const foundIndex = this.favorite.findIndex(t => t.pokeName === pokeName);
        if (foundIndex !== -1)
            return false;
        const pokemon = {
            pokeId,
            pokeName,
            assignedTeam
        };
        this.favorite.push(pokemon);
        return pokemon;
    }
    removeFavById(pokeId) {
        const foundIndex = this.favorite.findIndex(u => u.pokeId === pokeId);
        if (foundIndex === -1)
            return false;
        this.favorite.splice(foundIndex, 1);
        return true;
    }
}
exports.default = new PokeModel;
