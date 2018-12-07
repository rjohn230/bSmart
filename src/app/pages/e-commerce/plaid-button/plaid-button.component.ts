import { Component, OnInit } from '@angular/core';
import { PlaidService } from '../../../@core/data/plaid.service';

@Component({
  selector: 'ngx-plaid-button',
  templateUrl: './plaid-button.component.html',
  styleUrls: ['./plaid-button.component.scss']
})
export class PlaidButtonComponent implements OnInit {
  linkHandler;

  constructor(private plaidService: PlaidService) {

    this.linkHandler = Plaid.create({
      clientName: 'bSmart',
      env: 'sandbox',
      key: '5b90ad3428575376ee2637218f0009',
      product: ['auth', 'transactions'],
      onLoad: function() {
        console.log('loaded');
      },
      onSuccess: function(public_token, metadata) {
        console.log(public_token);
        console.log(metadata.account.id, metadata.account.name);
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






// constructor(private client: Client) {
//   const plaidClient = new Client(
//     'bSmart',
//     '8798afa21be46ced1c825ff87c3f72',
//     '5b90ad3428575376ee2637218f0009',
//     'development'
//   );
// }