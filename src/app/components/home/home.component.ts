import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/models/task.model';
import { Usuario } from 'src/app/models/usuario';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService],
})
export class HomeComponent implements OnInit {
  formAddTask: FormGroup;
  tasks: Task[] = [];
  token: string = '';
  tareas: any;
  tareasPendientes: any;
  errorAddTask: string = '';

  constructor(
    private fb: FormBuilder,
    private elRef: ElementRef,
    private router: Router,
    private taskService: TasksService,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.formAddTask = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.setToken();
    this.getUserTasks();
    if (this.token === '') {
      this.router.navigate(['']);
    }
    this.getPendingTasks();
  }

  setToken() {
    this.token = this.authService.getToken() || '';
  }

  addTask() {
    if (this.formAddTask.valid) {
      this.taskService
        .createTask(this.formAddTask.value, this.token)
        .subscribe({
          next: (v) => {
            this.formAddTask.reset();
            this.cerrarModal(event);
            this.errorAddTask = '';
            this.showSuccess(v.mensaje);
            this.getPendingTasks();
          },
          error: (e) => {
            console.log('Error al registrar tarea', e);
            this.errorAddTask = e.error.mensaje;
            this.showError(e.error.mensaje);
          },
        });
    } else {
      this.errorAddTask = 'Rellena todos los campos';
    }
  }

  showSuccess(mensaje: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: mensaje,
    });
  }

  showError(e: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: e,
    });
  }

  getUserTasks() {
    this.taskService.getUserTasks(this.token).subscribe({
      next: (v) => {
        this.tareas = v.data[0];
        if (v && v.data[0]) {
          this.tareas = v.data[0];
        } else {
          console.error('No hay tareas registradas');
        }
      },
      error: (e) => {
        console.error('Error:', e);
        this.showError(e.error.mensaje);
      },
    });
  }

  getPendingTasks() {
    this.taskService.getUserTasks(this.token).subscribe({
      next: (v) => {
        if (v && v.data[0]) {
          this.tareas = v.data[0];
          // Filtrar solo las tareas pendientes
          this.tareasPendientes = this.tareas.filter(
            (tarea: Task) => !tarea.status
          );
        } else {
          console.error('No hay tareas registradas');
        }
      },
      error: (e) => {
        console.error('Error:', e);
        this.showError(e.error.mensaje);
      },
    });
  }

  /* MODALS */
  abrirModal() {
    const openModalBtn = this.elRef.nativeElement.querySelector('.button');
    const modal = this.elRef.nativeElement.querySelector('#modalCrearTarea');

    modal.style.display = 'block';
  }

  cerrarModal(event?: Event) {
    event?.preventDefault();

    const modal = this.elRef.nativeElement.querySelector('#modalCrearTarea');
    modal.style.display = 'none';
    this.errorAddTask = '';
    this.formAddTask.reset();
  }

  /* RUTAS */

  navigateToCompleted() {
    this.router.navigate(['/completed']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  salir() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
