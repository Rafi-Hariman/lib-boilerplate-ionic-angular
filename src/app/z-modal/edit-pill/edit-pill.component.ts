import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Obat } from '../../z-model/obat';
import { ApiFirebaseService } from '../../z-service/firebase/api-firebase.service';
import { ToastService } from '../../z-service/html/toast.service';

@Component({
  selector: 'app-edit-pill',
  templateUrl: './edit-pill.component.html',
  styleUrls: ['./edit-pill.component.scss'],
})
export class EditPillComponent implements OnInit {
  @Input() selectedObat: any;
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
    private toastService: ToastService
  ) {
    this.obatForm = this.fb.group({
      nama: [this.selectedObat?.nama || ''],
      jenis: [this.selectedObat?.jenis || ''],
      deskripsi: [this.selectedObat?.deskripsi || ''],
      dosis_obat: [this.selectedObat?.dosis_obat || ''],
      aturan_minum: [this.selectedObat?.aturan_minum || ''],
      frekuensi_minum: [this.selectedObat?.frekuensi_minum || ''],
      file: [this.selectedObat?.file || ''],
    });
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.obatForm = this.fb.group({
      nama: [this.selectedObat?.nama || ''],
      jenis: [this.selectedObat?.jenis || ''],
      deskripsi: [this.selectedObat?.deskripsi || ''],
      dosis_obat: [this.selectedObat?.dosis_obat || ''],
      aturan_minum: [this.selectedObat?.aturan_minum || ''],
      frekuensi_minum: [this.selectedObat?.frekuensi_minum || ''],
      file: [this.selectedObat?.file || ''],
    });
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
    this.obatService.update(this.selectedObat.id, obat).then(() => {
      this.toastService.presentToast('Obat berhasil diupdate!', 'success', 'top', 1000);
      this.onClickCancel();
    });
  }
}
