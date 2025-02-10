import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ApiFirebaseService } from '../../z-service/firebase/api-firebase.service';
import { ToastService } from '../../z-service/html/toast.service';
import { AuthService } from '../../z-service/auth/auth.service';

@Component({
  selector: 'app-modal-setnotif',
  templateUrl: './modal-setnotif.component.html',
  styleUrls: ['./modal-setnotif.component.css']
})
export class ModalSetnotifComponent implements OnInit {

  @Input() selectedObat: any;
  @Input() existingSchedule: any;
  isUpdate: boolean = false;

  scheduleList: string[] = [
    '1 Hari 5 Kali',
    '1 Hari 4 Kali',
    '1 Hari 3 Kali',
    '1 Hari 2 Kali',
    '1 Hari 1 Kali',
    '1 Minggu Sekali',
  ];

  notifForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private obatService: ApiFirebaseService,
    private toastService: ToastService,
    private authSvc: AuthService,
  ) {
    this.notifForm = this.fb.group({
      tanggal: [this.selectedObat?.tanggal || '', Validators.required],
      schedule: [this.selectedObat?.schedule || '', Validators.required],
      pesan_notif: [this.selectedObat?.pesan_notif || '', Validators.required],
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
    console.log('selectedObat', this.selectedObat);
    this.obatService.getAllUserNotificationData().subscribe(data => {
      data.find((notif: any) => {
        console.log('notif', notif);

      });
    });

    this.isUpdate = this.selectedObat.schedule ? true : false;
    this.authSvc.getUser().subscribe(user => {
      this.notifForm.get('user_displayName')?.setValue(user.displayName);
    });
    this.initForm();
  }

  initForm() {
    this.notifForm = this.fb.group({
      tanggal: [this.selectedObat?.tanggal || '', Validators.required],
      schedule: [this.selectedObat?.schedule || '', Validators.required],
      pesan_notif: [this.selectedObat?.pesan_notif || '', Validators.required],
    });
  }


  onClickCancel() {
    this.modalController.dismiss();
  }

  onSubmit() {
    if (this.notifForm.invalid) return;
    const formData = this.notifForm.value;
    if (this.isUpdate) {
      this.obatService.update(this.selectedObat.id, formData).then(() => {
        this.toastService.presentToast('Notifikasi berhasil diperbarui', 'success', 'top', 1000);
        this.modalController.dismiss({ updated: true });
      });
    }
    else {
      this.obatService.update(this.selectedObat.id, formData).then(() => {
        this.toastService.presentToast('Notifikasi berhasil ditambah', 'success', 'top', 1000);
        this.modalController.dismiss({ added: true });
      });
    }
  }

}
