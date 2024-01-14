import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  correo: string = '';
  clave: string = '';
  formLogin: FormGroup;
  errorLogin: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.formLogin.valid) {
      this.authService.login(this.formLogin.value).subscribe(
        (response) => {
          if (response.estado === 1) {
            this.authService.setToken(response.token);
            this.router.navigate(['/home']);
            this.errorLogin = '';
          } else {
            console.error('Error: correo o contraseña incorrectos');
            this.errorLogin = 'Error: correo o contraseña incorrectos';
          }
        },
        (error) => {
          this.errorLogin = error.error.mensaje;
        },
        () => {
          if (this.authService.getToken() === null) {
            this.router.navigate(['/']);
          }
        }
      );
    } else {
      this.errorLogin = 'Rellena todos los campos.';
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
