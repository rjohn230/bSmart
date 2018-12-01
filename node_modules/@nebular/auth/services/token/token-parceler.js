import { Inject, Injectable, InjectionToken } from '@angular/core';
import { nbAuthCreateToken } from './token';
import { NB_AUTH_TOKENS } from '../../auth.options';
export var NB_AUTH_FALLBACK_TOKEN = new InjectionToken('Nebular Auth Options');
/**
 * Creates a token parcel which could be stored/restored
 */
var NbAuthTokenParceler = /** @class */ (function () {
    function NbAuthTokenParceler(fallbackClass, tokenClasses) {
        this.fallbackClass = fallbackClass;
        this.tokenClasses = tokenClasses;
    }
    NbAuthTokenParceler.prototype.wrap = function (token) {
        return JSON.stringify({
            name: token.getName(),
            ownerStrategyName: token.getOwnerStrategyName(),
            createdAt: token.getCreatedAt().getTime(),
            value: token.toString(),
        });
    };
    NbAuthTokenParceler.prototype.unwrap = function (value) {
        var tokenClass = this.fallbackClass;
        var tokenValue = '';
        var tokenOwnerStrategyName = '';
        var tokenCreatedAt = null;
        var tokenPack = this.parseTokenPack(value);
        if (tokenPack) {
            tokenClass = this.getClassByName(tokenPack.name) || this.fallbackClass;
            tokenValue = tokenPack.value;
            tokenOwnerStrategyName = tokenPack.ownerStrategyName;
            tokenCreatedAt = new Date(Number(tokenPack.createdAt));
        }
        return nbAuthCreateToken(tokenClass, tokenValue, tokenOwnerStrategyName, tokenCreatedAt);
    };
    // TODO: this could be moved to a separate token registry
    // TODO: this could be moved to a separate token registry
    NbAuthTokenParceler.prototype.getClassByName = 
    // TODO: this could be moved to a separate token registry
    function (name) {
        return this.tokenClasses.find(function (tokenClass) { return tokenClass.NAME === name; });
    };
    NbAuthTokenParceler.prototype.parseTokenPack = function (value) {
        try {
            return JSON.parse(value);
        }
        catch (e) { }
        return null;
    };
    NbAuthTokenParceler.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NbAuthTokenParceler.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [NB_AUTH_FALLBACK_TOKEN,] },] },
        { type: Array, decorators: [{ type: Inject, args: [NB_AUTH_TOKENS,] },] },
    ]; };
    return NbAuthTokenParceler;
}());
export { NbAuthTokenParceler };
//# sourceMappingURL=token-parceler.js.map