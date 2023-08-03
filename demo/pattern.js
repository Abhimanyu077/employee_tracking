// function printStarPattern(rows) {
//   for (let i = 1; i <= rows; i++) {
//     let stars = "";
//     let spaces = "";

//     for (let j = 1; j <= rows - i; j++) {
//       spaces += " ";
//     }

//     for (let k = 1; k <= 2 * i - 1; k++) {
//       stars += "*";
//     }

//     console.log(spaces + stars);
//   }
// }

// // Example usage
// const rows = 5;
// printStarPattern(rows);

function printStarPattern(rows) {
  for (let i = 1; i <= rows; i++) {
    let pattern = "";

    for (let j = 1; j <= i; j++) {
      pattern += "*";
    }

    console.log(pattern);
  }
}

// Example usage
const rows = 5;
printStarPattern(rows);
