
import { useState } from 'react'
import './App.css'
const initial=[
  [-1, 5, -1, 9, -1, -1, -1, -1, -1],
  [8, -1, -1, -1, 4, -1, 3, -1, 7],
  [-1, -1, -1, 2, 8, -1, 1, 9, -1],
  [5, 3, 8, 6, -1, 7, 9, 4, -1],
  [-1, 2, -1, 3, -1, 1, -1, -1, -1],
  [1, -1, 9, 8, -1, 4, 6, 2, 3],
  [9, -1, 7, 4, -1, -1, -1, -1, -1],
  [-1, 4, 5, -1, -1, -1, 2, -1, 9],
  [-1, -1, -1, -1, 3, -1, -1, 7, -1]
]
function App() {

  const [sudokuArr,setSudokuArr]=useState(initial)

  function getDeepCopy(arr){
    return JSON.parse(JSON.stringify(arr))
  }

  function onInputChange(e,row,col){
    // Input value should range from 1-9 and for empty cell it should bd -1
    var val=parseInt(e.target.value)||-1,grid=getDeepCopy(sudokuArr);
    if(val===-1||val>=1&&val<=9){
      grid[row][col]=val;
    }
    setSudokuArr(grid)
  }

  // Function to check sudoku is valid or not
  function checkSudoku(){

  }

  // check number is unique in row
  function checkRow(grid,row,col){
    return grid[row].indexOf(num)===-1
  }

  // check number is unique in column
  function checkCol(grid,col,num){
    return grid.map(row=>row[col].indexOf(num)===-1)
  }

  // check number is unique in box
  function checkBox(){
    // get Box start index
    let boxArr=[],
    rowStart=row-(row%3),
    colStart=col-(col%3);
    for (let i=0;i<3;i++){
      for (let j=0;j<3;j++){
        // get all the cell numbers and push to boxArr
        boxArr.push(grid[rowStart+i][colStart+j])
      }
    }
  }

  function checkValid(grid,row,col,num){
    // num should be unique in row, col and in the square 3x3
    if (checkRow(grid,row,num) && checkCol(grid,row,num) && checkBox()){
      return true;
    }
    return false;
  }

  // recursive function to solve sudoku
  function solver(){
    for (let num=1;num<=9;num++){
      // check if this num is satisfying sudoku constraints
      if(checkValid(grid,row,col,num)){
        // fill the num in that cell
      }
    }
  }

  // Function to solve sudoku
  function solveSudoku(){
    let sudoku=getDeepCopy(initial);
    solver(sudoku);
    setSudokuArr(sudoku)
  }

  // Function to reset sudoku
  function resetSudoku(){

  }

  return (
    <>
      <div className="App">
        <div className="App-header">
          <h3>SUDOKU</h3>
          <table>
            <tbody>
              {
                [0,1,2,3,4,5,6,7,8].map((row,rIndex)=>{
                  return <tr key={rIndex} className={(row+1)%3===0?'bBorder':''}>
                    {
                      [0,1,2,3,4,5,6,7,8].map((col,cIndex)=>{
                        return <td key={rIndex+cIndex} className={(col+1)%3===0?'rBorder':''}>
                          <input 
                          onChange={(e)=>onInputChange(e,row,col)} 
                          value={sudokuArr[row][col]===-1?'':sudokuArr[row][col]} 
                          className="cellInput" 
                          disabled={initial[row][col]!==-1}/>
                        </td>
                      })
                    }
                  </tr>
                })
              }
              
            </tbody>
          </table>
          <div className="buttonContainer">
            <div className="checkButton" onClick={checkSudoku}>Check</div>
            <div className="solveButton" onClick={solveSudoku}>Solve</div>
            <div className="resetButton" onClick={resetSudoku}>Reset</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
