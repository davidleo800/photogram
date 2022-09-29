import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UIServicesService } from 'src/app/services/uiservices.service';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('mainSlide', {static: true}) slides: IonSlides;



  loginUser = {
    email: 'test1@live.com',
    password: '123456'
  };

  signInUser: User = {
    email: 'test',
    password: '123456',
    name: 'Test',
    avatar: 'av-1.png'
  };

  constructor( private userService: UserService,
               private navCtrl: NavController,
               private uiService: UIServicesService  ) { }

  ngOnInit() {

    this.slides.lockSwipes( true );

  }

  async login( fLogin: NgForm ){
    if( fLogin.invalid ){ return; }

    const valid = await this.userService.login( this.loginUser.email, this.loginUser.password );

    if ( valid ){
      // navigate to tabs
      this.navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true  } );
    } else {
      // Show alert, data is not valid
      this.uiService.infoAlert('Username or password are not valid');
    }

  }

  async signup( fSignup: NgForm ) {

    if ( fSignup.invalid ){ return; }

    const valid = await this.userService.signIn( this.signInUser  );

    if ( valid ){
      // navigate to tabs
      this.navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true  } );
    } else {
      // Show alert, data is not valid
      this.uiService.infoAlert('The email already exists');
    }
    
  }

  showlogIn(){
    this.slides.lockSwipes( false );
    this.slides.slideTo(0);
    this.slides.lockSwipes( true );
  }

  showsignIn(){
    this.slides.lockSwipes( false );
    this.slides.slideTo(1);
    this.slides.lockSwipes( true );
  }



}
