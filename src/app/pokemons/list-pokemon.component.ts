
//Imports depuis angular core
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

//Nos imports
import { Pokemon } from './pokemon';
import { Router } from '@angular/router';
import {PokemonsService } from './pokemons.service';

//Un composant, c'est une classe + une vue
//On peut le lier à un template, qui se charge de l'affichage
@Component({
  selector: 'list-pokemon',
  templateUrl: `./app/pokemons/list-pokemon.component.html`,  //Chemin vers mon template
})
export class ListPokemonComponent implements OnInit { 

  private pokemons: Pokemon[] = null;
  private title: string = "Liste de Pokémons";

  constructor(private router: Router, private pokemonsService: PokemonsService) { }

  //Obligatoire quand on implemente OnInit !
  //Initialisation du composant (sur son cycle de vie)
  ngOnInit()
  {
    this.pokemonsService.getPokemons()
      .subscribe(pokemons => this.pokemons = pokemons);
  }

  //Création d'une méthode (gestion du clic d'un utilisateur sur un pokemon !)
  selectPokemon(pokemon : Pokemon)
  {
    console.log("Vous avez cliqué sur " + pokemon.name);  //simple affichage pour l'instant
    let link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }
}