import About from 'pages/About';
import Collections from 'pages/Collections';
import Detail from 'pages/Detail';
import Home from 'pages/Home';
class App {
    constructor () {
        this.createContent();
        this.createPages();
    }

    createContent() {
        this.content = document.querySelector('.content');
        this.template = this.content.getAttribute('data-template'); // this.content.dataset.template - not surported by some safari versions


    }

    createPages() {
        this.pages = {
            about: new About(),
            collections: new Collections(),
            detail: new Detail(),
            home: new Home(),
        };
        
        this.page = this.pages[this.template]
        this.page.create() //select all the things that are in the page
        console.log(this.page);
    }
};

new App();
