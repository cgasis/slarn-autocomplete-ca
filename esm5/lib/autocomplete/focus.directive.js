import { __decorate } from "tslib";
import { Directive, Input, Renderer2, ElementRef } from '@angular/core';
var FocusedDirective = /** @class */ (function () {
    function FocusedDirective(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    Object.defineProperty(FocusedDirective.prototype, "focused", {
        set: function (value) {
            if (value) {
                //this.renderer.invokeElementMethod(this.elementRef.nativeElement, 'scrollIntoViewIfNeeded');
                this.renderer.selectRootElement(this.elementRef.nativeElement).scrollIntoView();
                this.elementRef.nativeElement.style.background = '#ececec';
            }
            else {
                this.elementRef.nativeElement.style.background = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    FocusedDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    __decorate([
        Input()
    ], FocusedDirective.prototype, "focused", null);
    FocusedDirective = __decorate([
        Directive({
            selector: '[focused]'
        })
    ], FocusedDirective);
    return FocusedDirective;
}());
export { FocusedDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vc2xhcm4tYXV0b2NvbXBsZXRlLWNhLyIsInNvdXJjZXMiOlsibGliL2F1dG9jb21wbGV0ZS9mb2N1cy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFLdEU7SUFZRSwwQkFBb0IsVUFBc0IsRUFBVSxRQUFtQjtRQUFuRCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztJQUFFLENBQUM7SUFWMUUsc0JBQUkscUNBQU87YUFBWCxVQUFZLEtBQWM7WUFDeEIsSUFBRyxLQUFLLEVBQUM7Z0JBQ1AsNkZBQTZGO2dCQUM3RixJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ2hGLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO2FBQzVEO2lCQUFJO2dCQUNILElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO2FBQ3ZEO1FBQ0gsQ0FBQzs7O09BQUE7O2dCQUUrQixVQUFVO2dCQUFvQixTQUFTOztJQVZ2RTtRQURDLEtBQUssRUFBRTttREFTUDtJQVZVLGdCQUFnQjtRQUg1QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsV0FBVztTQUN0QixDQUFDO09BQ1csZ0JBQWdCLENBYTVCO0lBQUQsdUJBQUM7Q0FBQSxBQWJELElBYUM7U0FiWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgSW5wdXQsIFJlbmRlcmVyMiwgRWxlbWVudFJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tmb2N1c2VkXSdcbn0pXG5leHBvcnQgY2xhc3MgRm9jdXNlZERpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpXG4gIHNldCBmb2N1c2VkKHZhbHVlOiBib29sZWFuKXtcbiAgICBpZih2YWx1ZSl7XG4gICAgICAvL3RoaXMucmVuZGVyZXIuaW52b2tlRWxlbWVudE1ldGhvZCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3Njcm9sbEludG9WaWV3SWZOZWVkZWQnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2VsZWN0Um9vdEVsZW1lbnQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpLnNjcm9sbEludG9WaWV3KCk7XG4gICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gJyNlY2VjZWMnO1xuICAgIH1lbHNle1xuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpe31cbn1cbiJdfQ==