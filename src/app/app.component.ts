import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { SchoolData, SchoolService } from './services/school.service';
import { filter, from, map, Observable, of, Subject, switchMap, takeUntil, zip } from 'rxjs';

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
export class AppComponent implements OnInit, OnDestroy {

  @Input() projectName!: string;
  @Output() outputEvent = new EventEmitter<string>();


  private destroy$ = new Subject<void>();
  public title = 'todo-list-16';
  public students: Array<SchoolData> = [];
  public teachers: Array<SchoolData> = [];
  // zip é um operador que combina vários observables em um único observable
  //$ representa um observable
  public zipSchoolResponse$ = zip(
    this.getStudentData(),
    this.getTeacherData()
  );

  private ages = of(20, 30, 40, 50, 60, 70);
  private peopleDatas = from([{
    name: "João",
    age: 20,
    profession: "Developer"
  }, {
    name: "Maria",
    age: 30,
    profession: "Designer"
  }, {
    name: "José",
    age: 40,
    profession: "Manager"
  },
  {
    name: "Pedro",
    age: 50,
    profession: "Developer"
  },
  {
    name: "Ana",
    age: 60,
    profession: "QA"
  },
  {
    name: "Carlos",
    age: 70,
    profession: "CEO"
  }
  ]);

  private studentUserId = "2"

  constructor(
    //chamar os nossos metodos de serviço
    private schoolService: SchoolService
  ) { }


  ngOnInit(): void {
    //this.getSchoolData();
    //this.getMultipleAges();
    //this.getPeopleProfessions();
    //this.getSoftwareDevelopersNames()
  }
  public handleFindStudentById(): void {
    this.getStudentData()
      .pipe(
        //switchMap é um operador que permite trocar um observable por outro
        //no caso, trocamos o observable de estudantes por um observable de estudantes filtrados
        //pelo id do estudante
        switchMap((students) => this.findStudentsById(students, this.studentUserId))
      ).subscribe({
        next: (response) => {
          console.log("STUDENT", response);
        }
      }
      )
  }

  public findStudentsById(students: Array<SchoolData>, userId: string) {
    return of([students.find((student) => student.id === userId)]);
  }

  public getPeopleProfessions(): void {
    this.peopleDatas.pipe(
      map((peopleData) => peopleData.profession)
    ).subscribe({
      next: (response) => console.log("PROFISSÃO: " + response)
    });
  }

  public getMultipleAges(): void {
    this.ages.pipe(
      map((age) => {
        return age * age;
      })
    ).subscribe({
      next: (age) => {
        console.log("IDADE MULTIPLACADA: " + age);
      }
    });
  }

  getSoftwareDevelopersNames(): void {
    this.peopleDatas.pipe(
      filter((people) => people.profession === "Developer"),
      map((people) => people.name)
    ).subscribe({
      next: (response) => console.log("DEVELOPERS NAME: " + response)
    });
  }

  // os operadores of e zip são usados para simular uma chamada assíncrona
  // esperando vários observables serem resolvidos, para então retornar o resultado
  public getSchoolData(): void {
    this.zipSchoolResponse$.
      pipe(takeUntil(this.destroy$)).
      subscribe({
        next: (response) => {
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

  public handleEmitEvent(): void {
    this.outputEvent.emit(this.projectName);
  }
}
