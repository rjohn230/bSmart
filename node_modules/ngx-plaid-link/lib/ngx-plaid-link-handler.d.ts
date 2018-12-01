import { PlaidConfig } from './interfaces';
export declare class PlaidLinkHandler {
    /**
     * Holds the Plaid Link instance.
     */
    private plaidLink;
    /**
     * Constructor configures the Plaid Link handler with given config options.
     * @param PlaidConfig config
     */
    constructor(config: PlaidConfig);
    /**
     * Open the Plaid Link window for this handler.
     * @param string institution The name of the institution to open
     */
    open(institution?: string): void;
    /**
     * Closes the currently open Plaid Link window if any.
     */
    exit(): void;
}
