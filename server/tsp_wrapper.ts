const Module = require('./tsp.js');

export function solveTSP(adj: number[][]): number[] {
  try {
    console.log('ENTER solveTSP');
    var matrix = new Module['vector<vector<double>>']();

    for (var row of adj) {
      var converted_row = new Module['vector<double>']();
      for (const element of row) {
        converted_row.push_back(element);
      }
      matrix.push_back(converted_row);
    }

    var i_result = Module['Solve'](matrix);

    var result = [];
    for (let i = 0; i < i_result.size(); i++) {
      result.push(i_result.get(i));
    }

    console.log(result, 'Solve TSP');
    return result;
  } catch (err) {
    console.log(err);
    return []
  }
}