import { AlertController, ModalController} from '@ionic/angular';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalLancamentoPage } from '../modal-lancamento/modal-lancamento.page';
import { ElementRef, ViewChild } from '@angular/core';
import { Chart, LinearScale, BarController, CategoryScale, BarElement, DoughnutController, ArcElement, LineController,
  PointElement, LineElement,
} from 'chart.js';
import { Data, LaunchService } from '../services/launch.service';
import { Patient, PatientService } from '../services/patient.service';
import { Storage } from '@ionic/storage';

Chart.register( LinearScale, BarController, CategoryScale, BarElement, DoughnutController, ArcElement, LineController,
  PointElement, LineElement);

@Component({
  selector: 'app-visualizar-historico',
  templateUrl: './visualizar-historico.page.html',
  styleUrls: ['./visualizar-historico.page.scss'],
})
export class VisualizarHistoricoPage implements OnInit {

  @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  patient: "";
  lineChart: Chart;
  patients: Patient[] = [];
  launchs: Data[] = [];
  listaResultadosComparativos: number[] = [];
  listaResultadosIntervencao: number[] = [];
  token: string = "";
  username: string="";

  constructor(
    private alertController: AlertController,
    private patientService: PatientService,  
    private cd: ChangeDetectorRef,
    private router: Router,
    private modalCtrl: ModalController,
    private storage: Storage,
    private launchService: LaunchService
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

    this.patientService.getPatients(this.token).subscribe(res => {
      this.patients = res;
    });
  }

  listLaunchs(id){
    this.launchService.getLaunchsByIdPatient(id, this.token).subscribe(res => {
      this.launchs = res;
      this.listaResultadosIntervencao = [];
      this.listaResultadosComparativos = [];

      var k = 0;
      for (let l of this.launchs) {
        l.date = this.formatDate(l.date);
        k++;
      }
      
      var i = 0;
      for (let l of this.launchs) {
        this.listaResultadosComparativos[i] = l.comparativeResult;
        i++;
      }

      var j = 0;
      for (let l of this.launchs) {
        this.listaResultadosIntervencao[j] = l.interventionResult;
        j++;
      }

      this.lineChartMethod();
    });
  }

  formatDate(date){
    let dateF = date.split("T")[0];
    let time = date.split("T")[1].split(".")[0];
    return dateF + "   " + time;
  }

  async openLaunch(launch: Data) {
    const modal = await this.modalCtrl.create({
      component: ModalLancamentoPage,
      componentProps: { id: launch.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8
    });
 
    await modal.present();
  }

  lineChartMethod() {
    if(this.lineChart){
      this.lineChart.destroy();
    }

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ["", "", "", "", ""],
        datasets: [
          {
            label: 'Sell per week',
            fill: false,
           // lineTension: 0.1,
            backgroundColor: 'rgba(56,113,28,1)',
            borderColor: 'rgba(56,113,28,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(56,113,28,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(56,113,28,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.listaResultadosComparativos,
            spanGaps: false,
          },
          {
            label: 'Sell per week',
            fill: false,
           // lineTension: 0.1,
            backgroundColor: 'rgba(8,82,138,1)',
            borderColor: 'rgba(8,82,138,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(8,82,138,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(8,82,138,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.listaResultadosIntervencao,
            spanGaps: false,
          }
        ]
      }
    });
  }

  async showAlert(message) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

}
