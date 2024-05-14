  import { Component, OnInit } from '@angular/core';
  import { CdkDragDrop,moveItemInArray ,transferArrayItem} from '@angular/cdk/drag-drop';
  import { Data } from '@angular/router';
  import { DataService } from '../data.service';
  import { HttpClient } from '@angular/common/http';

  @Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
  })
  export class CardComponent implements OnInit {
    data: Data = {};


    constructor(private http: HttpClient) { }

    ngOnInit(): void {
      this.getDataById(1);
    }
    getDataById(id: number): void {
      this.http.get<Data>('http://localhost:8080/data/getById?id=' + id)
        .subscribe(
          (response: Data) => {
            this.data = response;
          },
          error => {
            console.error('Error fetching data:', error);
          }
        );
    }

  
    
  
  }
