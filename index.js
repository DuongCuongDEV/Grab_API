const express = require('express'); //import vào thư viện express
const { json } = require('express/lib/response');
const mysql = require('mysql2');

const bodyParser = require('body-parser');

//tạo kết nối với database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Grab',
    password: ''
});


const app = express() //Tạo một ứng dụng web dùng thư viện express
const port = 3000 //Tạo một biến (cổng) 3000


//Để đọc dạng json người dùng nhập vào
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


//Tạo api có phương thức là GET và trả về màn hình
app.get('/', (req, res) => {
    res.send('<h1 style = "color = red">Xin chao duong van cuong<h1>') //Trả về
})

//API lấy về các tỉnh
app.get('/tinh', (req, res) => {
    connection.connect(() => {
        connection.query("SELECT * FROM tinh", (err, ketQuaTinh) => {
            res.send(ketQuaTinh)
        })
    })
})

//API lấy các huyện của một tỉnh nào đấy
app.get('/huyen/', (req, res) => {
    connection.connect(() => {
        connection.query("SELECT * FROM huyen where ma_tinh = (?)", [
            [req.body.maTinh]
        ], (err, ketquahuyen) => {
            res.send(ketquahuyen)
        })
    })
})

//API lấy các xã của một huyện nào đấy
app.get('/xa/', (req, res) => {
    connection.connect(() => {
        connection.query("SELECT * FROM xa where ma_huyen = (?)", [
            [req.body.maHuyen]
        ], (err, ketquaxa) => {
            res.send(ketquaxa)
        })
    })
})

//API check xem số điện thoại đấy tồn tại chưa
app.get('/checkPhoneNumber', (req, res) => {
    connection.connect(() => {
        connection.query("SELECT * FROM thong_tin_tai_khoan where tenDangNhap = (?)", [
            [req.body.tenDangNhap]
        ], (err, thongtintaikhoan) => {
            res.send(thongtintaikhoan)
        })
    })
})

//API lấy thông tin người dùng qua thông tin tài khoản
app.get('/thongTinNguoiDung', (req, res) => {
    connection.connect(() => {
        connection.query("SELECT * FROM thong_tin_nguoi_dung where ma_nguoi_dung = (?)", [
            [req.body.maNguoiDung]
        ], (err, thongtinnguoidung) => {
            res.send(thongtinnguoidung)
        })
    })
})



//API thêm tỉnh
app.post('/tinh', (req, res) => {
    connection.connect(() => {
        connection.query("INSERT INTO tinh (ma_tinh, ten_tinh) VALUES (?)", [
            [req.body.maTinh, req.body.tenTinh]
        ], (err) => {
            res.send("Them thanh cong")
        })
    })
})




//Mở một cổng 3000 để chạy
app.listen(port, () => {
    console.log(`Ban dang o cong: ${port}`)
})