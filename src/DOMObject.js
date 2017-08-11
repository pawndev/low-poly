export default class DOM extends Map {
    constructor() { super(); }

    initialize() {
        this.set('origin', document.querySelector('#origin'));
        this.set('render', document.querySelector('#render'));
        this.set('import', document.querySelector('#import'));

        return this;
    }
}