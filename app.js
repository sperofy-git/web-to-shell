const express = require('express');
var bodyParser = require('body-parser')
const app = express();
  
var urlencodedParser = bodyParser.urlencoded({ extended: false })
    
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
    
app.post('/', urlencodedParser, (req, res) => {
    console.log('Got body:', req.body);
    const first_name = req.body.first_name;   
    const last_name = req.body.last_name;
    const param = first_name + ' ' + last_name;
    console.log(param);
    calling_shell(param);
    res.sendStatus(200);
});


app.listen(3000);

function calling_shell(p) {
const { exec } = require("child_process");
var cmd="./shell.sh "+ p;
console.log(cmd);
exec(cmd, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});
}
