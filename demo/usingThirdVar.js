function swapWithThirdVariable(a, b) {
  let temp = a;
  a = b;
  b = temp;
  return [a, b];
}

let x = 10;
let y = 20;

console.log("Before swap:");
console.log("x =", x); // Output: x = 10
console.log("y =", y); // Output: y = 20

[x, y] = swapWithThirdVariable(x, y);

console.log("After swap:");
console.log("x =", x); // Output: x = 20
console.log("y =", y); // Output: y = 10
