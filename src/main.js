import LowPoly from './LowPoly';
import DOM from './DOM';
import Application from './Application';

Array.prototype.clone = function () {
    return this.slice(0);
}

let DOMObject = new DOM().initialize();
let App = new Application(DOMObject)
let lowPoly = new LowPoly(DOMObject.get('origin'), DOMObject.get('render'));

DOMObject.get('import').addEventListener("change", lowPoly.importImage.bind(lowPoly));