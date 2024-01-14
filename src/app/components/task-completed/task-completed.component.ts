import { Component, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/models/task.model';
import { AuthService } from 'src/app/services/auth.service';
import { TasksService } from 'src/app/services/tasks.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-task-completed',
  templateUrl: './task-completed.component.html',
  styleUrls: ['./task-completed.component.css'],
  providers: [MessageService],
})
export class TaskCompletedComponent {
  @Input() task!: Task;
  taskId!: string;
  token: string = '';
  tareas: any;
  formUpdateTask: FormGroup;
  tarea: any;

  constructor(
    private elRef: ElementRef,
    private fb: FormBuilder,
    private taskService: TasksService,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.formUpdateTask = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  abrirModalEliminar(taskId: string) {
    const openModalBtn = this.elRef.nativeElement.querySelector(
      '#openModalEliminarBtn'
    );
    const modal = this.elRef.nativeElement.querySelector('#modalEliminarTarea');

    modal.style.display = 'block';
  }

  cerrarModalEliminar() {
    const modal = this.elRef.nativeElement.querySelector('#modalEliminarTarea');
    modal.style.display = 'none';
  }

  async setToken() {
    this.token = this.authService.getToken() || '';
  }

  async showSuccess(mensaje: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: mensaje,
      life: 3000,
    });
  }

  async showError(e: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: e,
      life: 3000,
    });
  }

  eliminarTarea(taskId: string) {
    this.setToken();
    this.taskService.deleteTask(taskId, this.token).subscribe({
      next: async (v) => {
        await this.showSuccess(v.mensaje);
        window.location.reload();
      },
      error: (e) => {
        this.showError(e.error.mensaje);
      },
    });
    this.cerrarModalEliminar();
  }

  async completeTask(taskId: string) {
    await this.setToken();
    this.taskService.completeTask(taskId, this.token).subscribe({
      next: async (v) => {
        await this.showSuccess(v.mensaje);
        window.location.reload();
      },
      error: (e) => {
        this.showError(e.error.mensaje);
      },
    });
  }
}
