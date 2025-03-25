"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PokeModel {
    constructor() {
        this.team = [];
        this.favorite = [];
        this.counter = 0;
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
        this.counter++;
        const { pokeName, pokeId, assignedTeam } = newPoke;
        const foundIndex = this.team.findIndex(t => t.pokeName === pokeName);
        if (foundIndex !== -1)
            return false;
        const pokemon = {
            pokeId,
            pokeName,
            assignedTeam
        };
        const teamMax = 6;
        if (this.counter > teamMax) {
            return;
        }
        this.team.push(pokemon);
        return pokemon;
    }
    removePokeById(pokeId) {
        this.counter--;
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
        const { pokeName, pokeId } = newPoke;
        const foundIndex = this.favorite.findIndex(t => t.pokeName === pokeName);
        if (foundIndex !== -1)
            return false;
        const pokemon = {
            pokeId,
            pokeName,
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
