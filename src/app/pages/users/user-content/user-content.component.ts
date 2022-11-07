import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.css', '../../shared/style.css'],
})
export class UserContentComponent implements OnInit {
  constructor(
    private _router: Router,
    private _authService: AuthenticationService,
    private _userService: UsersService
  ) {}

  ngOnInit(): void {
    if (!this._authService.authentication() === true) {
      this._router.navigate(['/home']);
    }
    if (!window.localStorage.getItem('acesso')) {
      this._router.navigate(['/home']);
    }
    this.listar();
  }

  listaUsuarios: any[] = [];

  listar() {
    this._userService.buscarUsuarios().subscribe((data: any) => {
      this.listaUsuarios = data;
    });
  }

  criarUsuario() {
    this._router.navigate(['/user-cadastro']);
  }

  editarUsuario(id: number) {
    this._router.navigate(['/user-edicao', id]);
  }

  deletar(id: number) {
    this._userService.delete(id).subscribe((data: any) => {
      this.listar();
    });
  }
}
