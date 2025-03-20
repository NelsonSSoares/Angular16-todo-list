import { TestBed } from '@angular/core/testing';
import { TodoSignalsService } from '../todo-signals.service';
import { Todo } from '../../models/model/todo.model';
import { ExampleTestService } from '../example-test.service';

describe('ExampleTestService', () => {
  let service: ExampleTestService;
  let todoSignalsService: TodoSignalsService;

  beforeEach(() => {
    service = TestBed.inject(ExampleTestService);
    todoSignalsService = TestBed.inject(TodoSignalsService);
  });

  it("should return correct list", () =>{
    service.getTestNamesList()
    .subscribe({
      next: (value) => {
        expect(value).toEqual([
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
        ]);
      }
    });
  })

  it("should return correct todo list", () =>{
    const newTodo: Todo ={
      id: 1,
      title: 'Test 1',
      description: 'Testing',
      done: false
    }
    jest.spyOn(todoSignalsService, 'updateTodos');
    service.handleCreateTodo(newTodo)
    .subscribe({
      next: (todoList) => {
        expect(todoList).toEqual([newTodo]);
        expect(todoSignalsService.updateTodos).toHaveBeenCalledWith(newTodo);
      }
    });

  })
});
