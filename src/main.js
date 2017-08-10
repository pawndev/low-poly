import LowPoly from './LowPoly';

let origin = document.querySelector('#origin');
let lowpolify = document.querySelector('#lowpolify');
let fileInput = document.querySelector('#importFile');
let lowPoly = new LowPoly(origin, lowpolify);

fileInput.addEventListener("change", lowPoly.importImage.bind(lowPoly));