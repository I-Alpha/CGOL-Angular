import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

import { Cell } from './cell';
import { CGOLService } from './CGOL.service';

@Component({
  selector: 'app-CGOL_grid',
  templateUrl: './CGOL_grid.component.html',
  styleUrls: ['./CGOL_grid.component.css']
})

export class CGOLGridComponent implements OnInit {
  @Input() rows: number;
  @Input() cols: number; 

  grid: Cell[][];
  // subscription: Subscription;
 
  
  // ngOnDestroy() {
  //     // unsubscribe to ensure no memory leaks
  //     this.subscription.unsubscribe();
  // }
  constructor(private cGOL_Service: CGOLService) {   
          // this.subscription = this.cGOL_Service.getGrid().subscribe(data => { 
          // this.Grid = data;})
        
        }

  ngOnInit() {
    this.grid = this.cGOL_Service.getGrid();
  }

  toggleState(cell: Cell) {
    cell.toggleState();
  }

  currHover(cell: Cell){
   this.cGOL_Service.currHover= [cell.row,cell.col];
  }

   set Grid(_grid:Cell[][]){ 
     this.grid = this.cGOL_Service.getGrid();
   }

   
}