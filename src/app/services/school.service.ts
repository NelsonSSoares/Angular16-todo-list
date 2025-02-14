import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface SchoolData {
  name: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  private students: Array<SchoolData> = [{
    name: 'Nelson',
    id: '1'
  }, {
    name: 'Yara',
    id: '2'
  }, {
    name: 'Noeme',
    id: '3'
  }, {
    name: 'Pingo',
    id: '4'
  }];

  private teachers: Array<SchoolData> = [{
    name: 'Juarez',
    id: '1'
  }, {
    name: 'Marcia',
    id: '2'
  }, {
    name: 'Custodio',
    id: '3'
  }, {
    name: 'Nadir',
    id: '4'
  }];

  constructor() { }

  public getStudents(): Observable<Array<SchoolData>> {
    return of(this.students);
  }

  public getTeachers(): Observable<Array<SchoolData>> {
    return of(this.teachers);
  }

}
