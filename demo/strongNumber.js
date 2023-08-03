function isStrongNumber(number) {
  // Function to calculate the factorial of a number
  function factorial(num) {
    let result = 1;
    for (let i = 2; i <= num; i++) {
      result *= i;
    }
    return result;
  }

  let originalNumber = number;
  let sumOfFactorials = 0;

  while (number > 0) {
    // Extract the last digit of the number
    const lastDigit = number % 10;

    // Calculate the factorial of the last digit and add it to the sum
    sumOfFactorials += factorial(lastDigit);

    // Remove the last digit from the original number
    number = Math.floor(number / 10);
  }

  // Check if the sum of factorials is equal to the original number
  return originalNumber === sumOfFactorials;
}

console.log(isStrongNumber(145)); // Output: true (1! + 4! + 5! = 1 + 24 + 120 = 145)
console.log(isStrongNumber(123)); // Output: false (1! + 2! + 3! = 1 + 2 + 6 = 9, which is not equal to 123)
