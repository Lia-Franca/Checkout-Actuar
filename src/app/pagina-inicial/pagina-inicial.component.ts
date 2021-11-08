import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';


import SwiperCore, { Pagination } from 'swiper';
SwiperCore.use([Pagination]);



@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.scss']
})
export class PaginaInicialComponent implements OnInit {
  public botaoComprarAgoraAtivado = true;
  public classFooterBackground = '';
  public classFooter = '';
  public classFooterContent = '';
  public footerPosition = '';
  public footerBottom = '';
  public wrap2Bottom = '';
  public wrap2Right = '';
  public footerBackgroundHeight = '';
  public bodyLineszIndex = '';
  public footerContentDisplay = '';
  public paginaLoginDisplay = '';
  public carouselBottom = '';

  
  

  constructor(private router: Router) { }

  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }
  
  ngOnInit(): void {
    const swiper = new Swiper('.swiper', {
      // Optional parameters
      direction: 'vertical',
      loop: true,
    
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },
    
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    
      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }


  comprarAgora(): void {
    this.botaoComprarAgoraAtivado = false;
    this.iniciarAnimacaoOnda();
  }
  
  iniciarAnimacaoOnda(): void {
    document.documentElement.style.overflowY = 'hidden';
    window.scrollTo({ 
      top: document.body.scrollHeight, 
      behavior: 'smooth' 
    })




        if ((window.innerHeight + window.scrollY) < document.body.offsetHeight) {
          setTimeout(() => {
            if (window.screen.width > 600) {
              this.wrap2Bottom = "18px";
              this.wrap2Right = "8px";
              this.footerBottom = "100px";
            }
            this.classFooterBackground = 'animatedWaves';
            this.classFooter = 'animated';
            this.footerPosition = "fixed";
            this.footerBottom = "138px";
            this.footerBackgroundHeight = "100%";
            this.bodyLineszIndex = "0";
            this.classFooterContent = "footerFadeOut";
            this.carouselBottom = "35px"; 
            }, 300);
        } else {
          if (window.screen.width > 600) {
            this.wrap2Bottom = "18px";
            this.wrap2Right = "8px";
            this.footerBottom = "100px";
          }
          this.classFooterBackground = 'animatedWaves';
          this.classFooter = 'animated';
          this.footerPosition = "fixed";
          this.footerBottom = "138px";
          this.footerBackgroundHeight = "100%";
          this.bodyLineszIndex = "0";
          this.classFooterContent = "footerFadeOut";
          this.carouselBottom = "35px"; 
        }
   
    setTimeout(()=> {
      this.footerContentDisplay = "none";
    }, 3000)

    
    setTimeout(()=>{  
      this.navigateToLogin();
      this.paginaLoginDisplay = "flex";
      document.documentElement.style.overflowY = 'visible';
    }, 2000);

    
  }


  scrollTop(): void {
    window.scroll({
      top: 0, 
      behavior: 'smooth'
    });
  }

  scrollBottom(): void {
    window.scrollTo({ 
      top: document.body.scrollHeight, 
      behavior: 'smooth' 
    })
  }


}
