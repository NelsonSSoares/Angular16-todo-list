import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TodoFormComponent } from '../todo-form/todo-form.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {

  private dialogService = inject(MatDialog);

  constructor(
  ) { }

  ngOnInit(): void {
  }

  handleOpenModal():void {
    this.dialogService.open(TodoFormComponent,{
      width: '50vw',
      height: '80vh'
    });
  }

}
