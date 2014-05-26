
var app = app || {};

(function(){
    "use strict";

    function init(sudoku){
        var self = {};

        self.sudoku = sudoku;
        self.size = sudoku.length/2;
        self.nextHole = function(){
            var result = null;
            self.sudoku.forEach(function(row, rowIndex){
                if (result !== null) return;

                row.forEach(function(col, colIndex){
                    if (result !== null) return;

                    var element = self.sudoku[rowIndex][colIndex]; 
                    if (element === 0){
                        result = { x: rowIndex, y: colIndex};
                    }
                });
            });

            return result;
        };
        
        self.getPossibleValuesFor = function(hole){
            var result = [];

            var rowPossibleValues = self.getPossibleValuesForRow(hole.x);
            var colPossibleValues = self.getPossibleValuesForCol(hole.y);
            var subSudokuPossibleValues = self.getPossibleValuesForSubSudoku(hole);
            
            //console.log("rowPosVal:" + rowPossibleValues);
            //console.log("colPosVal:" + colPossibleValues);
            //console.log("subSudokuPosVal:" + subSudokuPossibleValues);
            result = intersectionOfValues(
                rowPossibleValues,
                colPossibleValues,
                subSudokuPossibleValues);

            return result;
        };
        
        self.getPossibleValuesForRow = function(rowIndex){
            var possibleValues = getAllValuesFromOneTo(sudoku.length);
            //console.log("possibleValues:" + possibleValues);
            self.sudoku[rowIndex].forEach(function(col, colIndex){
                var possibleValueIndex = possibleValues.indexOf(col);
                //console.log("possibleValueIndex:" + possibleValueIndex + ";col:" + col + ";colIndex:" + colIndex);
                if ( possibleValueIndex >= 0){
                    possibleValues.splice(possibleValueIndex, 1);
                    //console.log("possibleValues:" + possibleValues);
                }
            });
            return possibleValues;
        };
        
        self.getPossibleValuesForCol = function(colIndex){
            var possibleValues = getAllValuesFromOneTo(sudoku.length);
            self.sudoku.forEach(function(row, rowIndex){
                var possibleValueIndex = possibleValues.indexOf(row[colIndex]);
                if (possibleValueIndex >= 0){
                    possibleValues.splice(possibleValueIndex, 1);
                }
            });
            return possibleValues;
        };
        
        self.getPossibleValuesForSubSudoku = function(hole){
            if (self.sudoku[hole.x][hole.y] !== 0) return [];

            var possibleValues = getAllValuesFromOneTo(sudoku.length);
            var subRowIndex = 0;
            var subColIndex = 0;

            if (hole.x >= self.size){
                subRowIndex = self.size;
            }
            if (hole.y >= self.size){
                subColIndex = self.size;
            }
            //console.log("subRowIndex:" + subRowIndex);
            //console.log("subColIndex:" + subColIndex);
            //console.log("sudoku.size:" + self.size);
            for (var i= subRowIndex; i < subRowIndex + self.size; i++){
                for (var j= subColIndex; j < subColIndex + self.size; j++){
                    //console.log("i,j:" + i + "," + j);
                    var possibleValueIndex = possibleValues.indexOf(self.sudoku[i][j]);
                    if (possibleValueIndex >= 0){
                        possibleValues.splice(possibleValueIndex, 1);
                    }    
                }
            }
            //console.log("hole:" + hole.x + "," + hole.y);
            //console.log("possibleValues:" + possibleValues);
            return possibleValues;
        };
        function intersectionOfValues(){
            var result = [];
            console.log("arguments");
            console.log(arguments[0]);
            console.log(arguments[1]);
            console.log(arguments[2]);
            if (arguments.length > 2){
                result = intersectionOfValues(arguments[0], arguments[1]);
                return intersectionOfValues(result, arguments[2]);
            }else{
                var firstArray = arguments[0];
                var secondArray = arguments[1];
                firstArray.forEach(function(col, colIndex){
                    if (secondArray.indexOf(col) >= 0){
                        result.push(col);
                    }
                });
                return result;
            }
        };
        function getAllValuesFromOneTo(number){
            var result = [];
            var value = 1;
            while(value <= number){
                result.push(value);
                value++;
            }

            return result;
        };
        
        self.solve = function(){
            return solve(self);
        };
        function solve(game){
            try{
                var nextHole = game.nextHole();
                
                if (nextHole === null) return game;

                console.log("nextHole(" + nextHole.x + "," + nextHole.y + ")");
                var possibleValues = game.getPossibleValuesFor(nextHole);
                var backupSudoku = clone(game.sudoku);
                for (var i = 0; i < possibleValues.length;i++){
                    game.sudoku[nextHole.x][nextHole.y] = possibleValues[i];
                    var partialSolution = solve(game);
                    if (partialSolution.nextHole() === null){
                        return partialSolution;
                    }
                }
                game.sudoku = backupSudoku;
                return game;
            }catch(ex){
                app.print(game.sudoku);
                throw ex;
            }
        }
        function clone(sudoku){
            if (sudoku === undefined) throw "sudoku cannot be undefined";
            var cloned = [];
            sudoku.forEach(function(row){
                var clonedRow = [];
                row.forEach(function(col){
                    clonedRow.push(col);
                });
                cloned.push(clonedRow);
            });
            return cloned;
        }

        self.hasSolution = function(solvedSudoku){
            var areEqual = true;
            self.sudoku.forEach(function(row, rowIndex){
                row.forEach(function(col, colIndex){
                    if (self.sudoku[rowIndex][colIndex] !== solvedSudoku[rowIndex][colIndex]){
                        areEqual = false;
                    }
                });
            });

            return areEqual;
        };

        return self;
    }


    function print(sudoku){
        var separator = buildSeparator(sudoku.length);
        sudoku.forEach(function(row, rowIndex){
            var line = "";
            
            if (((rowIndex)%(sudoku.length/2) === 0)){
                console.log(separator);
            }
            row.forEach(function(col, colIndex){
                if (colIndex === 0) line += '|';
                line += col;
                if (((colIndex + 1)%(sudoku.length/2) === 0)){
                    line += '|';
                }
            });
            console.log(line);
        });
        console.log(separator);
        function buildSeparator(length){
            var separator = "";
            for (var i = 0; i < length; i++){
                separator += "--";
            }
            return separator;
        }
    }

    app.print = print;
    app.init = init;
    
})();