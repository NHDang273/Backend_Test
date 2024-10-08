CREATE DATABASE QuanLyTramXang;

USE QuanLyTramXang;

-- Bảng Trạm Xăng
CREATE TABLE TramXang (
    MaTram INT PRIMARY KEY IDENTITY(1,1),
    TenTram VARCHAR(255) NOT NULL,
    ViTri VARCHAR(255) NOT NULL,
    SoDienThoai VARCHAR(20) NOT NULL
);

-- Bảng Hàng Hoá
CREATE TABLE HangHoa (
    MaHang INT PRIMARY KEY IDENTITY(1,1),
    TenHang VARCHAR(255) NOT NULL,
    DonGia DECIMAL(10, 2) NOT NULL
);

-- Bảng Trụ Bơm
CREATE TABLE TruBom (
    MaTru INT PRIMARY KEY IDENTITY(1,1),
    MaTram INT,
    MaHang INT,
    FOREIGN KEY (MaTram) REFERENCES TramXang(MaTram),
    FOREIGN KEY (MaHang) REFERENCES HangHoa(MaHang)
);

-- Bảng Giao Dịch
CREATE TABLE GiaoDich (
    MaGiaoDich INT PRIMARY KEY IDENTITY(1,1),
    MaTram INT,
    MaTru INT,
    MaHang INT,
    NgayGio DATETIME NOT NULL,
    SoLuong DECIMAL(10, 2) NOT NULL,
    TongTien DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (MaTram) REFERENCES TramXang(MaTram),
    FOREIGN KEY (MaTru) REFERENCES TruBom(MaTru),
    FOREIGN KEY (MaHang) REFERENCES HangHoa(MaHang) 
);