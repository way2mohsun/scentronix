const express = require('express');
const app = express();
const port = 3004;

app.get('/', (req, res) => {
    res.status(300).json(`failure response from ${port}`);
    // setTimeout(function () {
    //     res.status(200).json(`success response from ${port}`);
    // }, 6000);
})

app.listen(port, () => {
    console.log(`Application is listening at http://localhost:${port}`)
})