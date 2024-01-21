const Module = require('./tsp_module.js');

Module.onRuntimeInitialized = function () {
    Module.exports.Solve = Module.cwrap('Solve', 'number', ['array']);
};

module.exports = Module;