function getNeighbors(row, col, matrix) {
  let neighbors = new Array();
  for (let i = Math.max(0, row - 1); i <= Math.min(row + 1, matrix.length - 1); i++) {
    for (let j = Math.max(0, col - 1); j <= Math.min(col + 1, matrix[0].length - 1); j++) {
      if (i === row && j === col) continue;
      else if (matrix[i][j] === 1) neighbors.push([i, j])
    }
  }
  return neighbors;
}

function countIslands(matrix) {

  // Create a visited set to store visited nodes
  let visited = new Set();
  // Initialize count to 0
  let count = 0;
  // Iterate through all indices in matrix
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      // If an index contains a 1 and has not been visited, 
      if (matrix[row][col] === 1 && !visited.has([row, col].toString())) {
        // increment island count and start traversing neighbors
        count++;
        // Initialize a stack with current index
        let stack = [[row, col]];
        // Add stringified version of current index to the visited set
        visited.add(stack[stack.length - 1].toString());
        // While stack contains elements
        while (stack.length) {
          // Pop element from stack
          let currNode = stack.pop();
          // Get valid neighbors of current element
          let neighbors = getNeighbors(currNode[0], currNode[1], matrix);
          // Iterate over neigbors
          neighbors.forEach(neighbor => {
            // If neighbor has not been visited
            if (!visited.has([neighbor[0], neighbor[1]].toString())) {
              // Add neighbor to stack
              stack.push(neighbor);
              // Mark neighbor as visited
              visited.add(neighbor.toString());
            }
          })
        }
      }
    }

  }
  // Return island count
  return count;
}

// Uncomment the lines below for local testing
const matrix = [
                [1,1,1,0,0],
                [0,1,1,0,1],
                [0,1,1,0,1]
              ]

console.log(getNeighbors(1, 1, matrix)); 
// [[0, 0], [0, 1], [0, 2], [1, 2], [2, 1], [2, 2]]
console.log(getNeighbors(2,4, matrix)) 
// [[1,4]]

const matrix2 = [
                    [1,1,1,0,1],
                    [0,0,0,0,1],
                    [1,0,0,1,0],
                ]

console.log(countIslands(matrix)) // 2
console.log(countIslands(matrix2)); // 3

module.exports = [countIslands, getNeighbors];