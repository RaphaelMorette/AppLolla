import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  urlUsuarios: string = 'http://localhost:3000/usuarios';

  constructor(private _http: HttpClient) {}

  buscarUsuarios(): Observable<any> {
    return this._http.get<any>(this.urlUsuarios)
  }

  buscarUmUsuario(id: number): Observable<any> {
    return this._http.get<any>(this.urlUsuarios + '/' + id)
  }

  cadastro(dados: any): Observable<any> {
    return this._http.post<any>(this.urlUsuarios, dados)
  }

  edicao(dados: any): Observable<any> {
    return this._http.put<any>(this.urlUsuarios + '/' + dados.id, dados)
  }

  delete(id: number): Observable<any> {
    return this._http.delete(this.urlUsuarios + '/' + id)
  }
}
