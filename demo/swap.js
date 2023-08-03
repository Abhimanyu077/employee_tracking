function swap(a, b) {
  a = a + b;
  b = a - b;
  a = a - b;
  return [a, b];
}
let x = 10;
let y = 20;

console.log("Before swap:");
console.log("x =", x); // Output: x = 10
console.log("y =", y); // Output: y = 20

[x, y] = swap(x, y);

console.log("After swap:");
console.log("x =", x); // Output: x = 20
console.log("y =", y); // Output: y = 10
