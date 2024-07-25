import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: string = '';

  constructor() { }

  add(message: string) {
    this.messages = message;

    setTimeout(() => {
      this.clear();
    }, 4000);
  }

  clear() {
    this.messages = '';
  }
}
