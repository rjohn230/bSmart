var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Injectable } from '@angular/core';
import { NbAuthTokenParceler } from './token-parceler';
var NbTokenStorage = /** @class */ (function () {
    function NbTokenStorage() {
    }
    return NbTokenStorage;
}());
export { NbTokenStorage };
/**
 * Service that uses browser localStorage as a storage.
 *
 * The token storage is provided into auth module the following way:
 * ```ts
 * { provide: NbTokenStorage, useClass: NbTokenLocalStorage },
 * ```
 *
 * If you need to change the storage behaviour or provide your own - just extend your class from basic `NbTokenStorage`
 * or `NbTokenLocalStorage` and provide in your `app.module`:
 * ```ts
 * { provide: NbTokenStorage, useClass: NbTokenCustomStorage },
 * ```
 *
 */
var NbTokenLocalStorage = /** @class */ (function (_super) {
    __extends(NbTokenLocalStorage, _super);
    function NbTokenLocalStorage(parceler) {
        var _this = _super.call(this) || this;
        _this.parceler = parceler;
        _this.key = 'auth_app_token';
        return _this;
    }
    /**
     * Returns token from localStorage
     * @returns {NbAuthToken}
     */
    /**
       * Returns token from localStorage
       * @returns {NbAuthToken}
       */
    NbTokenLocalStorage.prototype.get = /**
       * Returns token from localStorage
       * @returns {NbAuthToken}
       */
    function () {
        var raw = localStorage.getItem(this.key);
        return this.parceler.unwrap(raw);
    };
    /**
     * Sets token to localStorage
     * @param {NbAuthToken} token
     */
    /**
       * Sets token to localStorage
       * @param {NbAuthToken} token
       */
    NbTokenLocalStorage.prototype.set = /**
       * Sets token to localStorage
       * @param {NbAuthToken} token
       */
    function (token) {
        var raw = this.parceler.wrap(token);
        localStorage.setItem(this.key, raw);
    };
    /**
     * Clears token from localStorage
     */
    /**
       * Clears token from localStorage
       */
    NbTokenLocalStorage.prototype.clear = /**
       * Clears token from localStorage
       */
    function () {
        localStorage.removeItem(this.key);
    };
    NbTokenLocalStorage.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NbTokenLocalStorage.ctorParameters = function () { return [
        { type: NbAuthTokenParceler, },
    ]; };
    return NbTokenLocalStorage;
}(NbTokenStorage));
export { NbTokenLocalStorage };
//# sourceMappingURL=token-storage.js.map