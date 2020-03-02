import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import {GooglePlus} from "@ionic-native/google-plus";
import { MainPage } from '../';
import {LoadingController, Loading} from "ionic-angular";
import {NativeStorage} from "@ionic-native/native-storage";
import {SettingsPage} from "../settings/settings";
import {User} from "../../models/user";
import {AngularFireAuth} from "angularfire2/auth";
import {ProfilePage} from "../profile/profile";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user = {} as User;

  private loginErrorString: string;
  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private afAuth: AngularFireAuth,
    private toast: ToastController,
    public googlePlus: GooglePlus, public loadingCtrl: LoadingController, public nativeStorage: NativeStorage
  )
{
    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }
  async doLogin(user: User) {
    try {
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        this.navCtrl.setRoot('ProfilePage');
      }
    }
    catch (e) {
      console.error(e);
    }
  }
  signup1() {
    this.navCtrl.push('SignupPage');
  }

  doGoogleLogin(){
    let nav = this.navCtrl;
    let env = this;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.googlePlus.login({
      'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': 'YOUR WEB_CLI_ID', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true
    })
      .then(function (users) {
        loading.dismiss();
        env.nativeStorage.setItem('user', {
          Google_name: users.displayName,
          Google_email: users.email,
          Google_picture: users.imageUrl
        })
          .then(function(){
            nav.push(SettingsPage);
          }, function (error) {
            console.log(error);
          })
      }, function (error) {
        loading.dismiss();
      });

  }



}

