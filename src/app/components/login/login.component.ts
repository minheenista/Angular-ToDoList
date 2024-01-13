import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  correo: string = '';
  clave: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.correo || !this.clave) {
      alert('Error: Ingresa todos los campos.');
      return;
    }

    this.authService.login(this.correo, this.clave).subscribe(
      (response) => {
        if (response.estado === 1) {
          this.authService.setToken(response.token);
          this.router.navigate(['/home']);
          alert('inicion sesiada.');
        } else {
          console.error('Error: correo o contraseña incorrectos');
          alert('Error: correo o contraseña incorrectos');
        }
      },
      (error) => {
        alert(error.error.mensaje);
      },
      () => {
        if (this.authService.getToken() === null) {
          this.router.navigate(['/']);
        }
      }
    );
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
