import Page from "classes/Pages";

export default class Home extends Page {
    constructor() {
        super({
            id: 'home',
            element:'.home',
            elements: {
                navigation: document.querySelector('.navigation'),
                link: '.home__link',
            }
        });
    }

    create() {
        super.create(); //this method allows you to not overwrite existing create function in the Pages.js file

        this.elements.link.addEventListener('click', _ => console.log('Oh, you clicked me'))
    }
}
