import { __decorate } from "tslib";
import { Directive, Input, Renderer2, ElementRef } from '@angular/core';
let FocusedDirective = class FocusedDirective {
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    set focused(value) {
        if (value) {
            //this.renderer.invokeElementMethod(this.elementRef.nativeElement, 'scrollIntoViewIfNeeded');
            this.renderer.selectRootElement(this.elementRef.nativeElement).scrollIntoView();
            this.elementRef.nativeElement.style.background = '#ececec';
        }
        else {
            this.elementRef.nativeElement.style.background = null;
        }
    }
};
FocusedDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
__decorate([
    Input()
], FocusedDirective.prototype, "focused", null);
FocusedDirective = __decorate([
    Directive({
        selector: '[focused]'
    })
], FocusedDirective);
export { FocusedDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vc2xhcm4tYXV0b2NvbXBsZXRlLWNhLyIsInNvdXJjZXMiOlsibGliL2F1dG9jb21wbGV0ZS9mb2N1cy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFLdEUsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7SUFZM0IsWUFBb0IsVUFBc0IsRUFBVSxRQUFtQjtRQUFuRCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztJQUFFLENBQUM7SUFWMUUsSUFBSSxPQUFPLENBQUMsS0FBYztRQUN4QixJQUFHLEtBQUssRUFBQztZQUNQLDZGQUE2RjtZQUM3RixJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDaEYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7U0FDNUQ7YUFBSTtZQUNILElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQ3ZEO0lBQ0gsQ0FBQztDQUdGLENBQUE7O1lBRGlDLFVBQVU7WUFBb0IsU0FBUzs7QUFWdkU7SUFEQyxLQUFLLEVBQUU7K0NBU1A7QUFWVSxnQkFBZ0I7SUFINUIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFdBQVc7S0FDdEIsQ0FBQztHQUNXLGdCQUFnQixDQWE1QjtTQWJZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBJbnB1dCwgUmVuZGVyZXIyLCBFbGVtZW50UmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2ZvY3VzZWRdJ1xufSlcbmV4cG9ydCBjbGFzcyBGb2N1c2VkRGlyZWN0aXZlIHtcbiAgQElucHV0KClcbiAgc2V0IGZvY3VzZWQodmFsdWU6IGJvb2xlYW4pe1xuICAgIGlmKHZhbHVlKXtcbiAgICAgIC8vdGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnc2Nyb2xsSW50b1ZpZXdJZk5lZWRlZCcpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZWxlY3RSb290RWxlbWVudCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPSAnI2VjZWNlYyc7XG4gICAgfWVsc2V7XG4gICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMil7fVxufVxuIl19