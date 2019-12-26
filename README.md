# Farmer 101

Trang web đơn giản để phân loại hoa quả (hiện giờ là 5 loại quả: cam, táo, nho, dứa và chuối).

## Mở đầu

Hướng dẫn để lưu project về máy và chạy trên máy local cho mục đích phát triển và thử nghiệm.

### Yêu cầu

- Windows 10
- Python3 (Cụ thể là project sử dụng python 3.7.6)
- pip
```
Link tải Python 3.7.6 (đã có pip): https://www.python.org/downloads/release/python-376/
```
- Git (tuỳ chọn)
```
Link tải git: https://git-scm.com/downloads
```
- Docker (tuỳ chọn)
```
Link tải docker for Windows: https://docs.docker.com/docker-for-windows/install/
```


### Cài đặt

Đầu tiên. chúng ta cần lưu repo project về máy:

* Nếu dùng git:
```
git clone https://github.com/nguyenthocongminh/farmer-101.git
```
* Nếu không dùng, tải link zip của project:
```
https://codeload.github.com/nguyenthocongminh/farmer-101/zip/master
```
Tiếp theo là quá trình cài đặt các package cần thiết và chạy (Nếu bạn không dùng docker)

* Cài đặt các package cần thiết cho repo bằng pip (các package đã có trong requirements.txt)
```
pip install -r requirements.txt
```
### Deploy trang web trên local
1. Nếu bạn không dùng docker

* Mở cmd trong thư mục chứa project, chạy câu lệnh sau để deploy trang local:
```
python load.py
```

2. Nếu bạn dùng docker
* Chạy các câu lệnh sau trong thư mục chứa project
```
docker build -t farmer-101 .
docker run -it -p 5000:5000 farmer-101
```

3. Thử làm người nông dân chăm chỉ
* Vào trang web và thử ngắm hệ thống phân loại hoa quả thôi: [local](http://127.0.0.1:5000)


## Tác giả
* **Nguyễn Thọ Công Minh** - [nguyenthocongminh](https://github.com/nguyenthocongminh)
* **Huỳnh Minh Dũng** - [cd2012hn](https://github.com/cd2012hn)

## Lời cảm ơn
* Cô Đỗ Thanh Hà, giáo viên môn Xử lý ảnh đã dạy chúng em những kiến thức cần thiết để thực hiện project này
* Anh Phạm Văn Thanh - [thanhphamvan](https://github.com/thanhphamvan) đã hỗ trợ chúng em deploy web bằng docker
