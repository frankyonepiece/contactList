import { Component } from '@angular/core';
import { NavController , Platform , AlertController} from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { Contacts } from '@ionic-native/contacts';
import { SMS } from '@ionic-native/SMS'

import { ContactsPage } from '../contacts/contacts';

declare var window: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Contacts]
})
export class HomePage {
  //this variable for showing the call segment
  pet: string="call";

  //contact variables
  phoneNbr : number;
  ContactItems:any;

  //sms variables
  public smses:any;

  constructor( private contacts: Contacts, private call : CallNumber,
    public platform:Platform ,public navCtrl: NavController 
    , public alertCtrl:AlertController , public sms: SMS) {

      //this part for  fatching all contact fome the phone
    this.platform.ready().then(()=>{
      this.contacts.find(["*"]).then((contacts) =>{
        this.ContactItems=contacts;
      },(error) =>{
        console.log(error)
      });
    });

    if(window.SMS){
       window.SMS.listSMS({},data=>{
        setTimeout(()=>{
            console.log(data);
            this.smses=data;
        },0)
      },error=>{
      console.log(error);
    });
    }
  }

  //this function for makeing a call
  async callnbr():Promise<any>{
    try{
      await this.call.callNumber(String(this.phoneNbr),true);
    }catch(e){
      console.error(e);
    }
  }

  //this function for passing data from this page to contacts page and showing it 
  showContact(item){
    this.navCtrl.push(ContactsPage,{data:item});
  }

  //this function i am gonna use it in slide item
  /*callbyclick(item){
    try{
       this.call.callNumber(String(item.phoneNumbers[0].value),true);
    }catch(e){
      console.error(e);
    }
  }*/

  //this function showing an alert with input and button to sand a message
  sendMsg() {
    let prompt = this.alertCtrl.create({
      title: 'message',
      inputs: [
        {
          type:'tel',
          name: 'phone',
          placeholder: 'number'
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
          //with hundler you can wrate the function of the button
          handler: data => {
            //in this parte you can sand a message fatching data from inputs
            try {
              this.sms.send(String(data.phone),String(data.msg));
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
}