import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

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


  constructor() { }

  ngOnInit(): void {
  }

  handleOpenModal():void {
    alert('Open modal');
  }

}
