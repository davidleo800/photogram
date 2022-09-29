import { DomSanitizer } from '@angular/platform-browser'; 
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'domSanitizer'
})
export class DomSanitizerPipe implements PipeTransform {

  constructor( private domSanitizer: DomSanitizer ){}

  transform( img: string ): any {

    const domImg = `background-image: url('${ img }')`;

    return this.domSanitizer.bypassSecurityTrustStyle( domImg ); 
  }

}
