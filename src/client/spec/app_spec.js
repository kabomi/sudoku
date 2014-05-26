/*global describe, it, expect, spyOn, beforeEach, fs, xit, done, jasmine, afterEach, xdescribe */

(function(){
    "use strict";

    describe("Sudoku", function(){
        describe("4x4 game", function (){
            var sudoku = [
                    [3,4,1,0],
                    [0,2,0,0],
                    [0,0,2,0],
                    [0,1,4,3]
                ];
            var game = app.init(sudoku);
            it("prints a given matrix", function(){
                game.print();
            });
            it("searchs the next hole", function(){
                var nextHole = game.nextHole();
                expect(nextHole.x).toBe(0);
                expect(nextHole.y).toBe(3);
            });
            it("returns possible values for subSudoku", function(){
                var possibleValues = game.getPossibleValuesForSubSudoku({x:1,y:0});

                expect(possibleValues.length).toBe(1);
                expect(possibleValues[0]).toBe(1);

                possibleValues = game.getPossibleValuesForSubSudoku({x:1,y:3});

                expect(possibleValues.length).toBe(3);
                expect(possibleValues[0]).toBe(2);
                expect(possibleValues[1]).toBe(3);
                expect(possibleValues[2]).toBe(4);

                possibleValues = game.getPossibleValuesForSubSudoku({x:2,y:0});

                expect(possibleValues.length).toBe(3);
                expect(possibleValues[0]).toBe(2);
                expect(possibleValues[1]).toBe(3);
                expect(possibleValues[2]).toBe(4);

                possibleValues = game.getPossibleValuesForSubSudoku({x:2,y:3});

                expect(possibleValues.length).toBe(1);
                expect(possibleValues[0]).toBe(1);
            });
            it("returns possible values for a row", function(){
                var nextHole = game.nextHole();
                var possibleValues = game.getPossibleValuesForRow(0);

                expect(possibleValues.length).toBe(1);
                expect(possibleValues[0]).toBe(2);
            });
            it("returns possible values for a column", function(){
                var nextHole = game.nextHole();
                var possibleValues = game.getPossibleValuesForCol(3);

                expect(possibleValues.length).toBe(3);
                expect(possibleValues[0]).toBe(1);
                expect(possibleValues[1]).toBe(2);
                expect(possibleValues[2]).toBe(4);
            });
            it("returns possible values for a certain hole", function(){
                var nextHole = game.nextHole();
                var possibleValues = game.getPossibleValuesFor(nextHole);

                expect(possibleValues[0]).toBe(2);
                expect(possibleValues.length).toBe(1);
            });
            it("solves sudoku", function(){
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
                console.log("_------------------------------_");
                var solution = game.solve();

                expect(solution.hasSolution(solvedSudoku)).toBeTruthy();
                console.log("++++++++++++++++++++++++++++++++++");
                solution.print();
            });
        });
        describe("9x9 game", function (){
            var sudoku = [
                    [0,0,0,9,1,0,7,0,6],
                    [0,8,0,0,0,3,0,9,0],
                    [9,0,2,6,5,7,0,0,0],
                    [2,0,0,0,0,5,6,0,0],
                    [6,0,0,0,0,0,2,7,5],
                    [0,0,0,0,0,0,0,0,3],
                    [0,0,7,0,6,0,0,3,5],
                    [1,0,3,0,0,0,0,0,9],
                    [5,0,4,3,0,9,0,0,0]
                ];
            var game = app.init(sudoku);
            it("prints a given matrix", function(){
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
                var nextHole = game.nextHole();
                expect(nextHole.x).toBe(0);
                expect(nextHole.y).toBe(0);
            });
            it("returns possible values for a row", function(){
                var nextHole = game.nextHole();
                var possibleValues = game.getPossibleValuesForRow(0);

                expect(possibleValues.length).toBe(5);
                expect(possibleValues[0]).toBe(2);
                expect(possibleValues[1]).toBe(3);
                expect(possibleValues[2]).toBe(4);
                expect(possibleValues[3]).toBe(5);
                expect(possibleValues[4]).toBe(8);
            });
            it("returns possible values for a column", function(){
                var nextHole = game.nextHole();
                var possibleValues = game.getPossibleValuesForCol(0);

                expect(possibleValues.length).toBe(4);
                expect(possibleValues[0]).toBe(3);
                expect(possibleValues[1]).toBe(4);
                expect(possibleValues[2]).toBe(7);
                expect(possibleValues[3]).toBe(8);
            });
        });
        
    });

})();