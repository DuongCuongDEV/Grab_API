//b1:import vao thu vien express
const express = require('express')
    //b1 import thu vien msql2
const mysql2 = require('mysql2')

//lien quan den insert into
const bodyParser = require('body-parser');

//B2:tao ra ung dung web su dung thu vien express
const app = express()

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
//


//b3: tao ra cong 3000
const port = 3000

//b2 tao databbase
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Grab'
});





//b4: tao api phuong thuc GET: localhost:3000
app.get('/', (req, res) => {
    res.send('<h1>Xin chao ban</h1>')
})

app.get('/tinh', (req, res) => {
    connection.connect(() => {
        connection.query("SELECT * FROM tinh", (err, ketQuaTinh) => {
            res.send(ketQuaTinh)
        })
    })
})

app.post('/tinh', (req, res) => {
    connection.connect(() => {
        connection.query("INSERT INTO tinh (ma_tinh, ten_tinh) VALUES (?)", [
            [req.body.ma_tinh, req.body.ten_tinh]
        ], (err) => {
            console.log(err)
            res.send("Them thanh cong")
        })
    })
})

//dat chuyen
// 1: lay ra phuong thuc thanh toan cua nguoi dang nhap vao tai khoan
app.get('/phuongthucthanhtoan', (req, res) => {
    connection.connect(() => {
        connection.query("SELECT * FROM phuong_thuc_thanh_toan", (err, ketQua) => {
            res.send(ketQua);
        })
    })
})

//api danh sach uu dai
app.get('/uudai', (req, res) => {
    connection.connect(() => {
        connection.query("SELECT * FROM uu_dai", (err, ketQua) => {
            res.send(ketQua);
        })
    })
})

//danh sach dia diem
app.get('/danhsachdiadiem', (req, res) => {
    connection.connect(() => {
        connection.query("SELECT ten_xa, ten_huyen, ten_tinh FROM xa INNER JOIN huyen ON xa.ma_huyen = huyen.ma_huyen INNER JOIN tinh ON huyen.ma_tinh = tinh.ma_tinh", (err, ketQua) => {
            res.send(ketQua);
        })
    })
})


//tim kiem dia chi
app.get("/timkiem/:key", function(req, res) {
    let key = req.params.key;
    console.log("key day: " + key)
    connection.connect(() => {
        if (!key) {
            res.send("Khong co gia tri")
        }
        connection.query("SELECT ten_xa, ten_huyen, ten_tinh FROM xa INNER JOIN huyen ON xa.ma_huyen = huyen.ma_huyen INNER JOIN tinh ON huyen.ma_tinh = tinh.ma_tinh WHERE ten_xa LIKE (?) ", [
            ['%' + key + '%']
        ], (err, kq) => {
            console.log(err)
            res.send(kq)
        })
    })
})

// tim kiem uu dai 
app.get('/timkiemuudai/:key', (req, res) => {
    let key = req.params.key
    console.log("key: " + key)
    connection.connect(() => {
        if (!key) {
            res.send("Khong co gia tri tra ve")
        }
        connection.query("SELECT * FROM uu_dai WHERE ten_uu_dai LIKE (?) ", [
            ['%' + key + '%']
        ], (err, kq) => {
            console.log(err)
            res.send(kq)
        })
    })
})

//api dat chuyen
app.post('/datchuyen', (req, res) => {

})

//b5: mo cong 3000 va start sever day
app.listen(port, () => {
    console.log(`Dang chay cong: ${port}`)
})