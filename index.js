const express = require('express');

const app = express();
const port = 4000


app.get('/', (req, res) => {
    res.send('This is home page')
})
app.post('/', (req, res)=>{
    res.send('This is home page with post request')
})

app.listen(port, () => {
    console.log('Listening on port ' + port);
})