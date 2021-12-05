import {Component, OnInit, Input, AfterViewInit, EventEmitter, Output} from '@angular/core';
import { EventEmitterService } from './../../services/event-emitter.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, AfterViewInit {

@Input() type: string = 'text';
@Input() placeholder: string = 'placeholder';
@Input() creditCard: boolean = false;
@Input() user: boolean = false;
@Input() shield: boolean = false;
@Input() calendar: boolean = false;
@Input() maskedField: boolean = false;
@Input() mask: string;
@Input() thousandSeparator: string;
@Input() pattern: string = '';
@Input() optionInput: boolean = false;
@Input() options: any[] = [];
@Input() value: string | number = '';
@Input() margin: string = '';
@Input() isValidField: boolean = false;
@Input() autoComplete: string = '';
@Input() disabled: boolean = false;
@Input() eventNameField: string = '';
@Input() fontAwesomeIcon: string | null;
@Input() loading: boolean = false;

@Output() eventValue: EventEmitter<string> = new EventEmitter();
@Output() eventOptionValue: EventEmitter<object> = new EventEmitter();
@Output() onFocus: EventEmitter<any> = new EventEmitter();


focus: boolean = false;
errorState: boolean = false;

  constructor() { }

  ngOnInit(): void {

    EventEmitterService.get('disableInputErrorEvent').subscribe(() => {
      this.errorState = false;
    })

    EventEmitterService.get(`errorEventTo${this.eventNameField}`).subscribe((enableErrorState:boolean = true) => {
      if (!enableErrorState) {
        this.errorState = false;
        this.isValidField = true;
        console.log('mandou false',this.errorState, this.isValidField);
        return;
      }
      console.log('errorEventInput')
      this.errorEvent();
    })

  }

  ngAfterViewInit() {

  }

  fieldFocus() {
    this.focus = !this.focus;
    this.onFocus.emit();
  }

  receiveEvent(e: any) {
    this.eventValue.emit(e.target.value);
  }

  setOptionValue(option: any) {
    this.eventOptionValue.emit(option);
  }

  errorEvent() {
    if (this.errorState) {
      this.errorState = false;
      setTimeout(() => this.errorState = true, 100);
      return;
    }
    this.errorState = !this.errorState;
  }
}
