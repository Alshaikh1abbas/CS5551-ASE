import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-APIinfo',
  templateUrl: 'APIinfo.html',
})
export class APIInfoPage {

  apiItem: {};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.apiItem = navParams.get('apiItem');
  }

}
