// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const myplc = require('./build/Release/plc_addon')

const startPLCBtn = document.getElementById('startPLC')
startPLCBtn.addEventListener('click', () => {myplc.my_func(1);} )
const stopPLCBtn = document.getElementById('stopPLC')
stopPLCBtn.addEventListener('click', () => {myplc.my_func(0);} )
const forwardBtn = document.getElementById('jogFoward')
forwardBtn.addEventListener('click', () => {myplc.my_func(2);} )
const backwardBtn = document.getElementById('jogBackward')
backwardBtn.addEventListener('click', () => {myplc.my_func(3);} )

console.log("Finishing renderer.js");
