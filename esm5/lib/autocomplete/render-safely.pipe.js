import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
var RenderSafelyPipe = /** @class */ (function () {
    function RenderSafelyPipe(sanitized) {
        this.sanitized = sanitized;
    }
    RenderSafelyPipe.prototype.transform = function (value) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    };
    RenderSafelyPipe.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
    RenderSafelyPipe = __decorate([
        Pipe({
            name: 'renderSafely'
        })
    ], RenderSafelyPipe);
    return RenderSafelyPipe;
}());
export { RenderSafelyPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLXNhZmVseS5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vc2xhcm4tYXV0b2NvbXBsZXRlLWNhLyIsInNvdXJjZXMiOlsibGliL2F1dG9jb21wbGV0ZS9yZW5kZXItc2FmZWx5LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBQyxZQUFZLEVBQUUsUUFBUSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFLakU7SUFDRSwwQkFBb0IsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztJQUFHLENBQUM7SUFDL0Msb0NBQVMsR0FBVCxVQUFVLEtBQWE7UUFDckIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELENBQUM7O2dCQUg4QixZQUFZOztJQURoQyxnQkFBZ0I7UUFINUIsSUFBSSxDQUFDO1lBQ0osSUFBSSxFQUFFLGNBQWM7U0FDckIsQ0FBQztPQUNXLGdCQUFnQixDQUs1QjtJQUFELHVCQUFDO0NBQUEsQUFMRCxJQUtDO1NBTFksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXIsIFNhZmVIdG1sfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlclwiO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdyZW5kZXJTYWZlbHknXG59KVxuZXhwb3J0IGNsYXNzIFJlbmRlclNhZmVseVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtICB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVkOiBEb21TYW5pdGl6ZXIpIHt9XG4gIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nKTogU2FmZUh0bWwge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXplZC5ieXBhc3NTZWN1cml0eVRydXN0SHRtbCh2YWx1ZSk7XG4gIH1cbn1cbiJdfQ==