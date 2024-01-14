import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Task } from '../models/task.model';
import { RespuestaTareas } from '../models/tareas.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private urlApi = 'http://localhost:3000';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getToken(): string {
    return this.authService.getToken() || 'no hay token';
  }

  createTask(task: Task, token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<RespuestaTareas>(`${this.urlApi}/tasks`, task, {
      headers: headers,
    });
  }

  getUserTasks(token: string): Observable<RespuestaTareas> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const options = { headers: headers };

    return this.http.get<RespuestaTareas>(`${this.urlApi}/tasks`, options);
  }

  getTaskById(taskId: string, token: string): Observable<RespuestaTareas> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const options = { headers: headers };

    return this.http.get<RespuestaTareas>(
      `${this.urlApi}/tasks/${taskId}`,
      options
    );
  }

  deleteTask(taskId: string, token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const options = { headers: headers };

    return this.http.delete<RespuestaTareas>(
      `${this.urlApi}/tasks/${taskId}`,
      options
    );
  }

  updateTask(taskId: string, task: Task, token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const options = { headers: headers };

    return this.http.put<RespuestaTareas>(
      `${this.urlApi}/tasks/${taskId}`,
      task,
      options
    );
  }

  completeTask(taskId: string, token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const options = { headers: headers };

    return this.http.put<RespuestaTareas>(
      `${this.urlApi}/tasks/${taskId}/status`,
      null,
      options
    );
  }
}
