import axios from "axios";

export const fetchSquares = (x1, y1, x2, y2) => {
  return async () => {
    let grid = {}
    const result = await axios.get('/api/square/area/' + x1 + '/' + y1 + '/' + x2 + '/' + y2)
    // make a grid
    result.data.forEach((cel) => {
      if (!grid[cel.xc]) {
        grid[cel.xc] = {}
        grid[cel.xc][cel.yc] = cel
      }
    })
    return grid
  }
}