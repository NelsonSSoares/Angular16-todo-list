import { Observable, of } from 'rxjs';
import { Injectable } from "@angular/core";
import { TodoSignalsService } from "./todo-signals.service";
import { Todo } from '../models/model/todo.model';

@Injectable({
  providedIn: 'root'
 })
export class ExampleTestService {

  public testNameList: Array<{id: number, name: string}> = [
    {
      id: 1,
      name: "Test 1"
    },
    {
      id: 2,
      name: "Test 2"
    },
    {
      id: 3,
      name: "Test 3"
    }
  ];

  constructor(
    private signalService: TodoSignalsService
  ) {}

  public getTestNamesList(): Observable<Array<{id: number, name: string}>> {
    return of(this.testNameList);
  }

  public handleCreateTodo(todo: Todo): Observable<Array<Todo>>{
    if(todo){
      this.signalService.updateTodos(todo);

    }
    return of(this.signalService.todoState());
  }


}
