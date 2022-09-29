import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string = null;
  private user: User = {};

  constructor( private http: HttpClient, 
              private storage: Storage,
              private navCtrl: NavController) { 

    this.storage.create();
  }


  login ( email: string, password: string) {

    const data = { email, password};

    return new Promise( resolve => {

      this.http.post(`${ URL }/user/login`, data )
      .subscribe( resp => {
        console.log(resp);

        if( resp['state'] ) {

          this.saveToken( resp['token'] )
          resolve(true);

        } else {

          this.token = null;
          this.storage.clear();
          resolve(false);
        }

      });

    });



  }


  signIn( user: User ) {

    return new Promise( resolve => {

      this.http.post(`${URL}/user/create`, user)
            .subscribe( resp => {
              console.log(resp);

              if( resp['state'] ) {

                this.saveToken( resp['token'] )
                resolve(true);
      
              } else {
      
                this.token = null;
                this.storage.clear();
                resolve(false);

              }

            });

    });

  }

  getUser() {

    if( !this.user._id ) {
      this.validtoken();
    }

    return { ...this.user };

  }


  async saveToken( token: string ){

    this.token = token;
    await this.storage.set('token', token);

  }

  async loadToken(){
    this.token = await this.storage.get('token') || null;
  }

  async validtoken(): Promise<boolean> {

    await this.loadToken();

    if( !this.token ){
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>( resolve => {

      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get(`${ URL }/user/`, { headers })
          .subscribe( resp => {

            if( resp['state']) {
              this.user = resp['user'];
              resolve(true);
            } else {
              this.navCtrl.navigateRoot('/login');
              resolve(false);
            }

          });

    });

  }

  updateUser( user: User) {

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise( resolve => {

          this.http.post(`${URL}/user/update`, user, { headers })
        .subscribe( resp => {
          console.log(resp);
          if ( resp['state']){
            this.saveToken( resp['token'] );
            resolve(true);
          } else {
            resolve(false);
          }

        });
    });
  }


}
