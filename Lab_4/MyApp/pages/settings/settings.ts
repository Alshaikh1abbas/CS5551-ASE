import { Component } from '@angular/core';
import {IonicPage, NavController,ToastController} from 'ionic-angular';
import {NativeStorage} from "@ionic-native/native-storage";
import {GooglePlus} from "@ionic-native/google-plus";
import {LoginPage} from "../login/login";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  // userData = [];
  profileData: FirebaseObjectObservable<any>;

  constructor(public navCtrl: NavController, public nativeStorage: NativeStorage, public googlePlus: GooglePlus,
              private afDatabase: AngularFireDatabase,
              private afAuth: AngularFireAuth, private toast: ToastController) {
    this.afAuth.authState.take(1).subscribe(data =>{
      if(data) {
        this.profileData = this.afDatabase.object(`profile/${data.uid}`)
      }
      else {
        this.toast.create({
          message: 'Please Login',
          duration: 1000
        }).present();
        // @ts-ignore
        this.profileData = "Log in";
      }
    });
  }

  signinp() {
    this.navCtrl.push('LoginPage');
  }

  doGoogleLogout(){
    let nav = this.navCtrl;
    let env = this;
    this.googlePlus.logout()
      .then(function (response) {
        env.nativeStorage.remove('user');
        nav.push(LoginPage);
      },function (error) {
        console.log(error);
      })
  }




}
