import { Component } from '@angular/core';
import {IonicPage, NavController,} from 'ionic-angular';

import {AngularFireDatabase} from "angularfire2/database";
import {ItemCreatePage} from "../item-create/item-create";

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {
  arrData = [];
  myInput;
  constructor(public navCtrl: NavController, private fdb: AngularFireDatabase) {
    this.fdb.list("/myItems/").subscribe(_data =>{
      this.arrData = _data;
      console.log(this.arrData);
    });
  }
  btnAddClicked() {
    this.fdb.list("/myItems/").push(this.myInput);
  }
  deleteItem(i) {
    this.fdb.list("/myItems/").remove(this.arrData[i].$key);
  }
  uploaditems() {
    this.navCtrl.push(ItemCreatePage);
  }
}
