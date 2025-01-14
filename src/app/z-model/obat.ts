export interface Obat {
  id?: string;
  key?: string;
  nama: string;
  jenis: string;
  deskripsi: string;
  file: string;
  aturan_minum: string;
  dosis_obat: string;
  frekuensi_minum: string;
  schedule: string;
  pesan_notif: string;
  tanggal: string;
  displayName?: string;
  email?: string;
}
