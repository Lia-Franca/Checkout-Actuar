import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-success',
  templateUrl: './pagina-success.component.html',
  styleUrls: ['./pagina-success.component.scss']
})
export class PaginaSuccessComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

}
