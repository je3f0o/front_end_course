window.addEventListener("DOMContentLoaded", function () { "use strict";

    const container = document.querySelector(".container");

    function render_sudoku (sudoku) {
        const table = document.createElement("table");
        table.classList.add("sudoku");

        for (let i = 0; i < 9; i += 1) {
            const tr = document.createElement("tr");
            for (let j = 0; j < 9; j += 1) {
                const td = document.createElement("td");
                const value = sudoku[i][j];
                if (value) td.textContent = value;
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        container.appendChild(table);
    }

    class Sudoku {
        constructor (sudoku) {
            this.sudoku    = sudoku;
            this.solutions = [];
        }

        is_possible (x, y, value) {
            const sudoku = this.sudoku;

            // Checking row
            for (let i = 0; i < 9; i += 1) {
                if (i === x) continue;
                if (sudoku[y][i] === value) return false;
            }

            // Checking column
            for (let i = 0; i < 9; i += 1) {
                if (i === y) continue;
                if (sudoku[i][x] === value) return false;
            }

            // Checking region
            const x_offset = Math.floor(x / 3) * 3;
            const y_offset = Math.floor(y / 3) * 3;
            for (let i = 0; i < 3; i += 1) {
                const row = sudoku[y_offset + i];
                for (let j = 0; j < 3; j += 1) {
                    if (row[x_offset + j] === value) return false;
                }
            }

            return true;
        }

        solver () {
            const sudoku = this.sudoku;
            
            for (let y = 0; y < 9; y += 1) {
                for (let x = 0; x < 9; x += 1) {
                    if (sudoku[y][x] !== 0) continue;

                    for (let i = 1; i <= 9; i += 1) {
                        if (this.is_possible(x, y, i)) {
                            sudoku[y][x] = i;
                            this.solver();
                            sudoku[y][x] = 0;
                        }
                    }

                    return;
                }
            }
            
            // sudoku solved
            const solution = sudoku.map(row => row.concat());
            this.solutions.push(solution);
        }

        solve () {
            this.solver();
            return this.solutions;
        }
    }

    const input_sudoku = [
        [0,8,3,0,7,0,0,0,0],
        [0,9,0,0,5,0,7,1,0],
        [5,0,0,9,0,0,0,0,6],
        [8,0,0,0,6,0,0,2,0],
        [3,0,0,0,0,9,0,0,8],
        [0,2,1,0,8,0,0,0,5],
        [6,0,0,0,0,2,0,0,9],
        [0,0,9,0,3,0,0,6,0],
        [0,0,0,0,9,0,4,8,0],
    ];
    render_sudoku(input_sudoku);

    const sudoku = new Sudoku(input_sudoku);
    const solutions = sudoku.solve();

    const h1 = document.createElement("h1");
    h1.textContent = "Solutions";
    container.appendChild(h1);

    for (const solution of solutions) {
        render_sudoku(solution);
    }

});