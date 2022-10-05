import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Data, LaunchService } from '../services/launch.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {  
  private idLaunch: string;
  private token: string = "";
  private username: string="";
  
  private launch: Data = {
    idPatient: "",
    coren: "",
    date: "",
    age: 0,
    height: 0,
    weight: 0,
    triglycerides: -174,
    evolutionaryTime: -15,
    abdominalCircumference:  45,
    income: -400,
    schooling:  -8,
    interventionResult: 0,
    comparativeResult: 0
  };

  constructor(
    private route: ActivatedRoute,
    private storage: Storage,
    private alertController: AlertController,
    private router: Router,
    private launchService: LaunchService
    ) { }

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

    await this.route.queryParams.subscribe(resultado=>{
      this.idLaunch = resultado.r;
    });

    await this.launchService.getLaunchById(this.idLaunch, this.token).subscribe(res => {
      this.launch = res;
      this.launch.date = this.formatDate(this.launch.date);
    });
  }

  formatDate(date){
    let dateF = date.split("T")[0];
    let time = date.split("T")[1].split(".")[0];
    return dateF + "   " + time;
  }

  async showAlert(message) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

}
