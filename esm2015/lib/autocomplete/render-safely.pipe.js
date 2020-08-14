import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
let RenderSafelyPipe = class RenderSafelyPipe {
    constructor(sanitized) {
        this.sanitized = sanitized;
    }
    transform(value) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    }
};
RenderSafelyPipe.ctorParameters = () => [
    { type: DomSanitizer }
];
RenderSafelyPipe = __decorate([
    Pipe({
        name: 'renderSafely'
    })
], RenderSafelyPipe);
export { RenderSafelyPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLXNhZmVseS5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vc2xhcm4tYXV0b2NvbXBsZXRlLWNhLyIsInNvdXJjZXMiOlsibGliL2F1dG9jb21wbGV0ZS9yZW5kZXItc2FmZWx5LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBQyxZQUFZLEVBQUUsUUFBUSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFLakUsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7SUFDM0IsWUFBb0IsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztJQUFHLENBQUM7SUFDL0MsU0FBUyxDQUFDLEtBQWE7UUFDckIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Q0FDRixDQUFBOztZQUpnQyxZQUFZOztBQURoQyxnQkFBZ0I7SUFINUIsSUFBSSxDQUFDO1FBQ0osSUFBSSxFQUFFLGNBQWM7S0FDckIsQ0FBQztHQUNXLGdCQUFnQixDQUs1QjtTQUxZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RG9tU2FuaXRpemVyLCBTYWZlSHRtbH0gZnJvbSBcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXJcIjtcblxuQFBpcGUoe1xuICBuYW1lOiAncmVuZGVyU2FmZWx5J1xufSlcbmV4cG9ydCBjbGFzcyBSZW5kZXJTYWZlbHlQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSAge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNhbml0aXplZDogRG9tU2FuaXRpemVyKSB7fVxuICB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZyk6IFNhZmVIdG1sIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZWQuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwodmFsdWUpO1xuICB9XG59XG4iXX0=