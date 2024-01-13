import { Task } from 'src/app/models/task.model';
export interface RespuestaTareas {
  estado: number;
  mensaje: string;
  data: Task[];
}

export { Task };
