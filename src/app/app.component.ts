import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { SchoolData, SchoolService } from './services/school.service';
import { Observable, Subject, takeUntil, zip } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    TodoCardComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  private destroy$ = new Subject<void>();
  public title = 'todo-list-16';
  public students: Array<SchoolData> = [];
  public teachers: Array<SchoolData> = [];
  // zip é um operador que combina vários observables em um único observable
  public zipSchoolResponse$= zip(
    this.getStudentData(),
    this.getTeacherData()
  );
  //$ representa um observable

  constructor(
      //chamar os nossos metodos de serviço
    private schoolService: SchoolService
  ){}


  ngOnInit(): void {
    this.getSchoolData();
  }

  // os operadores of e zip são usados para simular uma chamada assíncrona
  // esperando vários observables serem resolvidos, para então retornar o resultado

  public getSchoolData(): void {
    this.zipSchoolResponse$.
    pipe(takeUntil(this.destroy$)).
    subscribe({
      next: (response ) =>{
        console.log("STUDENTS", response[0]);
        console.log("TEACHERS", response[1]);
      }
    });
  }

  private getStudentData(): Observable<Array<SchoolData>> {
    return this.schoolService.getStudents();
  }

  private getTeacherData(): Observable<Array<SchoolData>> {
    return this.schoolService.getTeachers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
