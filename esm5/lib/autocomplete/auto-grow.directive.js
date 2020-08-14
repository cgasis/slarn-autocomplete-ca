import { __decorate } from "tslib";
import { Directive, ElementRef, HostListener, Input } from "@angular/core";
var AutoGrowDirective = /** @class */ (function () {
    function AutoGrowDirective(elem) {
        this.elem = elem;
        this.activated = true;
    }
    AutoGrowDirective.prototype.autoGrow = function () {
        if (this.activated) {
            var input = this.elem.nativeElement;
            this.fireAutoGrow(input);
        }
    };
    AutoGrowDirective.prototype.fireAutoGrow = function (input) {
        var pad_right = 5;
        var tmp = document.createElement('div');
        tmp.style.padding = '0';
        if (getComputedStyle)
            tmp.style.cssText = getComputedStyle(input, null).cssText;
        if (input.currentStyle)
            tmp.style.cssText = input.currentStyle.cssText;
        tmp.style.width = '';
        tmp.style.position = 'absolute';
        tmp.innerHTML = input.value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(/ /g, '&nbsp;');
        input.parentNode.appendChild(tmp);
        var width = tmp.clientWidth + pad_right + 1;
        tmp.parentNode.removeChild(tmp);
        input.style.width = width + 'px';
    };
    AutoGrowDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input('activated')
    ], AutoGrowDirective.prototype, "activated", void 0);
    __decorate([
        HostListener('keyup'),
        HostListener('keydown'),
        HostListener('keypress ')
    ], AutoGrowDirective.prototype, "autoGrow", null);
    AutoGrowDirective = __decorate([
        Directive({
            selector: '[autoGrow]',
        })
    ], AutoGrowDirective);
    return AutoGrowDirective;
}());
export { AutoGrowDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1ncm93LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3NsYXJuLWF1dG9jb21wbGV0ZS1jYS8iLCJzb3VyY2VzIjpbImxpYi9hdXRvY29tcGxldGUvYXV0by1ncm93LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQU16RTtJQUVFLDJCQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBRGhCLGNBQVMsR0FBWSxJQUFJLENBQUM7SUFDUixDQUFDO0lBS3ZDLG9DQUFRLEdBQVI7UUFDRSxJQUFHLElBQUksQ0FBQyxTQUFTLEVBQUM7WUFDaEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDcEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxQjtJQUNILENBQUM7SUFFTyx3Q0FBWSxHQUFwQixVQUFxQixLQUFLO1FBQ3hCLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNsQixJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUN4QixJQUFHLGdCQUFnQjtZQUNqQixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQzVELElBQUcsS0FBSyxDQUFDLFlBQVk7WUFDbkIsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUM7UUFDakQsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUVoQyxHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLO2FBQ3hCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDO2FBQ3RCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDO2FBQ3ZCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDO2FBQ3ZCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQ3pCO1FBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEMsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLFdBQVcsR0FBQyxTQUFTLEdBQUMsQ0FBQyxDQUFDO1FBQ3hDLEdBQUcsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBQyxJQUFJLENBQUM7SUFDakMsQ0FBQzs7Z0JBcEN5QixVQUFVOztJQURoQjtRQUFuQixLQUFLLENBQUMsV0FBVyxDQUFDO3dEQUEyQjtJQU05QztRQUhDLFlBQVksQ0FBQyxPQUFPLENBQUM7UUFDckIsWUFBWSxDQUFDLFNBQVMsQ0FBQztRQUN2QixZQUFZLENBQUMsV0FBVyxDQUFDO3FEQU16QjtJQVpVLGlCQUFpQjtRQUo3QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsWUFBWTtTQUV2QixDQUFDO09BQ1csaUJBQWlCLENBdUM3QjtJQUFELHdCQUFDO0NBQUEsQUF2Q0QsSUF1Q0M7U0F2Q1ksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2F1dG9Hcm93XScsXG5cbn0pXG5leHBvcnQgY2xhc3MgQXV0b0dyb3dEaXJlY3RpdmV7XG4gIEBJbnB1dCgnYWN0aXZhdGVkJykgYWN0aXZhdGVkOiBib29sZWFuID0gdHJ1ZTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtOiBFbGVtZW50UmVmKXt9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5dXAnKVxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJylcbiAgQEhvc3RMaXN0ZW5lcigna2V5cHJlc3MgJylcbiAgYXV0b0dyb3coKXtcbiAgICBpZih0aGlzLmFjdGl2YXRlZCl7XG4gICAgICBsZXQgaW5wdXQgPSB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudDtcbiAgICAgIHRoaXMuZmlyZUF1dG9Hcm93KGlucHV0KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGZpcmVBdXRvR3JvdyhpbnB1dCl7XG4gICAgbGV0IHBhZF9yaWdodCA9IDU7XG4gICAgbGV0IHRtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRtcC5zdHlsZS5wYWRkaW5nID0gJzAnO1xuICAgIGlmKGdldENvbXB1dGVkU3R5bGUpXG4gICAgICB0bXAuc3R5bGUuY3NzVGV4dCA9IGdldENvbXB1dGVkU3R5bGUoaW5wdXQsIG51bGwpLmNzc1RleHQ7XG4gICAgaWYoaW5wdXQuY3VycmVudFN0eWxlKVxuICAgICAgdG1wLnN0eWxlLmNzc1RleHQgPSBpbnB1dC5jdXJyZW50U3R5bGUuY3NzVGV4dDtcbiAgICB0bXAuc3R5bGUud2lkdGggPSAnJztcbiAgICB0bXAuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXG4gICAgdG1wLmlubmVySFRNTCA9IGlucHV0LnZhbHVlXG4gICAgICAucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpXG4gICAgICAucmVwbGFjZSgvPC9nLCBcIiZsdDtcIilcbiAgICAgIC5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKVxuICAgICAgLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpXG4gICAgICAucmVwbGFjZSgvJy9nLCBcIiYjMDM5O1wiKVxuICAgICAgLnJlcGxhY2UoLyAvZywgJyZuYnNwOycpXG4gICAgO1xuXG4gICAgaW5wdXQucGFyZW50Tm9kZS5hcHBlbmRDaGlsZCh0bXApO1xuICAgIGxldCB3aWR0aCA9IHRtcC5jbGllbnRXaWR0aCtwYWRfcmlnaHQrMTtcbiAgICB0bXAucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0bXApO1xuICAgIGlucHV0LnN0eWxlLndpZHRoID0gd2lkdGgrJ3B4JztcbiAgfVxufVxuIl19