class CompareFirstElement {
    public compare(left: [number, [number, number]], right: [number, [number, number]]): number {
      return left[0] - right[0];
    }
  }
  
  class Node {
    num: number = 0;
    neighbours: number[] = [];
  
    constructor() {
      this.neighbours = [];
    }
  }
  
  export function solveTSP(adj: number[][]): number[] {
    const visited: boolean[] = new Array(adj.length).fill(false);
    const pq: [number, [number, number]][] = [];
    const compareFirstElement = new CompareFirstElement();
  
    pq.push([0, [0, 0]]);
  
    const nodes: Node[] = new Array(adj.length).fill(null).map(() => new Node());
  
    while (pq.length > 0) {
      const [cost, [parent, current]] = pq.shift()!;
      if (visited[current]) continue;
  
      nodes[parent].neighbours.push(current);
      nodes[current].neighbours.push(parent);
  
      visited[current] = true;
      for (let i = 0; i < adj.length; i++) {
        if (adj[current][i] !== 0 && !visited[i]) {
          pq.push([adj[current][i], [current, i]]);
        }
      }
      pq.sort(compareFirstElement.compare);
    }
  
    const order: number[] = [];
    const q: number[] = [];
    q.push(0);
    visited.fill(false);
  
    while (q.length > 0) {
      const u = q.shift()!;
      if (visited[u]) continue;
      visited[u] = true;
      order.push(u);
  
      for (const v of nodes[u].neighbours) {
        if (!visited[v]) {
          q.push(v);
        }
      }
    }
  
    return order;
  }