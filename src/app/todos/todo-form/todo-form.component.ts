import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TodosService } from '../shared/todos.service';
import { MessageBusService } from '../shared/message-bus.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  todoForm = this.fb.group({
    action: ['', Validators.required],
    dueDate: [''],
    done: ['']
  });

  constructor(
    private fb: FormBuilder,
    private todosService: TodosService,
    private messageBus: MessageBusService
  ) {}

  ngOnInit() {
    this.todoForm.valueChanges.subscribe(data => console.log(data));
  }

  onSubmitTodo() {
    const todo = this.todoForm.value;
    todo.dueDate = new Date(todo.dueDate).getTime();
    this.todosService.add(todo).subscribe( _ => this.messageBus.addMessage('TODO_ADDED'));
  }
}
