import loadWASM from './tsp.js';

export async function solveTSP(adj: number[][]): Promise<number[]> {
  const wasm_module = await loadWASM();
  try {
    var matrix = new wasm_module['DoubleListList']();
    for (var row of adj) {
      var converted_row = new wasm_module.DoubleList();
      for (const element of row) {
        converted_row.push_back(element);
      }
      matrix.push_back(converted_row);
    }

    var i_result = wasm_module['Solve'](matrix);

    var result = [];
    for (let i = 0; i < i_result.size(); i++) {
      result.push(i_result.get(i));
    }

    i_result.delete();
    matrix.delete();

    console.log(result, 'Solve TSP');
    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
}
