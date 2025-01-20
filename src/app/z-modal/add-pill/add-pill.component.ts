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
    'Tablet Tambah Darah',
  ];

  dosisObatList: string[] = [
    '60 mg'
  ];

  aturanMinumList: string[] = [
    'Sesudah Makan',
  ];

  frekuensiMinumList: string[] = [
    '1 Minggu sekali',
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

