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
      console.log('Selected Obat:', this.selectedObat);
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
