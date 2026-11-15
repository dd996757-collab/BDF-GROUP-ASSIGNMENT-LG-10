// =====================================================================
// MEMBER 1 - Server Setup and Express Routes
// Sets up the Express server, mounts the route files and error handling.
// =====================================================================
const express = require('express');
require('./db/database'); // (Member 2) creates tables + sample data on startup

const residentRoutes = require('./routes/residentRoutes');
const roomRoutes = require('./routes/roomRoutes');
const allotmentRoutes = require('./routes/allotmentRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'HostelHub API is running',
    routes: ['/residents', '/rooms', '/allotments'],
  });
});

app.use('/residents', residentRoutes);
app.use('/rooms', roomRoutes);
app.use('/allotments', allotmentRoutes);

app.use(notFound);
app.use(errorHandler);

if (require.main === module) {
  app.listen(PORT, () => console.log(`HostelHub running at http://localhost:${PORT}`));
}

module.exports = app;
