import {  Component, OnInit } from '@angular/core';
import { AlertController, ModalController} from '@ionic/angular';
import { ModalPacientePage } from '../modal-paciente/modal-paciente.page';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserService } from '../services/user.service';
import { PatientService, Patient } from '../services/patient.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.page.html',
  styleUrls: ['./pacientes.page.scss'],
})
export class PacientesPage implements OnInit {
  patients: Patient[] = [];
  corenNurse: string;
  token: string = "";
  username: string="";

  constructor(
    private alertCtrl: AlertController, 
    private modalCtrl: ModalController,
    private router: Router,
    private storage: Storage,
    private alertController: AlertController,
    private userService: UserService,
    private patientService: PatientService
    ) {
  }

  async ngOnInit() {
    await this.storage.get('access_token').then((val) => {
      this.token = val;
      if(val == null || val == ""){
        this.showAlert("Connection expired. Login again!");
        this.router.navigateByUrl('/login', { replaceUrl: true });
      }
    });

    await this.storage.get('username').then((val) => {
      this.username = val;
      if(val == null || val == ""){
        this.showAlert("Connection expired. Login again!");
        this.router.navigateByUrl('principal');
      }
    });

    this.getCoren();

    this.getPatients();
    
  }

  getCoren(){
    this.userService.getUserByUsername(this.username).subscribe(res => {
      this.corenNurse = res.coren;
    })
  }

  getPatients(){
    this.patientService.getPatients(this.token).subscribe(res => {
      this.patients = res;
    });
  }

  async addPatient() {
    const alert = await this.alertCtrl.create({
      header: 'Register patient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          type: 'text',
        },
        {
          name: 'coren',
          placeholder: 'Coren',
          type: 'text',
          value: this.corenNurse,
          disabled: true
        },
        {
          name: 'birthDate',
          placeholder: 'Birth date',
          type: 'date'
        },
        {
          name: 'phoneNumber',
          placeholder: 'Phone number',
          type: 'text'
        },
        {
          name: 'email',
          placeholder: 'Email',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Save',
          handler: res => {
            var dataFormatada = res.birthDate.split("-").reverse().join("-");
            this.patientService.addPatient({ name: res.name, coren: res.coren, birthDate: dataFormatada, 
            phoneNumber: res.phoneNumber, email: res.email }, this.token).subscribe(res => {
              //console.log(res);
              this.getPatients();
            });
          }
        }
      ]
    });
 
    await alert.present();
  }
 
  async openPatient(patient: Patient) {
    const modal = await this.modalCtrl.create({
      component: ModalPacientePage,
      componentProps: { id: patient.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8
    });
 
    await modal.present();
    const { data, role } = await modal.onWillDismiss();
    this.getPatients();
  }

  async logout() {
    this.storage.set('access_token', "");
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async showAlert(message) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}



