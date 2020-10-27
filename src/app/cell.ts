 
export class Cell {
    //Current state, actual
    private currentState = false;
    /* location of cell's new state after nxt generation*/
    private tempState = false;
    private _row: number;
    private _col: number;
  
    /* The dead state will be represented by `false`.
    The live state by `true`.*/
    constructor(row: number, col: number) {
      this._row = row;
      this._col = col;
    }
  
    get row(): number {
      return this._row;
    }
  
    get col(): number {
      return this._col;
    }

    get CellCoords():number[]{ 
      var res =  [this._row,this._col]
      return res;
   }

    setTempState(state: boolean) {
      this.tempState = state;
    }
  
    toggleState() {
      this.tempState = !this.tempState;
      this.updateCurrentState();
    }
  
    updateCurrentState() {
      this.currentState = this.tempState;
    }
  
    isAlive(): boolean {
      return this.currentState;
    }
  
    reset() {
      this.currentState = this.tempState = false;
    }
  } 