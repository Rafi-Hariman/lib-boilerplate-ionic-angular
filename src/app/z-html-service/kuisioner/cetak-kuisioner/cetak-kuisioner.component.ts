import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiFirebaseService } from '../../../z-service/firebase/api-firebase.service';
import { ToastService } from '../../../z-service/html/toast.service';
import { AuthService } from 'src/app/z-service/auth/auth.service';

@Component({
  selector: 'app-cetak-kuisioner',
  templateUrl: './cetak-kuisioner.component.html',
  styleUrls: ['./cetak-kuisioner.component.css']
})
export class CetakKuisionerComponent implements OnInit {

  @Input() selectedObat: any = null;
  user: any = null;
  currentQuestionIndex: number = 0;
  questions: { text: string; options: { value: number; label: string; color: string }[] }[] = [];

  responses: { questionIndex: number; value: number; label: string; question: string }[] = [];

  constructor(
    private modalController: ModalController,
    private apiFireBaseService: ApiFirebaseService,
    private toastService: ToastService,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      console.log('user', user);
      this.user = user;
    });
    this.questions = [
      {
        text: `Apakah saudari minum 1 tablet ${this.selectedObat?.nama} dalam seminggu?`,
        options: [
          { value: 0, label: 'Tidak', color: 'danger' },
          { value: 1, label: 'Iya', color: 'success' }
        ],
      },
      {
        text: `Apakah saudari minum tablet ${this.selectedObat?.nama} pada hari yang sama (jarak 6 hari)?`,
        options: [
          { value: 0, label: 'Tidak', color: 'danger' },
          { value: 1, label: 'Iya', color: 'success' }
        ],
      },
      {
        text: `Apakah saudari minum tablet ${this.selectedObat?.nama} menggunakan air putih?`,
        options: [
          { value: 0, label: 'Tidak', color: 'danger' },
          { value: 1, label: 'Iya', color: 'success' }
        ],
      }
    ];
  }

  onRatingChange(event: any) {
    const value = event.detail.value;
    const currentOptions = this.questions[this.currentQuestionIndex].options;
    const selectedOption = currentOptions.find(option => option.value === value);

    if (selectedOption) {
      const existingResponse = this.responses.find(
        response => response.questionIndex === this.currentQuestionIndex
      );

      if (existingResponse) {
        existingResponse.value = selectedOption.value;
        existingResponse.label = selectedOption.label;
      } else {
        this.responses.push({
          questionIndex: this.currentQuestionIndex,
          value: selectedOption.value,
          label: selectedOption.label,
          question: this.questions[this.currentQuestionIndex].text
        });
      }
    }
  }

  getResponseValue(questionIndex: number): number | null {
    const response = this.responses.find(response => response.questionIndex === questionIndex);
    return response ? response.value : null;
  }


  onPrevious() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  onNext() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  onCloseModal() {
    this.modalController.dismiss();
  }

  onClickSave() {
    if (this.responses.length !== this.questions.length) {
      this.toastService.presentToast('Silakan jawab semua pertanyaan', 'warning', 'top', 1000);
      return
    }
    const payload = {
      nama: this.selectedObat?.nama || '',
      jenis: this.selectedObat?.jenis || '',
      deskripsi: this.selectedObat?.deskripsi || '',
      file: this.selectedObat?.file || '',
      aturan_minum: this.selectedObat?.aturan_minum || '',
      dosis_obat: this.selectedObat?.dosis_obat || '',
      frekuensi_minum: this.selectedObat?.frekuensi_minum || '',
      schedule: this.selectedObat?.schedule || '',
      pesan_notif: this.selectedObat?.pesan_notif || '',
      tanggal: this.selectedObat?.tanggal || '',
      displayName: this.selectedObat?.displayName || '',
      email: this.selectedObat?.email || '',
      responses: this.responses.map(response => ({
        questionIndex: response.questionIndex || 0,
        value: response.value || 0,
        label: response.label || '',
        displayName: this.user?.displayName || '',
        nama: this.selectedObat?.nama || '',
        email: this.user?.email || '',
        question: this.questions[response.questionIndex]?.text || ''
      }))
    };
    console.log('payload', payload);
    console.log('user', this.user);


    // return
    this.apiFireBaseService.createResponse(payload)
      .then(() => {
        this.toastService.presentToast('Sukses menyimpan data', 'success', 'top', 1000);
        this.modalController.dismiss(payload);
      })
      .catch(error => {
        this.toastService.presentToast('Gagal menyimpan data', 'danger', 'top', 1000);
      });
  }

}
