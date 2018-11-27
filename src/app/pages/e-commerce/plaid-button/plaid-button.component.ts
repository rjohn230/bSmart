import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-plaid-button',
  templateUrl: './plaid-button.component.html',
  styleUrls: ['./plaid-button.component.scss']
})
export class PlaidButtonComponent implements OnInit {
  linkHandler;
  
  themeName = 'default';
  settings: Array<any>;
  themeSubscription: Subscription;

  constructor(private themeService: NbThemeService) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.themeName = theme.name;
      this.init(theme.variables);
    });
    this.linkHandler = Plaid.create({
      clientName: 'bSmart',
      env: 'development',
      apiVersion: 'v2',
      key: '5b90ad3428575376ee2637218f0009',
      product: ['auth', 'transactions'],
      webhook: '',
      selectAccount: true,
      forceIframe: true,
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

  init(colors: any) {
    this.settings = [
      {
        status: 'primary',
        container: 'primary-container',
        title: 'Plaid Connect',
        buttonTitle: 'Connect your bank account!',
        default: {
          gradientLeft: `adjust-hue(${colors.primary}, 20deg)`,
          gradientRight: colors.primary,
        },
        corporate: {
          color: colors.primary,
          glow: {
            params: '0 0 20px 0',
            color: 'rgba (115, 161, 255, 0.5)',
          },
        },
        cosmic: {
          gradientLeft: `adjust-hue(${colors.primary}, 20deg)`,
          gradientRight: colors.primary,
          bevel: `shade(${colors.primary}, 14%)`,
          shadow: 'rgba (6, 7, 64, 0.5)',
          glow: {
            params: '0 2px 12px 0',
            color: `adjust-hue(${colors.primary}, 10deg)`,
          },
        },
      },
    ];
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
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
