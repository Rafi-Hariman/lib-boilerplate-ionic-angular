# Ionic Angular Boilerplate

## Deskripsi Proyek

Ini adalah boilerplate front-end yang menggabungkan dua Progressive Web Apps (PWA) serta satu Server-Side Rendering (SSR). Dibangun dengan Ionic 8 dan Angular 18, proyek ini dirancang untuk memberikan performa tinggi dan pengalaman pengguna yang mulus pada perangkat desktop dan mobile menggunakan template tabs.

## Fitur Utama

- **Ionic PWA**: Menggunakan `@ionic/pwa-elements` untuk menyediakan akses mudah dan cepat ke fitur native dari perangkat seperti kamera
- **Angular PWA Service Worker**: Optimalisasi kinerja aplikasi melalui service worker dengan caching cerdas dan akses offline.
- **Angular Universal SSR**: Menyediakan server-side rendering untuk meningkatkan SEO, waktu pemuatan yang lebih cepat, dan pengalaman pengguna yang lebih baik.

## Teknologi

- **Ionic 8**: Framework UI yang fleksibel untuk aplikasi mobile dan desktop.
- **Angular 18**: Platform populer untuk membangun aplikasi web menggunakan TypeScript.
- **Server-Side Rendering**: Menggunakan Angular Universal untuk rendering konten di server.

## Template

- **Tabs Template**: Tata letak berbasis tab untuk navigasi yang mudah dan terstruktur.

## Skrip yang Tersedia

Berikut adalah skrip untuk membangun dan menjalankan aplikasi Anda:

- `start`: Jalankan aplikasi di mode pengembangan.
- `build`: Bangun proyek untuk produksi.
- `watch`: Bangun proyek dengan mode pengawas untuk pengembangan.
- `test`: Jalankan pengujian untuk aplikasi.
- `lint`: Analisis kode untuk memastikan kualitas kodenya.
- `dev:ssr`: Jalankan aplikasi dengan server-side rendering dalam mode pengembangan.
- `serve:ssr`: Mulai server untuk rendering sisi server.
- `build:ssr`: Bangun proyek untuk SSR.
- `prerender`: Jalankan prarendering untuk halaman.

## Pengembangan dan Build

1. **Instal Dependensi**:
   ```bash
   npm install
   ```

2. **Jalankan Aplikasi**:
   - Untuk pengembangan:
     ```bash
     npm start
     ```
   - Untuk server-side rendering:
     ```bash
     npm run serve:ssr
     ```

3. **Bangun untuk Produksi**:
   ```bash
   npm run build
   ```

4. **Server-Side Rendering Build**:
   ```bash
   npm run build:ssr
   ```

Enjoy aplikasi performa tinggi dan kapabilitas canggih untuk menjangkau pengguna di berbagai platform.

--- 