import { Component } from '@angular/core';
import { MessageService } from '../message.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [ NgFor, NgIf ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  /*
   * MessagesComponent Constructor
   * Inject the Message Service into the Message Component.
   * messageService is public because it will be used for binding.
   */
  constructor(public messageService: MessageService) {}

}
