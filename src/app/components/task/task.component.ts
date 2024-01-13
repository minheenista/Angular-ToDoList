import { Component, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/models/task.model';
import { AuthService } from 'src/app/services/auth.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task!: Task;
  taskId!: string;
  token: string = '';
  tareas: any;
  formUpdateTask: FormGroup;
  tarea: any;
  errorUpdateTask: string = '';

  constructor(
    private elRef: ElementRef,
    private fb: FormBuilder,
    private taskService: TasksService,
    private authService: AuthService
  ) {
    this.formUpdateTask = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  abrirModalEditar(taskId: string) {
    const openModalBtn = this.elRef.nativeElement.querySelector(
      '#openModalEditarBtn'
    );
    const modal = this.elRef.nativeElement.querySelector('#modalEditarTarea');

    modal.style.display = 'block';
    this.setToken();
    this.taskService.getTaskById(taskId, this.token).subscribe({
      next: (v) => {
        this.tarea = v.data;
      },
      error: (e) => {
        alert(e.error.mensaje);
      },
    });
    this.formUpdateTask.setValue({
      title: this.task.title,
      description: this.task.description,
    });
  }

  cerrarModalEditar(event?: Event) {
    event?.preventDefault();

    const modal = this.elRef.nativeElement.querySelector('#modalEditarTarea');
    modal.style.display = 'none';
    this.formUpdateTask.reset();
    this.errorUpdateTask = '';
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

  eliminarTarea(taskId: string) {
    this.setToken();
    this.taskService.deleteTask(taskId, this.token).subscribe({
      next: (v) => {
        alert('Tarea eliminada con exito');
        window.location.reload();
      },
      error: (e) => {
        alert(e.error.mensaje);
      },
    });
    this.cerrarModalEliminar();
  }

  updateTask(taskId: string) {
    if (this.formUpdateTask.valid) {
      this.setToken();
      this.taskService
        .updateTask(taskId, this.formUpdateTask.value, this.token)
        .subscribe({
          next: (v) => {
            this.formUpdateTask.reset();
            this.cerrarModalEditar();
            alert('Tarea actualizada con exito');
            window.location.reload();
            this.errorUpdateTask = '';
          },
          error: (e) => {
            //alert(e.error.mensaje);
            this.errorUpdateTask = e.error.mensaje;
          },
        });
    } else {
      this.errorUpdateTask = 'Rellena todos los campos';
      //alert('Rellena todos los campos');
    }
  }

  async completeTask(taskId: string) {
    await this.setToken();
    this.taskService.completeTask(taskId, this.token).subscribe({
      next: (v) => {
        alert('Tarea completada con exito');
        window.location.reload();
      },
      error: (e) => {
        alert(e.error.mensaje);
      },
    });
  }
}
