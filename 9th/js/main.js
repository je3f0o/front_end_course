window.addEventListener("DOMContentLoaded", function () { "use strict";

    const container = document.querySelector(".container");
    const sidenav = document.querySelector(".sidenav");
    const input_sudoku = [
        [1,8,3,0,7,0,0,0,0],
        [0,9,0,0,5,0,7,1,0],
        [5,0,0,9,0,0,0,0,6],
        [8,0,0,0,6,0,0,2,0],
        [3,0,0,0,0,9,0,0,8],
        [0,2,1,0,8,0,0,0,5],
        [6,0,0,0,0,2,0,0,9],
        [0,0,9,0,3,0,0,6,0],
        [0,0,0,0,9,0,4,8,0],
    ];

    const sudoku = new SudokuSolverVisualizer(input_sudoku);
    container.appendChild(sudoku.table);

    window.sudoku = sudoku;

    const button = document.querySelector(".update-cell");
    button.addEventListener("click", () => sudoku.update_cell());

    const step_button = document.querySelector(".step");
    step_button.addEventListener("click", () => sudoku.step());

    sudoku.on("stack_push", cell => {
        const div = document.createElement("div");
        div.textContent = cell.value;
        div.classList.add("stack-cell");
        sidenav.appendChild(div);
        sidenav.scrollTop = 0;
    });

    sudoku.on("stack_pop", () => {
        sidenav.removeChild(sidenav.lastChild);
    });

    sudoku.on("solved", () => {
        alert("Solved!");
    });

    const interval_id = setInterval(() => {
        step_button.click();
    }, 1);

    sudoku.on("no_solution", () => {
        clearInterval(interval_id);
    });
});