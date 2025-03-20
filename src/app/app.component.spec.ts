import { TodoSignalsService } from './services/todo-signals.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { first } from 'rxjs';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Todo } from './models/model/todo.model';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let todoSignalsService: TodoSignalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent, BrowserAnimationsModule, NoopAnimationsModule],
      providers: [TodoSignalsService]
    })
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    todoSignalsService = TestBed.inject(TodoSignalsService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Teste de @Input
  it('should set @Input() property correctly', () => {
    component.projectName = "Testing Angular with Jest";
    // verifica se houve alteração no template
    fixture.detectChanges();

    expect(component.projectName).toEqual("Testing Angular with Jest");
  });

  // Teste de @Output e @Input
  it("should emit event with @Output decarator correctly", () => {

    component.projectName = "Testing my Angular Application";

    component.outputEvent
      .pipe(
        first()
      ).subscribe({
        next: (value) => {
          expect(value).toEqual("Testing my Angular Application");
          component.handleEmitEvent();
        }
      })
  });

  // Teste de acionamento de serviço e signal
  it("should create new Todo correctly and call service method", () => {
    const spy = jest.spyOn(todoSignalsService, "updateTodos");
    const newTodo: Todo = {
      id: 1,
      title: "Testing Angular with Jest",
      description: "Testing Angular with Jest",
      done: false
    };
    component.handleCreateTodo(newTodo);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(newTodo);
    expect(component.todoSignal()).toEqual([newTodo]);
  });

  //Teste de elementos do DOM
  it("should not render paragraph in the DOM", () => {
    const componentDebugElement: DebugElement = fixture.debugElement;
    const element: HTMLElement = componentDebugElement.nativeElement;
    const paragraph = element.querySelector("p");
    expect(paragraph).toBeNull();
  });

  it("should render paragraph in the DOM", () => {
    component.renderTestMessage = true;
    fixture.detectChanges();
    const componentDebugElement: DebugElement = fixture.debugElement;
    const paragraphDebugElement = componentDebugElement.query(By.css("p"));
    const paragraph: HTMLElement = paragraphDebugElement.nativeElement;
    expect(paragraph.textContent).toEqual("Testing your Angular Application");
  })

});
