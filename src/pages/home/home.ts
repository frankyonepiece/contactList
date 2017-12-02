import { Component } from '@angular/core';
import { NavController , Platform} from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { Contacts } from '@ionic-native/contacts';



/*import { CallsPage } from '../calls/calls';
import { ContactsPage } from '../contacts/contacts';
import { MessagesPage } from '../messages/messages';*/

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Contacts]
})
export class HomePage {
  pet: string="call";

  phoneNbr : number;

  ContactItems:any;

  constructor( private contacts: Contacts, private call : CallNumber, public platform:Platform ,public navCtrl: NavController) {

    this.platform.ready().then(()=>{
      this.contacts.find(["*"]).then((contacts) =>{
        this.ContactItems=contacts;
      },(error) =>{
        console.log(error)
      });
    })
  }
  async callnbr():Promise<any>{
    try{
      await this.call.callNumber(String(this.phoneNbr),true);
    }catch(e){
      console.error(e);
    }
  }
  
}