/**
 * Created by azu on 2014/06/10.
 * LICENSE : MIT
 */
"use strict";
var MirrorConsole = require("./lib/mirror-console");
var PouchDB = require('pouchdb');
var content = document.querySelector(".content");
var editor = new MirrorConsole({ theme: "monokai" });
editor.setText(content.textContent);
editor.swapWithElement(content);

function line(text) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(text));
    return div;
}
document.getElementById("clear").addEventListener("click", function () {
   document.getElementById("output").innerHTML = '';
});

document.getElementById("eval").addEventListener("click", function () {
    var consoleMock = {
        log: function (arg) {
            var $output = document.getElementById("output")
            $output.insertBefore(line(arg), $output.firstChild);
        }
    }
    editor.runInContext({ PouchDB: PouchDB, console: consoleMock },function (error, result) {
        if (error) {
            var $output = document.getElementById("output")
            $output.insertBefore(line(arg), $output.firstChild);
            console.error(error);
        }
    });
});
