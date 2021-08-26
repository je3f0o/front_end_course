window.addEventListener("DOMContentLoaded", function () { "use strict";

const NODE_ELEMENT = 1;

const html_template = `
<div class="container">
    <img style="display:none"
        src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
        onLoaD="alert('evil javascript code2')"
        >
	<div class="tabs">
		<input type="radio" id="radio-1" name="tabs" checked />
		<label class="tab" for="radio-1">Upcoming<span class="notification">2</span></label>
		<input type="radio" id="radio-2" name="tabs" />
        
        <script>alert('evil javascript code3');</script>

		<label class="tab" for="radio-2">Development</label>
		<input type="radio" id="radio-3" name="tabs" />
		<label class="tab" for="radio-3">Completed</label>
		<span class="glider"></span>
	</div>
</div>
`;

    const black_listed_elements = [
        "SCRIPT",
    ];
    const black_listed_attrs = [
        "onload",
        "onclick",
        "mouseover",
    ];

    const clear_dirty_stuffs = elements => {
        let i = elements.length - 1;
        while (i >= 0) {
            const el = elements[i];

            if (el.nodeType === NODE_ELEMENT) {
                // Element node
                if (black_listed_elements.includes(el.tagName)) {
                    if (el.parentNode) {
                        el.parentNode.removeChild(el);
                    } else {
                        elements.splice(i, 1);
                    }
                } else {
                    for (const attr of el.attributes) {
                        const attr_name = attr.name.toLowerCase();
                        if (black_listed_attrs.includes(attr_name)) {
                            el.removeAttribute(attr.name);
                        }
                    }
                }

                clear_dirty_stuffs(el.children);
            }
            
            i -= 1;
        }
    };

    const elements = JeefoDOMParser.parse(html_template);
    clear_dirty_stuffs(elements);

    for (const el of elements) {
        document.body.appendChild(el);
    }

});