const mongoose = require('mongoose');

const { LSC_APP_MONGODB_HOST } = process.env;

const MONGODB_URI = LSC_APP_MONGODB_HOST;

(async () => {
    try {
        const db = await mongoose.connect(MONGODB_URI) 
        console.log('DB is connected to', db.connection.name)
    } catch(error) {
        console.error(error);
    }
})();

