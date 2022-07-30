const http = require('http');
const app = require('./src/server');
const server = http.createServer(app);
const { connectDB } = require('./src/db/dbConnect');

// connect db
connectDB();

// Server running
const PORT = process.env.PORT
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});