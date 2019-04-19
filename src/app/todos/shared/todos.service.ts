import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './todo';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(environment.url_todos);
  }

  delete(todo: Todo): Observable<any> {
    const urlDelete = `${environment.url_todos}${todo.id}`;
    return this.http.delete<any>(urlDelete);
  }

  add(todo: Todo): Observable<any> {
    return this.http.post<Todo>(environment.url_todos, todo, httpOptions);
  }

  update(todo: Todo): Observable<any> {
    return this.http.put<Todo>(environment.url_todos, todo, httpOptions);
  }
}
