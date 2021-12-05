import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, Renderer2, EventEmitter, Output, Input} from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-modal-contrato',
  templateUrl: './modal-contrato.component.html',
  styleUrls: ['./modal-contrato.component.scss']
})
export class ModalContratoComponent implements OnInit, AfterViewInit {

  @ViewChild('close') closeModal: ElementRef;
  @ViewChild('modal') modal: ElementRef;
  @Output('modalClosedAndSigned') modalClosedAndSigned = new EventEmitter<any>();
  @Output('closedModal') closedModal = new EventEmitter<any>();
  @Input('modalOpenState') modalOpenState: boolean = false;


  obj = {
    cpf:'70150596146',
    email:'gabriel@actuar.com',
    nomeCompleto:'Gabriel Andrade Guimarães',
    dataNascimento:'01/03/1996'
  };

  constructor( private renderer: Renderer2 ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

    const eventClose = fromEvent(this.closeModal.nativeElement, 'click');
    eventClose.subscribe(() => {
      this.modalClose();
    });

  }

  modalClose() {
    this.closedModal.emit();
  }

  modalOpen() {
    this.renderer.addClass(this.modal.nativeElement, 'open');
  }

  signedContract() {
    this.modalClosedAndSigned.emit()
  }

}
