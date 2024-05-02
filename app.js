const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000; // Set your preferred port number

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
