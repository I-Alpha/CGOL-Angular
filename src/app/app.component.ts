import { TreeError } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CGOLService } from './CGOL.service';
 


@Component({
  selector: 'app-root',
  templateUrl: "./app.component.html",
  styleUrls: ['./app.component.css']
})
 

  export class AppComponent implements OnInit {  
    title = 'CGOL';
    rows = 45;
    cols = 80;
  
    constructor(private cGOLService: CGOLService) {}
   
    ngOnInit() {
      this.cGOLService.initialize(this.rows, this.cols);
      this.cGOLService.randomizeCellStates();  
    }  
}

 