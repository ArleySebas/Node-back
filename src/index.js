//Index inicia el servidor
require('dotenv').config();

const app = require('./server');
require('./database');



app.listen(app.get('port'), () => {
    console.log('puerto', app.get('port'));
})