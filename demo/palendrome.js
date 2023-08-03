function isPalindromeNumber(number) {
  // Store the original number in a separate variable

  let originalNumber = number;
  let reversedNumber = 0;
  while (number > 0) {
    // Extract the last digit of the number
    const lastDigit = number % 10;
    // Build the reversed number
    reversedNumber = reversedNumber * 10 + lastDigit;
    // Remove the last digit from the original number
    number = Math.floor(number / 10);
  }
  // Check if the original number is equal to the reversed number
  return originalNumber === reversedNumber;
}

console.log(isPalindromeNumber(12321)); // Output: true
console.log(isPalindromeNumber(12345)); // Output: false
console.log(isPalindromeNumber(1001)); // Output: true
