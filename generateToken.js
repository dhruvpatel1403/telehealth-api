const jwt = require('jsonwebtoken');

const user = {
  _id: "64a1f3e9d4fabc0012345678", 
  role: "patient"
};

const token = jwt.sign(user, "X9d7fS8MvR1+5V9NLZyLkga+zRNTwCvGzP8fUFi+Yo0ThU4dU1plAbvn28q8X7eG+HdGZTTjvwc5YfCJSUwDtw==", {
  expiresIn: '1h'
});

console.log("Your test token:\n", token);
