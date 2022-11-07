import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isTotal: boolean = false;
  isLogged: boolean = false;

  constructor(
    private _router: Router,
    private _authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    if (window.localStorage.getItem('acesso')) {
      this.isTotal = true;
    }

    if (!this._authService.authentication() === true) {
      this.isLogged = false;
    } else {
      this.isLogged = true;
    }
  }

  logout() {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('acesso');
    this._router.navigate(['/home']);
    window.location.reload();
  }
}
