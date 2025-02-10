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

  response: {
    label: string;
    question: string;
    value: any;
    questionIndex: any;
    kelas: any;
  }[];
}

export interface NotificationsDataFromUser {
  id?: string;
  key?: string;
  nama_obat: string;
  jenis: string;
  deskripsi: string;
  file: string;
  aturan_minum: string;
  dosis_obat: string;
  frekuensi_minum: string;
  schedule: string;
  pesan_notif: string;
  tanggal: string;
  user_displayName?: string;
  user_email?: string;
}

export interface ObatResponse {
  responses: {
    label: string;
    nama: string;
    question: string;
    value: any;
    questionIndex: any;
    displayName?: string;
    kelas: any;
    email?: string;
  }[]
}


export interface KuisionerExcel {
  id?: string;
  responses: {
    label: string;
    nama: string;
    question: string;
    value: any;
    questionIndex: any;
    displayName?: string;
    kelas: any;
    email?: string;
  }[]
}
