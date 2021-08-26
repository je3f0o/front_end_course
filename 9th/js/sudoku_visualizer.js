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
            if (value) {
                td.textContent = value;
                td.classList.add("constant");
            }
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
    
class SudokuSolverVisualizer extends EventEmitter {
    constructor (sudoku) {
        super();

        this.cell       = new Cell();
        this.next_value = 0;
        this.table      = create_sudoku_table(sudoku);
        this.sudoku     = sudoku;
        this.solutions  = [];
        this.cells      = this.table.querySelectorAll("td");

        this.stack_cells = [];
        this.temp_sudoku = sudoku.map(row => row.concat());

        this.cell.x = -1;
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

    is_solved () {
        return this.temp_sudoku.every(row => row.every(n => n !== 0));
    }

    step () {
        const {cell, temp_sudoku} = this;

        if (this.next_value < 9) {
            this.next_value += 1;
            const {next_value} = this;

            cell.element.textContent = next_value;
            if (this.is_possible(next_value)) {
                cell.value = next_value;
                cell.element.classList.remove("wrong");

                temp_sudoku[cell.y][cell.x] = next_value;

                if (this.is_solved()) {
                    this.emit("solved");
                } else {
                    const clone = cell.clone();
                    this.stack_cells.push(clone);
                    this.emit("stack_push", clone);
                    this.update_cell();
                }
            } else {
                cell.element.classList.add("wrong");
            }
        } else {
            cell.element.textContent = "";
            cell.element.classList.remove("wrong", "selected");
            temp_sudoku[cell.y][cell.x] = 0;

            if (this.stack_cells.length) {
                this.cell = this.stack_cells.pop();
                this.cell.element.classList.add("selected");
                this.next_value = this.cell.value;
                this.emit("stack_pop");
            } else {
                this.emit("no_solution");
            }
        }
    }
}

window.SudokuSolverVisualizer = SudokuSolverVisualizer;

})();