import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Client } from 'plaid';
import { PlaidService } from '../../../@core/data/plaid.service';

@Component({
  selector: 'ngx-plaid-button',
  templateUrl: './plaid-button.component.html',
  styleUrls: ['./plaid-button.component.scss']
})
export class PlaidButtonComponent implements OnInit {
  linkHandler;

  constructor() {
    
    this.linkHandler = Plaid.create({
      clientName: 'bSmart',
      env: 'development',
      key: '5b90ad3428575376ee2637218f0009',
      product: ['auth', 'transactions'],
      selectAccount: true,
      onLoad: function() {
        console.log('loaded');
      },
      onSuccess: function(public_token, metadata) {
        console.log(public_token);
        console.log(JSON.stringify(metadata));

        // var client = new Client('development',public_token,)
        // PlaidService()
        // 
      },
      onExit: function(err, metadata) {
        if (err != null) {
          console.log(err);
        }
        console.log(metadata);
        console.log(metadata.institution.name, metadata.institution.institution_id);
        console.log(metadata.request_id)
      }
    });
  }


  forceExitLink() {
    this.linkHandler.exit();
  }

  openLink() {
    this.linkHandler.open();
  }

  openLinkWithInstitution() {
    this.linkHandler.open('ins_4');
  }

  ngOnInit() {
  }



}
