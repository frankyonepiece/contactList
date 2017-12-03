import { Component } from '@angular/core';
import { AlertController  , NavController, NavParams , ViewController , ModalController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';



@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {

  phoneNbre:any;
  contactNom:any;

  constructor(public alertCtrl: AlertController , public callCtrl:CallNumber , public navCtrl: NavController, public navParams: NavParams , public viewCtrl: ViewController , public modelCtrl: ModalController) {
    const data=this.navParams.get('data');
    this.phoneNbre=data.phoneNumbers[0].value;
    this.contactNom=data.displayName;
  }

  goback(){
    this.viewCtrl.dismiss();
  }
  
  
  callfun(){
    this.callCtrl.callNumber(String(this.phoneNbre),true);
  }catch(e){
    console.error(e);
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'message',
      inputs: [
        {
          type:'number',
          name: 'number',
          placeholder: 'number'
        },
        {
          type:'textarea',
          name:'text',
          placeholder: 'your message here'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'send',
          handler: data => {
            console.log('send');
          }
        }
      ]
    });
    prompt.present();
  }
}
