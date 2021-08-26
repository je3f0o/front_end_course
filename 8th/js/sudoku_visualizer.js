// IIFE
(function () {

function create_sudoku_table (sudoku) {
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

    return table;
}

class Cell {
    constructor () {
        this.x       = 0;
        this.y       = 0;
        this.value   = 0;
        this.element = null;
    }

    clone () {
        return Object.assign(new Cell(), this);
    }
}
    
class SudokuSolverVisualizer {
    constructor (sudoku) {
        this.cell       = new Cell();
        this.next_value = 0;
        this.table      = create_sudoku_table(sudoku);
        this.sudoku     = sudoku;
        this.solutions  = [];
        this.cells      = this.table.querySelectorAll("td");

        this.stack_cells = [];

        this.temp_sudoku = sudoku.map(row => row.concat());

        this.update_cell();
    }

    update_cell () {
        const {cell, sudoku, table} = this;

        let j = cell.x + 1;

        for (let i = cell.y; i < 9; i += 1) {
            for (; j < 9; j += 1) {
                if (sudoku[i][j] === 0) {
                    cell.x = j;
                    cell.y = i;
                    
                    if (cell.element) {
                        cell.element.classList.remove("selected");
                    }

                    const index = i * 9 + j;
                    cell.element = this.cells[index];
                    cell.element.classList.add("selected");

                    this.next_value = 0;
                    return;
                }
            }

            j = 0;
        }
    }

    is_possible (value) {
        const {cell, temp_sudoku} = this;
        const {x, y} = cell;

        // checking X directions
        for (let i = 0; i < 9; i += 1) {
            if (i === x) continue;
            if (temp_sudoku[y][i] === value) {
                return false;
            }
        }

        // checking Y directions
        for (let i = 0; i < 9; i += 1) {
            if (i === y) continue;
            if (temp_sudoku[i][x] === value) {
                return false;
            }
        }

        // checking region
        const x_offset = Math.floor(x / 3) * 3;
        const y_offset = Math.floor(y / 3) * 3;
        for (let i = 0; i < 3; i += 1) {
            const y2 = y_offset + i;
            const row = temp_sudoku[y2];
            for (let j = 0; j < 3; j += 1) {
                const x2 = x_offset + j;
                if (y === y2 && x === x2) continue;

                if (row[x_offset + j] === value) return false;
            }
        }

        return true;
    }

    step () {
        if (this.next_value < 9) {
            this.next_value += 1;
            const {cell, next_value, temp_sudoku} = this;

            cell.element.textContent = next_value;
            if (this.is_possible(next_value)) {
                cell.value = next_value;
                cell.element.classList.remove("wrong");

                temp_sudoku[cell.y][cell.x] = next_value;

                this.stack_cells.push(cell.clone());
                this.update_cell();
            } else {
                cell.element.classList.add("wrong");
            }
        } else {
            alert("No solution");
            // back track...
        }
    }
}

window.SudokuSolverVisualizer = SudokuSolverVisualizer;

})();