import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-cadastro',
  templateUrl: './user-cadastro.component.html',
  styleUrls: ['./user-cadastro.component.css', '../../shared/style.css'],
})
export class UserCadastroComponent implements OnInit {
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

  // formTeste = new FormGroup()
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
    private _http: HttpClient,
    private _userService: UsersService
  ) {}

  ngOnInit(): void {
    if (window.localStorage.getItem('acesso')) {
      this.isTotal = true;
    } else {
      this.formUsuarios.controls.acesso.setValue('restrito');
    }
  }

  cadastrar() {
    this._userService
      .cadastro(this.formUsuarios.value)
      .subscribe((data: any) => {
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
