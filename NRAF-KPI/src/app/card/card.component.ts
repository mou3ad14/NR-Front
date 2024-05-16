  import { OnInit } from '@angular/core';
  import { CdkDragDrop,moveItemInArray ,transferArrayItem} from '@angular/cdk/drag-drop';
  import { Data } from '@angular/router';
  import { DataService } from '../data.service';
  import { HttpClient } from '@angular/common/http';
  import { BreakpointObserver } from '@angular/cdk/layout';
  import { MatSidenav } from '@angular/material/sidenav';

  import {
    Component,
    ViewChild,
  } from '@angular/core';
  @Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
  })
  export class CardComponent implements OnInit {
    data: Data = {};

    title = 'material-responsive-sidenav';
    isCollapsed = true;


  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;

    constructor(private http: HttpClient,private observer: BreakpointObserver) { }

    ngOnInit(): void {
      this.getDataById(1);
      this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
        if(screenSize.matches){
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
      });
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

    toggleMenu() {
      if(this.isMobile){
        this.sidenav.toggle();
        this.isCollapsed = false; // On mobile, the menu can never be collapsed
      } else {
        this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
        this.isCollapsed = !this.isCollapsed;
      }
    }

    
  
  }
