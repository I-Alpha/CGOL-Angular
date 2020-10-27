import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
import { Cell } from './cell';

/**
 * Conway's Game of Life simulation.
 */
@Injectable()
export class CGOLService {
   _currHover=[0,0]

  private cells: Cell[];
  private rows: number;
  private cols: number;
  private _generationCount = 0;
 
  get Rows(): number{ 
    return this.rows;
  };
 
  get Cols():number{
    return this.cols; 
  }

  
 set Rows(number){
     this.rows = number;
  };
 
  set Cols(number){
    this.cols = number; 
  }
  get generationCount(): number {
    return this._generationCount;
  }
  
   get currHover(): number[] {
    return this._currHover;
  }

  set currHover(cell){
    this._currHover = [cell[0],cell[1]]
  }
  /**
   * Initializes the grid with dead cells. This should be called prior to
   * calling any other function.
   * @param rows The number of rows. Defaults to 10.
   * @param cols The number of columns. Defaults to 10.
   */

  initialize(rows = 10, cols = 10) {
    const minDimension = 5;
    if (rows < minDimension || cols < minDimension) {
      throw Error(`Width and height must be at least ${minDimension}.`);
    }

    this.rows = rows;
    this.cols = cols;
    this._generationCount = 0;
    this.cells = Array.from({
      length: rows * cols
    }).map((_, i, a) => new Cell(Math.floor(i / this.cols), i % this.cols));
  }



  randomizeCellStates(percentAlive = .314159265359) {
    if (!this.cells) {
      throw Error('Grid has not yet been initialized.');
    }

    if (percentAlive < 0 || 1 < percentAlive) {
      throw Error(`percentAlive must be a number between 0 and 1, inclusive. Value: ${percentAlive}`);
    }

    this.reset();
    this.cells.forEach(cell => {
      if (Math.random() < percentAlive) {
        cell.toggleState();
      }
    });
    // no need to update the previous states because we're starting from scratch anyway
}
 
  getGrid(): Cell[][] {
    if (!this.cells) {
      throw Error('Grid has not yet been initialized.');
    }

    const grid = [];
    for (let i = 0; i < this.rows; i++) {
      grid.push(this.cells.slice(i * this.cols, (i + 1) * this.cols));
    }
    return grid;
  } 

  setGrid(row,col){

    this.Rows = row
    this.Cols = col
    
  }
   /**
   * Kills all cells and reverts the generation counter to 0.
   */
  reset() {
    if (!this.cells) {
      throw Error('Grid has not yet been initialized.');
    }

    this.cells.forEach(cell => cell.reset());
    this._generationCount = 0;
  }

  /**
   * Advances the simulation to the next generation.
   */
  nextGeneration() {
    if (!this.cells) {
      throw Error('Grid has not yet been initialized.');
    }

    const alive = true;  

    this.cells.forEach(cell => {
      const liveNeighborCount = this.getNeighborsOfCell(cell)
        .filter(c => c.isAlive())
        .length;

      switch (liveNeighborCount) {
        case 2: // cell retains status; do nothing
          break;
        case 3: // dead cell comes to life; live cells remain alive anyway
          cell.setTempState(alive);
          break;
        default:  // live cell dies; dead cells remain dead
          cell.setTempState(!alive);
      }
    });
    this._generationCount++;
    this.updateCellStates();
  }

  /**
   * Updates all of the cell states with their new states. This should be called
   * after the new states have been computed.
   */
  private updateCellStates() {
    this.cells.forEach(cell => cell.updateCurrentState());
  }

  /**
   * Gets all the cells that are adjacent to the input cell.
   * @param cell The cell whose neighbors we are interested with.
   */
  private getNeighborsOfCell(cell: Cell): Cell[] {
    if (this.isOutOfBounds(cell)) {
      throw Error('Cell coordinates are out of bounds.');
    }

    const { row, col } = cell;
    const possibleNeighborCoords = [
      { row: row - 1, col: col + 1 },
      { row: row, col: col + 1 },
      { row: row + 1, col: col + 1 }, 
      { row: row - 1, col: col }, 
      { row: row + 1, col: col },
      { row: row + 1, col: col - 1 },
      { row: row, col: col - 1 },
      { row: row - 1, col: col - 1}
    ].filter(offset => !this.isOutOfBounds(offset)); //filter cells if they're out of bounds of the grid 

    return possibleNeighborCoords.map(coords => this.getCellAt(coords)); // mapped cells to coord objects and return the ones that match criteria
  }

  /**
   * Gets the cell with the specified row and column numbers.
   * @param row The cell's row number.
   * @param col The cell's column number.
   */
  private getCellAt({row = 0, col = 0} = {}): Cell {
    if (this.isOutOfBounds({row, col})) {
      throw Error(`Cell coordinates are out of bounds. Bounds: ${this.rows} rows, ${this.cols} cols. Value: ${{row, col}}`);
    }

    return this.cells[row * this.cols + col];
  } 

  /**
   * Returns true if the supplied coords are outside the bounds of the grid.
   * @param param0 The coordinates we want to check.
   */
  private isOutOfBounds({row, col}): boolean {
    return this.isRowOutOfBounds(row) || this.isColOutOfBounds(col);
  }

  private isRowOutOfBounds(row) {
    return row < 0 || this.rows <= row;
  }

  private isColOutOfBounds(col) {
    return col < 0 || this.cols <= col;
  }
 


}