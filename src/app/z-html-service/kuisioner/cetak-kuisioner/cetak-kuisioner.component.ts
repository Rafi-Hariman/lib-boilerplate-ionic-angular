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
  kelasList: string[] = [];
  selectedClass: string = '';
  responses: any = [];

  constructor(
    private modalController: ModalController,
    private apiFireBaseService: ApiFirebaseService,
    private toastService: ToastService,
    private authService: AuthService
  ) {

  }

  ngOnInit() {

    this.kelasList = this.generateKelasList();

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

  generateKelasList(): string[] {
    let kelas: string[] = [];
    for (let i = 7; i <= 9; i++) {
      for (let j = 65; j <= 70; j++) {
        kelas.push(`${i}${String.fromCharCode(j)}`);
      }
    }
    return kelas;
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
          kelas: this.selectedClass,
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
    if (this.responses.length !== this.questions.length || !this.selectedClass) {
      this.toastService.presentToast('Silakan jawab semua pertanyaan', 'warning', 'top', 1000);
      return
    }
    const payload = {
      responses: this.responses.map(response => ({
        questionIndex: response.questionIndex || 0,
        value: response.value || 0,
        label: response.label || '',
        kelas: this.selectedClass,
        displayName: this.user?.displayName || '',
        nama: this.selectedObat?.nama || '',
        email: this.user?.email || '',
        question: this.questions[response.questionIndex]?.text || ''
      }))
    };

    console.log('payload', payload);



    // return
    this.apiFireBaseService.createDataExcelUser(payload)
      .then(() => {
        this.toastService.presentToast('Sukses menyimpan data', 'success', 'top', 1000);
        this.modalController.dismiss(payload);
      })
      .catch(error => {
        this.toastService.presentToast('Gagal menyimpan data', 'danger', 'top', 1000);
      });
  }

}
