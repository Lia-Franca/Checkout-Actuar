import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gerenciador-registros',
  templateUrl: './gerenciador-registros.component.html',
  styleUrls: ['./gerenciador-registros.component.scss']
})
export class GerenciadorRegistrosComponent implements OnInit {
  public progressBarDisplay = 'none';
  public progressBarVisibility = 'visible';
  public progressBarClass = '';
  public typeOfAlertMessage = ``;
  public loading = false;
  public textAlertMessage = ``;
  public isOpenAlert = false;
  public records: any[] = [
    {
      name: 'teste',
      discount: 11,
      checked: false
    },
    {
      name: 'teste1',
      discount: 22,
      checked: false
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }



}
