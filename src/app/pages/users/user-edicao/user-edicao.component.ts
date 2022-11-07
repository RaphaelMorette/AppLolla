import { UsersService } from 'src/app/services/users.service';
import { AuthenticationService } from './../../../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-edicao',
  templateUrl: './user-edicao.component.html',
  styleUrls: ['./user-edicao.component.css', '../../shared/style.css'],
})
export class UserEdicaoComponent implements OnInit {
  isTotal: boolean = false;
  cepNaoEncontrado: boolean = false;
  mostraEndereco: string = 'noShow';

  public maskCep = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public maskRg = [
    /[0-9]/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
  ];
  public maskTel = [
    '(',
    /[0-9]/,
    /\d/,
    ')',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];

  formUsuarios = new FormGroup({
    id: new FormControl(''),
    nome: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required, Validators.minLength(5)]),
    telefone: new FormControl('', [
      Validators.required,
      Validators.minLength(14),
      Validators.maxLength(14),
    ]),
    dtaNascimento: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    rg: new FormControl('', [
      Validators.required,
      Validators.maxLength(12),
      Validators.minLength(12),
    ]),
    cep: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(9),
    ]),
    logradouro: new FormControl('', [Validators.required]),
    bairro: new FormControl('', [Validators.required]),
    cidade: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
    acesso: new FormControl('', [Validators.required]),
  });

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _http: HttpClient,
    private _authService: AuthenticationService,
    private _userService: UsersService
  ) {}

  ngOnInit(): void {
    if (!this._authService.authentication() === true) {
      this._router.navigate(['/home']);
    }

    if (window.localStorage.getItem('acesso')) {
      this.isTotal = true;
    } else {
      // this.formUsuario.acesso = 'restrito';
    }

    this.buscarUsuario(Number(this._route.snapshot.paramMap.get('id')));
  }

  buscarUsuario(id: number) {
    this._userService.buscarUmUsuario(id).subscribe((data: any) => {
      this.formUsuarios.controls.id.setValue(data['id']);
      this.formUsuarios.controls.nome.setValue(data['nome']);
      this.formUsuarios.controls.senha.setValue(data['senha']);
      this.formUsuarios.controls.telefone.setValue(data['telefone']);
      this.formUsuarios.controls.dtaNascimento.setValue(data['dtaNascimento']);
      this.formUsuarios.controls.email.setValue(data['email']);
      this.formUsuarios.controls.rg.setValue(data['rg']);
      this.formUsuarios.controls.cep.setValue(data['cep']);
      this.formUsuarios.controls.logradouro.setValue(data['logradouro']);
      this.formUsuarios.controls.bairro.setValue(data['bairro']);
      this.formUsuarios.controls.cidade.setValue(data['cidade']);
      this.formUsuarios.controls.estado.setValue(data['estado']);
      this.formUsuarios.controls.acesso.setValue(data['acesso']);
    });
  }

  editar() {
    this._userService.edicao(this.formUsuarios.value).subscribe((data: any) => {
      this._router.navigate(['/user']);
    });
  }

  buscarCep(event: any) {
    const cep = event.target.value;
    this._http
      .get('https://viacep.com.br/ws/' + cep + '/json/')
      .subscribe((dataCep: any) => {
        if (dataCep.erro) {
          this.mostraEndereco = 'noShow';
          this.cepNaoEncontrado = true;
          setTimeout(() => {
            this.cepNaoEncontrado = false;
            this.formUsuarios.controls.cep.setValue('');
          }, 3000);
          return;
        }
        this.mostraEndereco = 'show';
        this.formUsuarios.controls.logradouro.setValue(dataCep['logradouro']);
        this.formUsuarios.controls.bairro.setValue(dataCep['bairro']);
        this.formUsuarios.controls.cidade.setValue(dataCep['localidade']);
        this.formUsuarios.controls.estado.setValue(dataCep['uf']);
      });
  }
}
