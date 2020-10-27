import { Component, HostListener, OnInit } from '@angular/core';
import { CGOLService} from './CGOL.service';

@Component({
  selector: 'app-CGOL_controls',
  templateUrl: './CGOL_controls.component.html',
  styleUrls: ['./CGOL_controls.component.css']
})

export class CGOLControlsComponent implements OnInit { 
  
  private intervalId: number; 
  private _isRunning: boolean;

  constructor(private  cGOLService:  CGOLService) {}
 
  get isRunning() {
    return this._isRunning;
  }



  ngOnInit() {
    this.start();
  }

  start() {
    this.intervalId = window.setInterval(() => {
      this.cGOLService.nextGeneration();
    }, 100);
    this._isRunning = true;
  }

  stop() {
    window.clearInterval(this.intervalId);
    this._isRunning = false;
  }

  getGenerationCount() {
    return this.cGOLService.generationCount;
  } 

  reset() {
    this.stop();
    this.cGOLService.reset();
  }
  
  
  getCurrHover(){
    return this.cGOLService.currHover;   
  }

 getMaxCoords():number[]{
   return [this.cGOLService.Cols,this.cGOLService.Rows]
 } 

// rebuild(){

// var nrow =  document.getElementById("newrows").nodeValue;
//  var ncols =  document.getElementById("newcols").nodeValue;
  
//  if (!(nrow=="" )&& !(nrow == " ") &&  !(ncols =="") && !(ncols == " ")){
//  this.cGOLService.setGrid(Number(nrow),Number(ncols))
//  } 
// }

 
  }
 
