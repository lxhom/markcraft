#! abc

const fs = require("fs");
const uuid = require("./uuid.min.js")

class Matrix {
  /**
   * @typedef {Array<Array<String>>} arrayMatrix
   */

  id = uuid.v4();
  toString = () => this.id;

  /**
   * @type arrayMatrix
   */
  matrix;

  /**
   * @type arrayMatrix
   */
  clickEvents;

  /**
   * @param {int} xMax
   * @param {int} yMax
   */
  constructor(xMax, yMax) {
    this.matrix = Array(xMax).fill(null).map(() =>
        Array(yMax).fill(null).map(() => "air")
    );
    this.clickEvents = Array(xMax).fill(null).map(() =>
        Array(yMax).fill(null).map(() => this.id)
    );
  }
  read = (x, y) => this.matrix[y][x];
  write = (x, y, block) => this.matrix[y][x] = block;
  clone = () => {
    let newMatrix = new Matrix(0, 0);
    newMatrix.matrix = this.matrix.map(row => Array.from(row));
    return newMatrix
  };
  getDimensions = () => [this.matrix[0].length, this.matrix.length]
  fill = (ax, ay, bx, by, block) => {
    if (ax > bx) { let i = bx; bx = ax; ax = i; }
    if (ay > by) { let i = by; by = ay; ay = i; }
    for (let i = ax; i <= bx; i++) {
      for (let j = ay; j <= by; j++) {
        this.write(i, j, block);
      }
    }
  };
  foreach = cb => {
    this.matrix.forEach((row, y) => {
      row.forEach((block, x) => cb(block, x, y))
    })
  }
  /**
   *
   * @type {null | function(Matrix)}
   */
  preRender = null;
  render = () => {
    if (this.preRender !== null) this.preRender(this);
    let matrix = Array.from(this.matrix).reverse()
    let output = "###### " + this.id + "\n";
    matrix.forEach(row => {
      output += row.map(block => `![${block}][${block}]`).join("")
      output += "<br>"
    });
    return output;
  };
}



let blocks = new Matrix(8, 8);

blocks.fill(0, 0, 5, 2, "dirt")
blocks.fill(7, 7, 4, 4, "dirt")

let grassify = matrix => {
  matrix.foreach((block, x, y) => {
    if (block !== "dirt") return;
    if (y + 1 >= matrix.getDimensions()[1]) return matrix.write(x, y, "grass");
    if (matrix.read(x, y + 1) === "air") matrix.write(x, y, "grass")
  })
}

blocks.preRender = grassify

blocks.write(1, 3, "steve-bottom")
blocks.write(1, 4, "steve-top")

let template = fs.readFileSync("mc-template.md").toString();

let result = template.replace(/\$content\$/, blocks.render);

fs.writeFileSync("mc.md", result);