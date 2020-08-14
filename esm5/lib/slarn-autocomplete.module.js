import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlarnAutocompleteComponent, SlarnAutocompleteSuggestionComponent } from './autocomplete/slarn-autocomplete.component';
import { ACService } from './autocomplete/slarn-autocomplete.service';
import { HttpClientModule } from '@angular/common/http';
import { AutoGrowDirective } from "./autocomplete/auto-grow.directive";
import { FocusedDirective } from "./autocomplete/focus.directive";
import { RenderSafelyPipe } from "./autocomplete/render-safely.pipe";
var SlarnAutocompleteModule = /** @class */ (function () {
    function SlarnAutocompleteModule() {
    }
    SlarnAutocompleteModule = __decorate([
        NgModule({
            imports: [
                CommonModule, HttpClientModule
            ],
            declarations: [
                SlarnAutocompleteComponent, SlarnAutocompleteSuggestionComponent, AutoGrowDirective, FocusedDirective, RenderSafelyPipe
            ],
            providers: [ACService],
            exports: [
                SlarnAutocompleteComponent
            ]
        })
    ], SlarnAutocompleteModule);
    return SlarnAutocompleteModule;
}());
export { SlarnAutocompleteModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xhcm4tYXV0b2NvbXBsZXRlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3NsYXJuLWF1dG9jb21wbGV0ZS1jYS8iLCJzb3VyY2VzIjpbImxpYi9zbGFybi1hdXRvY29tcGxldGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsb0NBQW9DLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUMvSCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDckUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDaEUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFjbkU7SUFBQTtJQUF1QyxDQUFDO0lBQTNCLHVCQUF1QjtRQVpuQyxRQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsWUFBWSxFQUFFLGdCQUFnQjthQUMvQjtZQUNELFlBQVksRUFBRTtnQkFDWiwwQkFBMEIsRUFBRSxvQ0FBb0MsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0I7YUFDeEg7WUFDRCxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDdEIsT0FBTyxFQUFFO2dCQUNQLDBCQUEwQjthQUMzQjtTQUNGLENBQUM7T0FDVyx1QkFBdUIsQ0FBSTtJQUFELDhCQUFDO0NBQUEsQUFBeEMsSUFBd0M7U0FBM0IsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFNsYXJuQXV0b2NvbXBsZXRlQ29tcG9uZW50LCBTbGFybkF1dG9jb21wbGV0ZVN1Z2dlc3Rpb25Db21wb25lbnQgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS9zbGFybi1hdXRvY29tcGxldGUuY29tcG9uZW50JztcbmltcG9ydCB7IEFDU2VydmljZSB9IGZyb20gJy4vYXV0b2NvbXBsZXRlL3NsYXJuLWF1dG9jb21wbGV0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge0F1dG9Hcm93RGlyZWN0aXZlfSBmcm9tIFwiLi9hdXRvY29tcGxldGUvYXV0by1ncm93LmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHtGb2N1c2VkRGlyZWN0aXZlfSBmcm9tIFwiLi9hdXRvY29tcGxldGUvZm9jdXMuZGlyZWN0aXZlXCI7XG5pbXBvcnQge1JlbmRlclNhZmVseVBpcGV9IGZyb20gXCIuL2F1dG9jb21wbGV0ZS9yZW5kZXItc2FmZWx5LnBpcGVcIjtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSwgSHR0cENsaWVudE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBTbGFybkF1dG9jb21wbGV0ZUNvbXBvbmVudCwgU2xhcm5BdXRvY29tcGxldGVTdWdnZXN0aW9uQ29tcG9uZW50LCBBdXRvR3Jvd0RpcmVjdGl2ZSwgRm9jdXNlZERpcmVjdGl2ZSwgUmVuZGVyU2FmZWx5UGlwZVxuICBdLFxuICBwcm92aWRlcnM6IFtBQ1NlcnZpY2VdLFxuICBleHBvcnRzOiBbXG4gICAgU2xhcm5BdXRvY29tcGxldGVDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBTbGFybkF1dG9jb21wbGV0ZU1vZHVsZSB7IH1cbiJdfQ==