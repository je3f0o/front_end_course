window.addEventListener("DOMContentLoaded", function () { "use strict";

    const tabs = document.querySelectorAll(".md-tab");
    let selected_tab = tabs[0];

    function on_click() {
        const old_indicator = selected_tab.querySelector(".md-tab__indicator");
        const new_indicator = this.querySelector(".md-tab__indicator");
        const rect     = old_indicator.getBoundingClientRect();
        const tab_rect = this.getBoundingClientRect();

        const delta = rect.left - tab_rect.left;
        new_indicator.style.transform = `translateX(${delta}px)`;
        new_indicator.style.width     = `${rect.width}px`;

        // Trigger reflow
        // this.offsetHeight;

        selected_tab.classList.remove("md-tab--activated");
        this.classList.add("md-tab--activated");

        new_indicator.style.width     = null;
        new_indicator.style.transform = null;

        selected_tab = this;
    }

    for (const tab of tabs) {
        tab.addEventListener("click", on_click);
    }

});