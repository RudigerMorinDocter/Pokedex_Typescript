
//Imports depuis angular core
import { Component } from '@angular/core';

//Nos imports
import { Pokemon } from './pokemons/pokemon';
import { POKEMONS } from './pokemons/mock-pokemons';

//Un composant, c'est une classe + une vue
//On peut le lier à un template, qui se charge de l'affichage
@Component({
  selector: 'pokemon-app',
  templateUrl: `./app/app.component.html`,  //Chemin vers mon template
})
export class AppComponent
{ 
  //Rôle pur d'affichage
  //Parent des composants
}