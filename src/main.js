import LowPoly from './LowPoly';
import DOM from './DOM';

let DOMObject = new DOM().initialize();
let lowPoly = new LowPoly(DOMObject.get('origin'), DOMObject.get('render'));

DOMObject.get('import').addEventListener("change", lowPoly.importImage.bind(lowPoly));