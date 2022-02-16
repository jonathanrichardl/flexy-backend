# flexy-backend
Link Postman : https://www.getpostman.com/collections/a0d00a9a5199ec64e1ff
Database : Mysql 

## Inisiasi 
### Database
Jalankan Query init.sql di ./init.sql pada mysql. Lalu di kode flexy-backend/main.js, gantikan konfigurasi DBnya sesuai yang telah diinstal, di potongan kode line 5:
```
let sql = new database.mySqlConnector(link, username, password, namadb )
```

## API
### Login
POST /login
#### Payload
```
{
    "username" : "Alvin",
    "password" : "ReactJS"
}
```
Backend akan otomatis memasang session id pada cookie, sehingga FE tidak perlu melakukan apa apa, hanya perlu dijaga cookienya agar tidak hilang.

### New User
POST /newuser
#### Payload
```
{
    "username": "Alvin",
    "password":"ReactJS"
}
```
Lalu user Alvin akan dibuat dan disimpan di DB sehingga alvin bisa login.

### Get Profile Data
GET /profile
#### Payload
Tidak perlu payload, data user diambil dari cookie
#### Response 
```
{
    "msg": "Profile Retrieved",
    "payload": [
        {
            "user_id": "9c5ee8bf-7b6f-4fc1-b0e3-3d4fc8e6e28b",
            "username": "Alvin",
            "wallet": 1000000
        }
    ]
}
```
Ket: Wallet adalah nilai nominal saldo yang dimiliki alvin 

### Melihat Sertifikasi User
GET /profile/certificates
#### Response
```
{
    "msg": "Certificates Retrieved",
    "payload": [
        {
            "course_name": "Intermediate Investment"
        },
        {
            "course_name": "Investment for Beginners"
        },
    ]
}
```
### Payment (Pembayaran)
POST /transaction
API untuk membayar, nominal pembayaran akan dikurangi dari saldo user
#### Payload
```
{
    "amount" : 1000000
}
```

#### Response
Apabila dompet Alvin tidak cukup saldonya
```
{
    "msg": "User has not enough money in wallet",
    "payload": null
}
```
Apabila Berhasil
```
{
    "msg": "Transaction Succesful",
    "payload": {
        "user_id": "9c5ee8bf-7b6f-4fc1-b0e3-3d4fc8e6e28b",
        "username": "Alvin",
        "wallet": 2000000
    }
}
```
Ket: Wallet artinya nilai saldo sisa setelah transaksi

### Topup Saldo
POST /topup
API untuk topup saldo
#### Payload
```
{
    "amount" : 1000000
}
```
#### Response
```
{
    "msg": "TopUp Succesful",
    "payload": {
        "user_id": "9c5ee8bf-7b6f-4fc1-b0e3-3d4fc8e6e28b",
        "username": "Alvin",
        "wallet": 3000000
    }
}
```

### Fetching daftar kursus yang tersedia
GET /courses
#### Payload
tidak ada
#### Response
```
{
    "msg": "TopUp Succesful",
    "payload": {[
    {
        "course_id": "9c5ee8bf-7b6f-4fc1-b0e3-3d4fc8e6e28b",
        "course_name": "Investing Intermediate",
        "course_thumbnail" : {
            "type" : "Buffer",
            "data" : BASE64 ENCODING DARI FOTO THUMBNAIL
        },
        "total_modules" : 1
     }]
    }
}
```
Keterangan: course_thumbnail dikarenakan merupakan gambar, maka disimpan dalam database dalam bentuk basse64, untuk FE, segera gunakan library base64 decode untuk didecode kedalam gambar.

### Upload Kursus Baru (TIDAK DIREKOMENDASI)
POST /courses
#### Payload
```
{
    "course_name": "Investing Intermediate",
    "course_thumbnail" : BASE64 ENCODING DARI THUMBNAIL
    "modules" : [
        {
            "text" : ISI TEKS DARI MODUL YANG AKAN DIBACA
            "audio" : BASE64 ENCODING DARI AUDIOBOOK
        }
    ]
}
```
Dikarenakan saat gw uji coba, server nodejs kewalahan menerima request course_thumbnail dan audio yang sangat besar (>1mb), maka API ini tidak disarankan untuk digunakan, untuk menambah Course Baru, gunakan python script yang gw sediakan : https://github.com/jonathanrichardl/upload-new-course

### Retrieve detail kursus
GET /course?id={idkursus}
API untuk mendapatkan detail kursus : modul modul teks dan audiobook
#### Response
```
{
    "course_id" : "9c5ee8bf-7b6f-4fc1-b0e3-3d4fc8e6e28b"
    "course_name": "Investing Intermediate",
    "course_thumbnail" : {
            "type" : "Buffer",
            "data" : BASE64 ENCODING DARI FOTO THUMBNAIL
        },
    "modules" : [
        {
            "text" : ISI TEKS DARI MODUL 1 YANG AKAN DIBACA
            "audio" : {
                "type" : "Buffer",
                "data" : BASE64 ENCODING DARI AUDIOBOOK
            }
        }, 
        {
            "text" : ISI TEKS DARI MODUL 2 YANG AKAN DIBACA
            "audio" : {
                "type" : "Buffer",
                "data" : BASE64 ENCODING DARI AUDIOBOOK
            }
        }
    ]
}
```
Harap FE untuk mendecode gambar thumbnail menggunakan base64 decode kembali kedalam bentuk gambar dan mendecode audiobook juga menggunakan base64 decode menuju file suara (.mp3)

### Kursus selesai dilaksanakan
POST /coursedone
Apabila User sudah menyelesaikan kursus, silahkan lakukan POsT request ini untuk disimpan sertifikatnya dalam database 
#### Request
```
{
    "course_id" : "449b999e-c0c7-4c21-bf27-3fa214a2e2e3"
}
```

