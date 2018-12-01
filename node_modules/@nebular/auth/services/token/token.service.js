import { Injectable } from '@angular/core';
import { BehaviorSubject, of as observableOf } from 'rxjs';
import { filter, share } from 'rxjs/operators';
import { NbTokenStorage } from './token-storage';
/**
 * Service that allows you to manage authentication token - get, set, clear and also listen to token changes over time.
 */
var NbTokenService = /** @class */ (function () {
    function NbTokenService(tokenStorage) {
        this.tokenStorage = tokenStorage;
        this.token$ = new BehaviorSubject(null);
        this.publishStoredToken();
    }
    /**
     * Publishes token when it changes.
     * @returns {Observable<NbAuthToken>}
     */
    /**
       * Publishes token when it changes.
       * @returns {Observable<NbAuthToken>}
       */
    NbTokenService.prototype.tokenChange = /**
       * Publishes token when it changes.
       * @returns {Observable<NbAuthToken>}
       */
    function () {
        return this.token$
            .pipe(filter(function (value) { return !!value; }), share());
    };
    /**
     * Sets a token into the storage. This method is used by the NbAuthService automatically.
     *
     * @param {NbAuthToken} token
     * @returns {Observable<any>}
     */
    /**
       * Sets a token into the storage. This method is used by the NbAuthService automatically.
       *
       * @param {NbAuthToken} token
       * @returns {Observable<any>}
       */
    NbTokenService.prototype.set = /**
       * Sets a token into the storage. This method is used by the NbAuthService automatically.
       *
       * @param {NbAuthToken} token
       * @returns {Observable<any>}
       */
    function (token) {
        this.tokenStorage.set(token);
        this.publishStoredToken();
        return observableOf(null);
    };
    /**
     * Returns observable of current token
     * @returns {Observable<NbAuthToken>}
     */
    /**
       * Returns observable of current token
       * @returns {Observable<NbAuthToken>}
       */
    NbTokenService.prototype.get = /**
       * Returns observable of current token
       * @returns {Observable<NbAuthToken>}
       */
    function () {
        var token = this.tokenStorage.get();
        return observableOf(token);
    };
    /**
     * Removes the token and published token value
     *
     * @returns {Observable<any>}
     */
    /**
       * Removes the token and published token value
       *
       * @returns {Observable<any>}
       */
    NbTokenService.prototype.clear = /**
       * Removes the token and published token value
       *
       * @returns {Observable<any>}
       */
    function () {
        this.tokenStorage.clear();
        this.publishStoredToken();
        return observableOf(null);
    };
    NbTokenService.prototype.publishStoredToken = function () {
        this.token$.next(this.tokenStorage.get());
    };
    NbTokenService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NbTokenService.ctorParameters = function () { return [
        { type: NbTokenStorage, },
    ]; };
    return NbTokenService;
}());
export { NbTokenService };
//# sourceMappingURL=token.service.js.map