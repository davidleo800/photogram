import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/interfaces/interfaces';
import { UIServicesService } from 'src/app/services/uiservices.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  user: User = {};

  constructor( private userService: UserService,
                private uiService: UIServicesService) {}

  ngOnInit(): void {
      this.user = this.userService.getUser();
      
  }

  async updateUser( fUpdate: NgForm ) {

    if( fUpdate.invalid ){ return; }

    const updated = await this.userService.updateUser( this.user );

    if( updated ){
      // toast with message
      this.uiService.presentToast( 'Registro actualizado' );
    } else {
      // toast with error
      this.uiService.presentToast( 'No se pudo actualizar' );
    }

  }

  logout() {
    
  }

}
