// emcc -Oz tsp.cpp -lembind -o tsp.js -s EXPORT_ES6=1 -s MODULARIZE=1 -s EXPORT_NAME=loadWASM -s SINGLE_FILE=1
#include <iostream>
#include <vector>
#include <utility>
#include <queue>
#include <emscripten/bind.h>
#include <emscripten/emscripten.h>


using std::vector;
using std::pair;
using std::priority_queue;
using std::queue;
using std::make_pair;

struct CompareFirstElement {
    bool operator()(const pair<double, pair<int, int> >& left, const pair<double, pair<int, int> >& right) const {
        return left.first > right.first;
    }
};

struct Node{
    int num;
    vector<int> neighbours;
};

vector<int> EMSCRIPTEN_KEEPALIVE Solve(const vector<vector<double>> adj){
      vector<bool> visited(adj.size(), false);
      priority_queue<pair<double,pair<int,int> >, vector<pair<double,pair<int,int> > >, CompareFirstElement> pq;
      pq.push(make_pair(0, make_pair(0, 0)));

      vector<Node> nodes(adj.size());

      while(!pq.empty()){
          pair<double,pair<int, int> > p = pq.top();
          pq.pop();
          if(visited[p.second.second]) continue;

          nodes[p.second.first].neighbours.push_back(p.second.second);
          nodes[p.second.second].neighbours.push_back(p.second.first);

          visited[p.second.second] = true;
          for(int i = 0; i < adj.size(); i++){
              if(adj[p.second.second][i] != 0 && !visited[i]){
                  pq.push(make_pair(adj[p.second.second][i], make_pair(p.second.second, i)));
              }
          }
      }

      vector<int> order;
      queue<int> q;
      q.push(0);
      visited.assign(adj.size(), false);
      while(!q.empty()){
          int u = q.front();
          q.pop();
          if(visited[u]) continue;
          visited[u] = true;
          order.push_back(u);
          for(int v : nodes[u].neighbours){
              if(!visited[v]){
                  q.push(v);
              }
          }
      }
      return order;
}

int EMSCRIPTEN_KEEPALIVE add(int x, int y) {
    return x + y;
}


EMSCRIPTEN_BINDINGS(tsp_module) {
    emscripten::register_vector<int>("IntList");
    emscripten::register_vector<double>("DoubleList");
    emscripten::register_vector<vector<double>>("DoubleListList");
    emscripten::function("Solve", &Solve);
    emscripten::function("add", &add);
}
