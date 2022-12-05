const express = require('express') 
var mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express() 

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const port = 3000

app.get('/',(req, res) => {
    res.send('Hello World')
})

app.post('/account/signup', (req, res) => {
    res.json({
        "message": "Tạo tài khoản thành công",
        "isSuccess": true
    })
})


const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Grab'
});
 
  
app.get('/tinh', (req, res) =>{
    dbConnection.connect(() => {
        dbConnection.query("SELECT * FROM tinh", (err, ketQuaTinh) => {
          res.send(ketQuaTinh)
        })
      }) 
})

app.post('/tinh', (req, res) => {
    dbConnection.connect(() => {
        dbConnection.query("INSERT INTO tinh (ma_tinh, ten_tinh) VALUES (?)", [[req.body.maTinh, req.body.tenTinh]], (err) => {
            res.send("Them du lieu thanh cong")
        })
    })
})

app.listen(port,() => {
    console.log('Server backend dang chay o cong 3000')
})