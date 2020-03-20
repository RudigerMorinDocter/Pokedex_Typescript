import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
  
@Component({
    selector: 'login',
    template: `
    <style>
        input:focus {
        border-bottom: 1px solid #5c6bc0 !important;
        box-shadow: 0 1px 0 0 #5c6bc0 !important;
        }

        label.active {
        color: #5c6bc0 !important;
        }
    </style>
    <div class='row'>
    <div class="col s12 m4 offset-m4">
    <div class="card hoverable">
      <div class="card-content center">
        <span class="card-title">Page de connexion</span>
        <p><em>{{message}}</em></p>
      </div>
            <form #loginForm="ngForm">
          <div>
                    <label for="name">Name</label>
            <input type="text" id="name" [(ngModel)]="name" name="name" required>
          </div>
          <div>
            <label for="password">Password</label>
            <input type="password" id="password" [(ngModel)]="password" name="password" required>
          </div>
        </form>
      <div class="card-action center">
        <a (click)="login()" class="light-green waves-effect waves-light btn"  *ngIf="!authService.isLoggedIn">Se connecter</a>
        <a (click)="logout()" *ngIf="authService.isLoggedIn">Se déconnecter</a>
      </div>
    </div>
    </div>
    </div>
  `
})
export class LoginComponent {
    message: string = 'Vous êtes déconnecté. (username : pikachu | mdp : pikachu)';
    private name: string;
    private password: string;
  
    constructor(private authService: AuthService, private router: Router) { }
  
    // Informe l'utilisateur sur son authentfication.
    setMessage() {
        this.message = this.authService.isLoggedIn ?
            'Vous êtes connecté.' : 'Identifiant ou mot de passe incorrect.';
    }
  
    // Connecte l'utilisateur auprès du Guard
    login() {
        this.message = 'Tentative de connexion en cours ...';
        this.authService.login(this.name, this.password).subscribe(() => {
            this.setMessage();
            if (this.authService.isLoggedIn) {
                // Récupère l'URL de redirection depuis le service d'authentification
                // Si aucune redirection n'a été définis, redirige l'utilisateur vers la liste des pokemons.
                let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/pokemon/all';
                // Redirige l'utilisateur
                this.router.navigate([redirect]);
            } else {
                this.password = '';
            }
        });
    }
  
    // Déconnecte l'utilisateur
    logout() {
        this.authService.logout();
        this.setMessage();
    }
}