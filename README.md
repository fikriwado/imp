# Proyek: Laravel API + Next.js App

## Ringkasan

Proyek ini terdiri dari dua bagian utama:

- Laravel API – Backend untuk mengelola data post dan user.
- Next.js App – Frontend yang menggunakan API Laravel untuk menampilkan, membuat, memperbarui, dan melihat detail post.

### Laravel (API)

- git clone <repo-url>
- composer install
- cp .env.example .env
- php artisan key:generate
- Update .env sesuai konfigurasi database
- php artisan migrate --seed
- php artisan serve

#### File Explaining

- Project berasal dari route `api`
- Kemudian di handle oleh `Controller`
- Dari `Controller` saya menggunakan `Service` untuk handle bisnis logic
- `Service` akan berinteraksi dengan `Model`
- Saya membuat `Traits` dan `Helpers` custom untuk reusable code

### NextJs (APP)

- git clone <repo-url>
- npm i
- npm run build
- npm run dev

#### File Explaining

- Project menggunakan App Router
- Saya menggunakan axios dengan config interceptors request yang sudah disesuaikan apabila ada token makan akan di set Authorization
- Saya juga menggunakan service yang mengimport axios sehingga handling by `endpoint` by `Service`
- Saya menggunakan fake middleware untuk `client side` dengan membungkusnya sebagai component dan dijadikan chindren.

## Docker

- docker compose up -d

Note: belum selesai karena waktu tidak cukup
