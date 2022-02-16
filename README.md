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

### Payment (Pembayaran)
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

