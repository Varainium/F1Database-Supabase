const express = require('express');
const app = express();

// Import routers
const circuits = require('./circuitsServices');
const races = require('./raceServices');
const drivers = require('./driverServices');
const constructors = require('./constructorServices');

// Mount routers
app.use(circuits);
app.use(races);
app.use(drivers);
app.use(constructors);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
