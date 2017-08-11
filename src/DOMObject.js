// let DOMObject = new Map();
// DOMObject.set('origin', document.querySelector('#origin'));
// DOMObject.set('render', document.querySelector('#render'));
// DOMObject.set('import', document.querySelector('#import'));

export default class DOM extends Map {
    constructor() { super(); }

    initialize() {
        this.set('origin', document.querySelector('#origin'));
        this.set('render', document.querySelector('#render'));
        this.set('import', document.querySelector('#import'));

        return this;
    }
}