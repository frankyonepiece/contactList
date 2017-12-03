import { Component } from '@angular/core';
import { NavController , Platform , ModalController} from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { Contacts } from '@ionic-native/contacts';

import { ContactsPage } from '../contacts/contacts';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Contacts]
})
export class HomePage {
  pet: string="call";

  phoneNbr : number;
  ContactItems:any;

  constructor( private contacts: Contacts, private call : CallNumber,
    public platform:Platform ,public navCtrl: NavController , 
    public modelCtrl: ModalController) {

    this.platform.ready().then(()=>{
      this.contacts.find(["*"]).then((contacts) =>{
        this.ContactItems=contacts;
      },(error) =>{
        console.log(error)
      });
    });

  }

  async callnbr():Promise<any>{
    try{
      await this.call.callNumber(String(this.phoneNbr),true);
    }catch(e){
      console.error(e);
    }
  }

  showContact(item){
    let model =this.modelCtrl.create(ContactsPage,{data:item});
    model.present();
  }
  callbyclick(item){
    try{
       this.call.callNumber(String(item.phoneNumbers[0].value),true);
    }catch(e){
      console.error(e);
    }
  }

}