import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  users: Usuario[] = [];
  formRegister: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formRegister = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      user: ['', Validators.required],
      email: ['', Validators.required],
      svpassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  register() {
    if (this.formRegister.valid) {
      this.authService.registerUser(this.formRegister.value).subscribe({
        next: (v) => {
          this.formRegister.reset();
          alert('Usuario registrado con exito');
          this.navigateToLogin();
        },
        error: (e) => {
          alert(e.error.mensaje);
        },
      });
    } else {
      alert('Rellena todos los campos.');
    }
  }

  navigateToLogin() {
    this.router.navigate(['']);
  }
}
