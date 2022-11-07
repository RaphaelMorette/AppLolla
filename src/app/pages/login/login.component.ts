import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../shared/style.css'],
})
export class LoginComponent implements OnInit {
  user: string = '';
  password: string = '';
  loginInvalido: string = 'noShow';

  constructor(
    private _router: Router,
    private _authService: AuthenticationService,
    private _userService: UsersService
  ) {}

  ngOnInit(): void {
    if (this._authService.authentication() === true) {
      this._router.navigate(['/home']);
    }
  }

  logIn() {
    if (this.user === '') {
      console.log(this.user);
      window.alert('Usuário em branco!');
    } else if (this.password === '') {
      window.alert('Senha em branco!');
    } else {
      this.autenticar();
    }
  }

  autenticar() {
    this._userService.buscarUsuarios().subscribe((dados) => {
      dados.forEach((item: any) => {
        if (item.nome === this.user && item.senha === this.password) {
          window.localStorage.setItem('user', item.nome);
          if (item.acesso === 'total') {
            window.localStorage.setItem('acesso', item.acesso);
          }
          this._router.navigate(['/home']);
        } else {
          this.loginInvalido = 'show';
          setTimeout(() => {
            this.loginInvalido = 'noShow';
            this.user = '';
            this.password = '';
          }, 1000);
          return;
        }
      });
    });
  }
}
