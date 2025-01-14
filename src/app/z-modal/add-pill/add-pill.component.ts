import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Obat } from '../../z-model/obat';
import { ApiFirebaseService } from '../../z-service/firebase/api-firebase.service';
import { ToastService } from '../../z-service/html/toast.service';

@Component({
  selector: 'app-add-pill',
  templateUrl: './add-pill.component.html',
  styleUrls: ['./add-pill.component.scss']
})
export class AddPillComponent implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  selectedFile: File | null = null;
  previewUrl: string | null = null;
  clearImage = true;


  jenisObatList: string[] = [
    'All',
    'Analgesik',
    'Antibiotik',
    'Antidepresan',
    'Antihistamin',
    'Antipiretik',
    'Antiinflamasi',
    'Antiviral',
    'Diuretik',
    'Ekspektoran',
    'Laksatif',
    'Obat Jantung',
    'Obat Hipertensi',
    'Obat Diabetes',
    'Obat Gastrointestinal',
    'Obat Neurologis',
    'Obat Tambah Darah',
    'Obat Tidur',
    'Obat Tumor',
    'Obat Wasir',
    'Obat Mata',
    'Obat Kulit',
    'Obat Telinga',
    'Obat Hidung',
    'Obat Gigi',
    'Obat Kanker',
  ];

  dosisObatList: string[] = [
    '1 mg',
    '2 mg',
    '5 mg',
    '10 mg',
    '20 mg',
    '50 mg',
    '100 mg',
    '200 mg',
    '500 mg',
    '1 g',
    '2 g',
    '5 g',
    '10 g',
    '20 g',
    '50 g',
    '100 g',
    '200 g',
    '500 g',
    '1 ml',
    '2 ml',
    '5 ml',
    '10 ml',
    '20 ml',
    '50 ml',
    '100 ml',
    '200 ml',
    '500 ml',
    '1 L',
    '2 L',
    '5 L',
    '10 L',
  ];

  aturanMinumList: string[] = [
    'Sebelum Makan',
    'Sesudah Makan',
    'Saat Makan',
  ];

  frekuensiMinumList: string[] = [
    '1 kali sehari',
    '2 kali sehari',
    '3 kali sehari',
    '4 kali sehari',
    '5 kali sehari',
    '6 kali sehari',
    '1 Minggu sehari',
    'Setiap 6 jam',
    'Setiap 8 jam',
    'Setiap 12 jam',
    'Setiap 24 jam',
  ];

  obatForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private obatService: ApiFirebaseService,
    private toastService: ToastService,
  ) {
    this.obatForm = this.fb.group({
      nama: ['', Validators.required],
      jenis: ['', Validators.required],
      deskripsi: ['', Validators.required],
      file: ['', Validators.required],
      aturan_minum: ['', Validators.required],
      dosis_obat: ['', Validators.required],
      frekuensi_minum: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  onClickCancel() {
    this.modalController.dismiss();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.obatForm.patchValue({
          file: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onClearImage(): void {
    this.obatForm.patchValue({
      file: null,
    });
    const fileInput = document.querySelector('.file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onSubmit() {
    const obat: Obat = this.obatForm.value;
    this.obatService.create(obat).then(() => {
      this.toastService.presentToast('Obat berhasil ditambahkan', 'success', 'top', 1000);
      this.modalController.dismiss();
    });
  }

}

