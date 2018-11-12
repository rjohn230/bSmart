import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  PlaidErrorMetadata,
  PlaidErrorObject,
  PlaidEventMetadata,
  PlaidOnEventArgs,
  PlaidOnExitArgs,
  PlaidOnSuccessArgs,
  PlaidSuccessMetadata,
  PlaidConfig
} from 'ngx-plaid-link/lib/interfaces';
import { NgxPlaidLinkService } from 'ngx-plaid-link/lib/ngx-plaid-link.service';
import { PlaidLinkHandler } from 'ngx-plaid-link/lib/ngx-plaid-link-handler';
 


@Component({
  selector: 'ngx-plaid-button',
  templateUrl: './plaid-button.component.html',
  styleUrls: ['./plaid-button.component.scss']
})
export class PlaidButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onPlaidSuccess(event) {
    // Send the public token to your server so you can do the token exchange.
  }

  onPlaidExit(event) {
    // Get errors or exit reason.
  }

  onPlaidEvent(event) {
    // Log events so you can have insight into how your users are using plaid link.
  }

  onPlaidLoad(event) {
    // Do something when the iframe loads.
  }

  onPlaidClick(event) {
    // Do something when the button is clicked.
  }

}

export class ComponentThatImplementsPlaidLink implements AfterViewInit {
  private plaidLinkHandler: PlaidLinkHandler;
 
  private config: PlaidConfig = {
    apiVersion: 'v2',
    env: 'sandbox',
    institution: null,
    token: null,
    webhook: '',
    product: ['auth'],
    key: 'YOURPUBLICKEY'
  };
 
  constructor(private plaidLinkService: NgxPlaidLinkService) {}
 
  // Create and open programatically once the library is loaded.
  ngAfterViewInit() {
    this.plaidLinkHandler.createPlaid(Object.assign({}, this.config, {
      onSuccess: (token, metadata) => this.onSuccess(token, metadata),
      onExit: (error, metadata) => this.onExit(error, metadata),
      onEvent: (eventName, metadata) => this.onEvent(eventName, metadata)
    })).then((handler: PlaidLinkHandler) => {
      this.plaidLinkHandler = handler;
      this.open();
    });
  }
 
  open() {
    this.plaidLinkHandler.open();
  }
 
  exit() {
    this.plaidLinkHandler.exit();
  }
 
  onSuccess(token, metadata) {
    console.log("We got a token:", token);
    console.log("We got metadata:", metadata);
  }
 
  onEvent(eventName, metadata) {
    console.log("We got an event:", eventName);
    console.log("We got metadata:", metadata);
  }
 
  onExit(error, metadata) {
    console.log("We exited:", error);
    console.log("We got metadata:", metadata);
  }
}