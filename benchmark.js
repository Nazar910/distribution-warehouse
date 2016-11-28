var siege = require('siege');
siege().on(8080).for(1000).times.get('/products').attack();