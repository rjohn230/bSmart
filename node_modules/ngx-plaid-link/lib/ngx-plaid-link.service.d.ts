import { PlaidConfig } from './interfaces';
import { PlaidLinkHandler } from './ngx-plaid-link-handler';
export declare class NgxPlaidLinkService {
    private loaded;
    constructor();
    /**
     * Create a Plaid Link instance as soon as Plaid Link has loaded.
     * @param PlaidConfig config
     * @returns Promise<PlaidLinkHandler>
     */
    createPlaid(config: PlaidConfig): Promise<PlaidLinkHandler>;
    /**
     * Load or wait for the Plaid Link library to load.
     * @returns Promise<void>
     */
    loadPlaid(): Promise<void>;
}
