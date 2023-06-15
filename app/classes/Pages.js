import each from 'lodash/each';

export default class Page {
    constructor({ 
        element,
        elements,
        id 
    }) {
        this.selectors = element;
        this.selectorChildren = {
            ...elements,
        }

        this.id = id;
    };

    create() {
        this.element = document.querySelector(this.selector);
        this.elements = {}
        each(this.selectorChildren, (entry, key) => {
            if (entry instanceof window.HTMLElement || entry instanceof window.NodeList) {
                this.elements[key] = entry;
            }

            console.log(entry)
        })

        console.log(this.elements)
        console.log('Create', this.id, this.element);
    };
}
