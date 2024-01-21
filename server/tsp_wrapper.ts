const Module = require('./tsp.js');

Module.onRuntimeInitialized = function () {
    // Export the Solve function to be used in Node.js
    Module.exports.Solve = function(adj: number[][]): number[] {
        const resultPointer = Module._Solve(adj);
        const result: number[] = Module.getVectorInt(resultPointer);
        Module._free(resultPointer);  // Free the allocated memory
        return result;
    };
};

module.exports = Module;