import { __decorate } from "tslib";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
let ACService = class ACService {
    constructor(_http) {
        this._http = _http;
    }
    search(word, url) {
        let _url = new URL(url);
        _url.searchParams.append('ac-reg', word);
        return this._http.get(_url.toString());
    }
};
ACService.ctorParameters = () => [
    { type: HttpClient }
];
ACService = __decorate([
    Injectable()
], ACService);
export { ACService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xhcm4tYXV0b2NvbXBsZXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zbGFybi1hdXRvY29tcGxldGUtY2EvIiwic291cmNlcyI6WyJsaWIvYXV0b2NvbXBsZXRlL3NsYXJuLWF1dG9jb21wbGV0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFTO0lBRWxCLFlBQ1ksS0FBaUI7UUFBakIsVUFBSyxHQUFMLEtBQUssQ0FBWTtJQUN6QixDQUFDO0lBRUwsTUFBTSxDQUFDLElBQVksRUFBRSxHQUFXO1FBQzVCLElBQUksSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FDSixDQUFBOztZQVJzQixVQUFVOztBQUhwQixTQUFTO0lBRHJCLFVBQVUsRUFBRTtHQUNBLFNBQVMsQ0FXckI7U0FYWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFDU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudFxuICAgICkgeyB9XG5cbiAgICBzZWFyY2god29yZDogc3RyaW5nLCB1cmw6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PntcbiAgICAgICAgbGV0IF91cmwgPSBuZXcgVVJMKHVybCk7XG4gICAgICAgIF91cmwuc2VhcmNoUGFyYW1zLmFwcGVuZCgnYWMtcmVnJywgd29yZCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldChfdXJsLnRvU3RyaW5nKCkpO1xuICAgIH1cbn1cbiJdfQ==