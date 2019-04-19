import { Component, OnInit } from '@angular/core';
import { TodosService } from '../shared/todos.service';
import { Todo } from '../shared/todo';
import { Observable } from 'rxjs';
import { switchMap, filter, merge } from 'rxjs/operators';
import { MessageBusService } from '../shared/message-bus.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[] | string>;

  cols: any[];

  constructor(
    private todo: TodosService,
    private messageBus: MessageBusService
  ) {}

  ngOnInit() {
    const obs1 = this.messageBus.queue$.pipe(
      filter(msg => msg === 'TODO_ADDED'),
      switchMap(_ => this.todo.findAll())
    );
    const obs2 = this.todo.findAll();

    this.todos$ = obs1.pipe(merge(obs2));

    // this.messageBus.queue$.subscribe(message => {
    //   console.log('TodoListComponent ' + message);
    //   this.todos$ = this.todo.findAll();
    // });

    // this.todos$ = this.todo.findAll();

    this.cols = [
      { field: 'action', header: 'Action' },
      { field: 'dueDate', header: 'dueDate' },
      { field: 'done', header: 'Done?' }
    ];
  }

  doDelete(todo: Todo) {
    this.todos$ = this.todo
      .delete(todo)
      .pipe(switchMap(_ => this.todo.findAll()));
  }

  setDone(todo: Todo) {
    this.todo.update(todo).subscribe();
  }
}
