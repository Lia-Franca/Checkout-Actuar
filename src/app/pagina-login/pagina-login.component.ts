import { Router, NavigationStart } from '@angular/router';
import { isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Pages } from '../shared/components/back-button/page'


@Component({
  selector: 'app-pagina-login',
  templateUrl: './pagina-login.component.html',
  styleUrls: ['./pagina-login.component.scss']
})
export class PaginaLoginComponent implements OnInit {
  public email: string = '';
  public regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) ;
  public isValidEmail = false;
  public isInvalidEmail = false;
  public page: any;


  el: any;


  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }


  navigateToCadastro(email: string) {
    this.router.navigate(['/cadastro/', email]).then();
    console.log(email) //ok
  }

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) { return; }
    window.scrollTo({top: 0});
  }

  validateEmail(event: any) {

    this.isValidEmail =  this.regex.test( event.target.value);

    if (this.isValidEmail) {
      this.isInvalidEmail = false;
    }
  }



  submit() {
    if (this.isValidEmail) {
      this.isInvalidEmail = false;
      this.navigateToCadastro(this.email)
    } else {
      this.isInvalidEmail = true;
    }
  }

}


