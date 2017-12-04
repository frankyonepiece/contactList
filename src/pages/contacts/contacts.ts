import { Component } from '@angular/core';
import { AlertController  , NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/SMS'


@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {

  phoneNbre:any;
  contactNom:any;

  constructor(public alertCtrl: AlertController , public callCtrl:CallNumber , 
    public navCtrl: NavController, public navParams: NavParams 
    , public sms:SMS) {
    const data=this.navParams.get('data');
    this.phoneNbre=data.phoneNumbers[0].value;
    this.contactNom=data.displayName;
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
          type:'tel',
          name: 'phone',
          value:`${this.phoneNbre}`
        },
        {
          type:'textarea',
          name:'msg',
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
            try {
              this.sms.send(String(this.phoneNbre),String(data.msg));
              alert("messege send")
            } catch (error) {
              let alert=this.alertCtrl.create({
                title:"error",
                message:`${error}`,
              });
              alert.present();
            }
          },
        }
      ]
    });
    prompt.present();
  }

  /*sendfun(){
    try {
      this.sms.send(String(this.phoneNbre),String(this.smstext));
      alert("messege send")
    } catch (error) {
      let alert=this.alertCtrl.create({
        title:"error",
        message:`${error}`,
      });
      alert.present();
    }
  }*/
}
