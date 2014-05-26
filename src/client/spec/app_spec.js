/*global describe, it, expect, spyOn, beforeEach, fs, xit, done, jasmine, afterEach, xdescribe */

(function(){
    "use strict";

    describe("Sudoku", function(){
        var sudoku, game;
        describe("4x4 game", function (){
            beforeEach(function(){
                sudoku = [
                        [3,4,1,0],
                        [0,2,0,0],
                        [0,0,2,0],
                        [0,1,4,3]
                    ];
                game = app.init(sudoku);
            });
            it("prints a given matrix", function(){
                app.log("Sudoku to solve");
                app.log("_--------------4x4---------------_");
                game.print();
            });
            it("searchs the next hole", function(){
                expectNextHolePositionToBe(0,3);
            });
            it("returns possible values for subSudoku", function(){
                var possibleValues = game.getPossibleValuesForSubSudoku({x:1,y:0});
                expectPossibleValues(possibleValues).toBe([1]);

                possibleValues = game.getPossibleValuesForSubSudoku({x:1,y:3});
                expectPossibleValues(possibleValues).toBe([2,3,4]);

                possibleValues = game.getPossibleValuesForSubSudoku({x:2,y:0});
                expectPossibleValues(possibleValues).toBe([2,3,4]);

                possibleValues = game.getPossibleValuesForSubSudoku({x:2,y:3});
                expectPossibleValues(possibleValues).toBe([1]);
            });
            it("returns possible values for a row", function(){
                var nextHole = game.nextHole();
                var possibleValues = game.getPossibleValuesForRow(0);
                expectPossibleValues(possibleValues).toBe([2]);
            });
            it("returns possible values for a column", function(){
                var nextHole = game.nextHole();
                var possibleValues = game.getPossibleValuesForCol(3);
                expectPossibleValues(possibleValues).toBe([1,2,4]);
            });
            it("returns possible values for a certain hole", function(){
                var nextHole = game.nextHole();
                var possibleValues = game.getPossibleValuesFor(nextHole);
                expectPossibleValues(possibleValues).toBe([2]);
            });
            it("solves sudoku", function(){
                app.log("Sudoku solution");
                app.log("++++++++++++4x4++++++++++++++");
                var solvedGame = game.solve();
                var solvedSudoku = solvedGame.sudoku;

                expect(solvedSudoku[0][3]).toBe(2);

                expect(solvedSudoku[1][0]).toBe(1);
                expect(solvedSudoku[1][2]).toBe(3);
                expect(solvedSudoku[1][3]).toBe(4);

                expect(solvedSudoku[2][0]).toBe(4);
                expect(solvedSudoku[2][1]).toBe(3);
                expect(solvedSudoku[2][3]).toBe(1);

                expect(solvedSudoku[3][0]).toBe(2);

                solvedGame.print();
            });
            it("checks if the sudoku is equal to other", function(){
                var unsolvedSudoku = [
                    [0,0,2,0],
                    [3,0,0,0],
                    [0,0,4,2],
                    [0,0,3,1]
                ];
                var solvedSudoku = [
                    [4,1,2,3],
                    [3,2,1,4],
                    [1,3,4,2],
                    [2,4,3,1]  
                ];
                game = app.init(unsolvedSudoku);
                app.log("Sudoku to solve");
                app.log("_--------------4x4---------------_");
                game.print();
                var solution = game.solve();

                expect(solution.hasSolution(solvedSudoku)).toBeTruthy();
                app.log("Sudoku solution");
                app.log("+++++++++++++++4x4++++++++++++++++");
                solution.print();
            });
        });
        describe("9x9 game", function (){
            beforeEach(function(){
                sudoku = [
                        [0,0,0,9,1,0,7,0,6],
                        [0,8,0,0,0,3,0,9,0],
                        [9,0,2,6,5,7,0,0,0],
                        [2,0,0,0,0,5,6,0,0],
                        [6,0,0,0,0,0,2,5,7],
                        [0,0,0,0,0,0,0,0,3],
                        [0,0,7,0,6,0,0,3,5],
                        [1,0,3,0,0,0,0,0,9],
                        [5,0,4,3,0,9,0,0,0]
                    ];
                game = app.init(sudoku);
            });
            it("prints a given matrix", function(){
                app.log("Sudoku to solve");
                app.log("_--------------9x9---------------_");
                var printedSudoku = game.print();
                var hSeparator = '-';
                var vSeparator = '|';
                expect(printedSudoku[0][0]).toBe(hSeparator);
                expect(printedSudoku[1][0]).toBe(vSeparator);
                expect(printedSudoku[1][4]).toBe(vSeparator);
                expect(printedSudoku[1][8]).toBe(vSeparator);
                expect(printedSudoku[1][12]).toBe(vSeparator);
                expect(printedSudoku[4][0]).toBe(hSeparator);
                expect(printedSudoku[8][0]).toBe(hSeparator);
                expect(printedSudoku[12][0]).toBe(hSeparator);
            });
            it("searchs the next hole", function(){
                expectNextHolePositionToBe(0,0);
            });
            it("returns possible values for a row", function(){
                var nextHole = game.nextHole();
                var possibleValues = game.getPossibleValuesForRow(0);

                expectPossibleValues(possibleValues).toBe([2,3,4,5,8]);
            });
            it("returns possible values for a column", function(){
                var nextHole = game.nextHole();
                var possibleValues = game.getPossibleValuesForCol(0);

                expectPossibleValues(possibleValues).toBe([3,4,7,8]);
            });
            it("returns possible values for subSudoku", function(){
                var possibleValues = game.getPossibleValuesForSubSudoku({x:0,y:5});
                expectPossibleValues(possibleValues).toBe([2,4,8]);

                possibleValues = game.getPossibleValuesForSubSudoku({x:4,y:4});
                expectPossibleValues(possibleValues).toBe([1,2,3,4,6,7,8,9]);

                possibleValues = game.getPossibleValuesForSubSudoku({x:2,y:8});
                expectPossibleValues(possibleValues).toBe([1,2,3,4,5,8]);

                possibleValues = game.getPossibleValuesForSubSudoku({x:8,y:8});
                expectPossibleValues(possibleValues).toBe([1,2,4,6,7,8]);
            });
            it("returns possible values for a certain hole", function(){
                var nextHole = game.nextHole();
                var possibleValues = game.getPossibleValuesFor(nextHole);
                expectPossibleValues(possibleValues).toBe([3,4]);
            });
            it("solves sudoku", function(){
                app.log("Sudoku solution");
                app.log("++++++++++++9x9++++++++++++++");
                var solvedGame = game.solve();
                var solvedSudoku = solvedGame.sudoku;

                expect(solvedSudoku[0][0]).toBe(3);
                expect(solvedSudoku[0][1]).toBe(4);
                expect(solvedSudoku[0][2]).toBe(5);
                expect(solvedSudoku[0][5]).toBe(8);
                expect(solvedSudoku[0][7]).toBe(2);

                expect(solvedSudoku[8][1]).toBe(6);
                expect(solvedSudoku[8][4]).toBe(8);
                expect(solvedSudoku[8][6]).toBe(1);
                expect(solvedSudoku[8][7]).toBe(7);
                expect(solvedSudoku[8][8]).toBe(2);

                solvedGame.print();
            });
            it("checks if the sudoku is equal to other", function(){
                var unsolvedSudoku = [
                    [0,0,7,0,0,8,0,4,2],
                    [0,9,3,4,0,6,1,0,8],
                    [0,0,1,7,0,0,0,0,0],
                    [0,0,9,3,0,0,0,0,0],
                    [5,0,0,0,0,7,4,3,0],
                    [0,6,8,0,4,5,7,2,0],
                    [0,3,6,0,8,0,0,9,0],
                    [0,7,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,8,6]
                ];
                var solvedSudoku = [
                    [6,5,7,1,3,8,9,4,2],
                    [2,9,3,4,5,6,1,7,8],
                    [4,8,1,7,2,9,6,5,3],
                    [7,4,9,3,1,2,8,6,5],
                    [5,1,2,8,6,7,4,3,9],
                    [3,6,8,9,4,5,7,2,1],
                    [1,3,6,2,8,4,5,9,7],
                    [8,7,5,6,9,3,2,1,4],
                    [9,2,4,5,7,1,3,8,6]  
                ];
                game = app.init(unsolvedSudoku);
                app.log("Sudoku to solve");
                app.log("_--------------9x9---------------_");
                game.print();
                var solution = game.solve();

                expect(solution.hasSolution(solvedSudoku)).toBeTruthy();
                app.log("Sudoku solution");
                app.log("+++++++++++++++9x9++++++++++++++++");
                solution.print();
            });
        });
        function expectNextHolePositionToBe(x, y){
            var nextHole = game.nextHole();
            expect(nextHole.x).toBe(x);
            expect(nextHole.y).toBe(y);
        }
        function expectPossibleValues(possibleValues){
            return {
                toBe: function(arrayValues){
                    var result = true;
                    expect(possibleValues.length).toBe(arrayValues.length);
                    possibleValues.forEach(function(value, index){
                        if (value !== arrayValues[index]){
                            result = false;
                        }
                    });
                    expect(result).toBeTruthy();
                }
            }
        }
    });

})();