const express = require('express'); //import vào thư viện express
const { json } = require('express/lib/response');
const mysql = require('mysql2');

const bodyParser = require('body-parser');

//tạo kết nối với database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Grab',
    password: '0969691630'
});


const app = express() //Tạo một ứng dụng web dùng thư viện express
const port = 3000 //Tạo một biến (cổng) 3000


//Để đọc dạng json người dùng nhập vào
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Tạo api có phương thức là GET và trả về màn hình
app.get('/', (req, res) => {
    res.send('<h1 style = "color = red">Xin chao duong van cuong<h1>') //Trả về
})

//API lấy về các tỉnh
app.get('/conscious', (req, res) => {
    connection.connect(() => {
        connection.query("SELECT * FROM tinh", (err, ketQuaTinh) => {
            res.send(ketQuaTinh)
        })
    })
})

//API lấy các huyện của một tỉnh nào đấy
app.get('/district', (req, res) => {
    connection.connect(() => {
        connection.query("SELECT * FROM huyen where ma_tinh = (?)", [
            [req.body.maTinh]
        ], (err, ketquahuyen) => {
            res.send(ketquahuyen)
        })
    })
})


//API lấy các xã của một huyện nào đấy
app.get('/commune', (req, res) => {
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
app.get('/userInformation', (req, res) => {
    connection.connect(() => {
        connection.query("SELECT * FROM thong_tin_nguoi_dung where ma_nguoi_dung = (?)", [
            [req.body.maNguoiDung]
        ], (err, thongtinnguoidung) => {
            res.send(thongtinnguoidung)
        })
    })
})

//API tạo tài khoản cho người dùng
app.post('/creatAccount', (req, res) => {
    connection.connect(() => {

        //API tạo thông tin người dùng
        connection.query("INSERT INTO `thong_tin_nguoi_dung` (`ho_va_ten`, `anh_dai_dien`, `sdt1`, `sdt2`, `email`, `ma_gioi_tinh`, `ngay_sinh`, `dia_chi_chi_tiet`, `ma_xa`) VALUES (?)", [
            [req.body.hoVaTen, req.body.anhDaiDien, req.body.sdt1, req.body.sdt2, req.body.email, req.body.maGioiTinh, req.body.ngaySinh, req.body.diaChiChiTiet, req.body.maXa]
        ], (err) => {
            res.send("Thêm thành công")
        })

        //API tạo thông tin tài khoản
        connection.query("INSERT INTO `thong_tin_tai_Khoan` (`maNguoiDung`, `maQuyenNguoiDung`, `ngayTao`, `ngayCapNhatCuoi`, `bienSoXe`, `ma_trang_thai`, `maNguoiTao`, `tenDangNhap`, `matKhau`) VALUES (?)", [
            [req.body.maNguoiDung, req.body.maQuyenNguoiDung, req.body.ngayTao, req.body.ngayCapNhatCuoi, req.body.bienSoXe, req.body.ma_trang_thai, req.body.maNguoiTao, req.body.tenDangNhap, req.body.matKhau]
        ], (err) => {
            res.send("Thêm thành công")
        })
    })
})

//API tạo thông tin tài khoản phần đăng nhập
app.get('/thongTinTaiKhoan', (req, res) => {
        connection.connect(() => {
            connection.query("SELECT * FROM thong_tin_tai_khoan WHERE tenDangNhap  = (?) AND matKhau = (?) ", [req.body.tenDangNhap, req.body.matKhau], (err) => {
                res.send("Đăng nhập thành công")
            })
        })
    })
    //API tạo mật khẩu mới
app.put('/doiMatKhau', (req, res) => {
    connection.connect(() => {
        connection.query("UPDATE thong_tin_tai_khoan SET matKhau = ? WHERE matKhau = (?) AND tenDangNhap = (?)", [req.body.matKhauMoi, req.body.matKhauCu, req.body.tenDangNhap], (err) => {
            res.send("Thay đổi mật khẩu thành công")
        })
    })
})



//Mở một cổng 3000 để chạy
app.listen(port, () => {
    console.log(`Ban dang o cong: ${port}`)
})