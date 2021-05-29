const express = require('express'),
      path = require('path'),
      fs = require('fs');

const app = express();

// SETTINGS
app.set('appName','Fechas Patrias')
app.set('port', 3000)

// ROUTES
app.get('/', (req, res) => {
    res.sendFile(path.join( __dirname, 'public/views/home.html'))
})

//Puse fechas pero podría ser cualquier cosa
app.get('/fechas', (req, res) => {
    res.sendFile(path.join( __dirname, 'data/fechas.json'))
})

// Para q me reconozca mis estáticos
app.use(express.static('public'))

app.listen(app.get('port'), (req, res) => {
    console.log("Servidor levantado en http://127.0.0.1:%d",app.get('port'));
} )