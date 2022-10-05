import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Email, EmailService } from '../services/email.service';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.page.html',
  styleUrls: ['./recuperar-senha.page.scss'],
})
export class RecuperarSenhaPage implements OnInit {

  username: string = "";
  email: Email = {
    destiny: "",
    title: "",
    body: ""
  }

  constructor( 
    private alertController: AlertController,
    private router: Router,
    private userService: UserService,
    private emailService: EmailService
    ) { }

  ngOnInit() {
  }

  updatePassword(){
    this.userService.getUserByUsername(this.username).subscribe(res=>{
      if(res == null){
        this.showAlert("Error! Username not found.");
      }else{
        const newPassword = this.generatePasswordRamdom(6);
        this.userService.updatePassword(newPassword, res.id).subscribe();
        this.email.destiny = this.username;
        this.email.title = "Recuperação de senha";
        this.email.body = "Para acessar ao sistema utilize seu username e a senha: "+ newPassword +". Lembre-se de, assim que fizer login alterar sua senha, por questões de segurança.";
        this.emailService.send(this.email).subscribe( res=>{
          this.showAlert("An email has been sent with your new password!");
          this.router.navigateByUrl('/login', { replaceUrl: true });
        });
      }
    }, err => {
      console.log(err.message);
      this.showAlert("Error! Please try again.")
    });
  }

  generatePasswordRamdom(size: number) {
    var stringRamdom = '';
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < size; i++) {
      stringRamdom += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return stringRamdom;
  }

  async showAlert(message) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
