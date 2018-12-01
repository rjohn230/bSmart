import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { NbAccessChecker } from '../services/access-checker.service';
var NbIsGrantedDirective = /** @class */ (function () {
    function NbIsGrantedDirective(templateRef, viewContainer, accessChecker) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.accessChecker = accessChecker;
        this.alive = true;
        this.hasView = false;
    }
    Object.defineProperty(NbIsGrantedDirective.prototype, "nbIsGranted", {
        set: function (_a) {
            var _this = this;
            var permission = _a[0], resource = _a[1];
            this.accessChecker.isGranted(permission, resource)
                .pipe(takeWhile(function () { return _this.alive; }))
                .subscribe(function (can) {
                if (can && !_this.hasView) {
                    _this.viewContainer.createEmbeddedView(_this.templateRef);
                    _this.hasView = true;
                }
                else if (!can && _this.hasView) {
                    _this.viewContainer.clear();
                    _this.hasView = false;
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    NbIsGrantedDirective.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    NbIsGrantedDirective.decorators = [
        { type: Directive, args: [{ selector: '[nbIsGranted]' },] },
    ];
    /** @nocollapse */
    NbIsGrantedDirective.ctorParameters = function () { return [
        { type: TemplateRef, },
        { type: ViewContainerRef, },
        { type: NbAccessChecker, },
    ]; };
    NbIsGrantedDirective.propDecorators = {
        "nbIsGranted": [{ type: Input },],
    };
    return NbIsGrantedDirective;
}());
export { NbIsGrantedDirective };
//# sourceMappingURL=is-granted.directive.js.map