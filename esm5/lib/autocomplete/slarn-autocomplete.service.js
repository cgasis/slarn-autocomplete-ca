import { __decorate } from "tslib";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
var ACService = /** @class */ (function () {
    function ACService(_http) {
        this._http = _http;
    }
    ACService.prototype.search = function (word, url) {
        var _url = new URL(url);
        _url.searchParams.append('ac-reg', word);
        return this._http.get(_url.toString());
    };
    ACService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    ACService = __decorate([
        Injectable()
    ], ACService);
    return ACService;
}());
export { ACService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xhcm4tYXV0b2NvbXBsZXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zbGFybi1hdXRvY29tcGxldGUtY2EvIiwic291cmNlcyI6WyJsaWIvYXV0b2NvbXBsZXRlL3NsYXJuLWF1dG9jb21wbGV0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQztJQUVJLG1CQUNZLEtBQWlCO1FBQWpCLFVBQUssR0FBTCxLQUFLLENBQVk7SUFDekIsQ0FBQztJQUVMLDBCQUFNLEdBQU4sVUFBTyxJQUFZLEVBQUUsR0FBVztRQUM1QixJQUFJLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUMzQyxDQUFDOztnQkFQa0IsVUFBVTs7SUFIcEIsU0FBUztRQURyQixVQUFVLEVBQUU7T0FDQSxTQUFTLENBV3JCO0lBQUQsZ0JBQUM7Q0FBQSxBQVhELElBV0M7U0FYWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFDU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudFxuICAgICkgeyB9XG5cbiAgICBzZWFyY2god29yZDogc3RyaW5nLCB1cmw6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PntcbiAgICAgICAgbGV0IF91cmwgPSBuZXcgVVJMKHVybCk7XG4gICAgICAgIF91cmwuc2VhcmNoUGFyYW1zLmFwcGVuZCgnYWMtcmVnJywgd29yZCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldChfdXJsLnRvU3RyaW5nKCkpO1xuICAgIH1cbn1cbiJdfQ==