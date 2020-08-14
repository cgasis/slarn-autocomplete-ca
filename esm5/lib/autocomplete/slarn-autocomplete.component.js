import { __decorate, __values } from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild, forwardRef, ViewChildren } from '@angular/core';
import { ACService } from './slarn-autocomplete.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ACTranslator, dynamic_translation, translator } from "./translation";
var SlarnAutocompleteComponent = /** @class */ (function () {
    function SlarnAutocompleteComponent(_service) {
        var _this = this;
        this._service = _service;
        /**
         * list contains code of keys that will trigger the search function
         * and the keys that represent navigation action
         * @link https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
         */
        this._keys = {
            searchTriggerKeys: [46, 222, 8, 32],
            navigationKeys: [38, 40, 13] // up, down, enter
        };
        this.propagateChange = null;
        this.typingTimer = null;
        this.doneTypingInterval = 250;
        this._selectedIndexFromNavigation = -1;
        // private _isLocalConfig: boolean;
        this.displaySuggestions = false;
        this.loadingData = false;
        this.filteredItems = [];
        this.groups = null;
        this.translator = translator;
        this.unselectable = [];
        this.onItemSelected = new EventEmitter();
        /**
         * Listener to check if user clicked outside of the autocomplete
         * If he did then we should hide the suggestion list
         * So we make sure that the autocomplete acts like any other list
         */
        this.checkIfClickedInside = function (event) {
            var isClickInside = _this.container.nativeElement.contains(event.target);
            if (!isClickInside)
                _this.displaySuggestions = false;
            else
                _this.autocompleteInput.nativeElement.focus();
        };
        // require('style-loader!./../../themes/default.css');
    }
    SlarnAutocompleteComponent_1 = SlarnAutocompleteComponent;
    Object.defineProperty(SlarnAutocompleteComponent.prototype, "selectedId", {
        /**
         * Return the selected key(s)
         */
        get: function () {
            return this._selectedId;
        },
        set: function (value) {
            this.filterSelectedValue(value);
            this.searchAndSelectItemFromKey();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Filter given value and make sure that the autocomplete gets the correct data
     * to work as expected
     * @param value
     */
    SlarnAutocompleteComponent.prototype.filterSelectedValue = function (value) {
        this._selectedId = value;
        // after setting key value we search for the related item
        if (this.configuration.multiple && !Array.isArray(value)) {
            // console.log('multiple autocomplete and value not an array, converting _selectedId to array and push the value');
            this._selectedId = [];
            this._selectedId.push(value);
        }
        if (!this.configuration.multiple && Array.isArray(value))
            throw new Error(this.translator.dictionary.errors.passingArrayValueWithNoMultipleOption[this.configuration.language]);
        if ((Array.isArray(value) && this.arrayHasObject(value))
            || (!Array.isArray(value) && typeof value === 'object'))
            throw new Error(this.translator.dictionary.errors.unknownType[this.configuration.language]);
    };
    /**
     * Check array contain one or many objects
     * @param value
     */
    SlarnAutocompleteComponent.prototype.arrayHasObject = function (value) {
        var hasObject = false;
        value.forEach(function (e) {
            if (typeof e === 'object')
                hasObject = true;
        });
        return hasObject;
    };
    Object.defineProperty(SlarnAutocompleteComponent.prototype, "selectedData", {
        /**
         * Return the selected item(s)
         */
        get: function () {
            return (Array.isArray(this._selectedItem)) ? this.extractSelectedItems() : this._selectedItem;
        },
        enumerable: true,
        configurable: true
    });
    SlarnAutocompleteComponent.prototype.ngOnInit = function () {
        this.initConfiguration();
    };
    SlarnAutocompleteComponent.prototype.ngAfterViewInit = function () {
        this.extractTemplateVariables();
        // I called this listener in ngAfterViewInit because I don't want the listener
        // to be set one time
        // ngOnInit is fired after ngOnChanges which is called after any change in the view
        if (!this.disabled)
            document.addEventListener('click', this.checkIfClickedInside, true);
    };
    /**
     * Clear autocomplete selection
     */
    SlarnAutocompleteComponent.prototype.clearAutocomplete = function () {
        this.autocompleteInput.nativeElement.value = '';
        this._selectedItem = null;
        this._selectedId = null;
        this.filteredItems = [];
    };
    /**
     * Hide or display suggestions list
     */
    SlarnAutocompleteComponent.prototype.toggleDisplaySuggestions = function () {
        if (!this.displaySuggestions) {
            this.openSuggestions();
        }
        else {
            this.closeSuggestions();
        }
    };
    /**
     * Init default configuration
     */
    SlarnAutocompleteComponent.prototype.initConfiguration = function () {
        if (!this.configuration.rtl)
            this.configuration.rtl = false;
        this.prepareUsedLanguage();
        if (!this.configuration.multiple)
            this.configuration.multiple = false;
        if (!this.configuration.template)
            this.configuration.template = '<div>#' + this.configuration.value + '#</div>';
        if (!this.configuration.minCharacters)
            this.configuration.minCharacters = 1;
        if (!this.configuration.loadingView)
            this.configuration.loadingView = translator.dictionary.loadingText[this.configuration.language];
    };
    SlarnAutocompleteComponent.prototype.prepareUsedLanguage = function () {
        if (!this.configuration.language)
            this.configuration.language = ACTranslator.EN;
        if (this.configuration.language && translator.availableLanguages.indexOf(this.configuration.language) == -1) {
            var translation = dynamic_translation(this.translator.dictionary.errors.unknownLanguage[ACTranslator.EN], [this.configuration.language, JSON.stringify(translator.availableLanguages)]);
            throw new Error(translation);
        }
    };
    /**
     * Search and select item by key value
     */
    SlarnAutocompleteComponent.prototype.searchAndSelectItemFromKey = function () {
        if (this.configuration.data) { // if it's local configuration
            this.selectItemFromData(this.configuration.data);
        }
        else if (this.configuration.url) { // if it's remote configuration
            this.searchRemotely('', this.configuration.url, true);
        }
    };
    /**
     * Search and select item from data by the value of the key
     * @param data: any[]
     */
    SlarnAutocompleteComponent.prototype.selectItemFromData = function (data) {
        var _this = this;
        if (this.configuration.multiple) {
            this._selectedItem = [];
            var counter_1 = 0;
            data.forEach(function (item) {
                if (_this._selectedId.includes(item[_this.configuration.key])) {
                    var si = { elem: item, indexInFilteredItems: counter_1 };
                    _this._selectedItem.push(si);
                }
                counter_1++;
            });
        }
        else {
            this._selectedItem = null;
            data.forEach(function (item) {
                if (item[_this.configuration.key] == _this._selectedId) {
                    _this._selectedItem = item;
                    _this.autocompleteInput.nativeElement.value = _this._selectedItem[_this.configuration.value];
                }
            });
        }
        // make sure to dispatch data after selection
        this.dispatchData();
    };
    /**
     * Extract available keys from template
     * will be used to dislay data in the suggestions panel
     */
    SlarnAutocompleteComponent.prototype.extractTemplateVariables = function () {
        // Regex to find the words between to #
        // may contain numbers and dots
        var regx = /\#(?:[a-zA-Z0-9_\.]+)\#/g;
        // get matched result
        this._templateVariables = this.configuration.template.match(regx);
    };
    /**
     * fired each time a user press a key
     * @param $event
     */
    SlarnAutocompleteComponent.prototype.onKeyup = function ($event) {
        var _this = this;
        if (this.fireSearchKey($event)) {
            var reg_1 = $event.target.value;
            if (reg_1 == '') {
                this.displaySuggestions = false;
                if (!this.configuration.multiple) {
                    this.clearAutocomplete();
                    this.dispatchData();
                }
            }
            else {
                if (this.configuration.data) { // if it's local configuration
                    this.displaySuggestions = true;
                    this.searchLocally(reg_1, this.configuration.data);
                }
                else if (this.configuration.url) { // if it's remote configuration
                    // when working remotely and for better user experience
                    // the searchRemotely function will be fired when user finish typing
                    // and we assume that finishing typing means not pressing key for like 250ms
                    if (this.configuration.minCharacters <= reg_1.length) { // make sure to call api after typing the need number of characters
                        this.displaySuggestions = true;
                        this.loadingData = true;
                        this.filteredItems = [];
                        if (this.typingTimer != null)
                            clearTimeout(this.typingTimer);
                        this.typingTimer = setTimeout(function () {
                            _this.searchRemotely(reg_1, _this.configuration.url);
                        }, this.doneTypingInterval);
                    }
                }
            }
        }
        else if (this.navigationKey($event)) {
            $event.preventDefault();
            this.navigate($event.which);
        }
    };
    SlarnAutocompleteComponent.prototype.navigate = function (key) {
        this.clearAllSelections();
        switch (key) {
            case 38: // up key pressed
                if (this._selectedIndexFromNavigation > 0)
                    this._selectedIndexFromNavigation--;
                this.enableSelectionForSelectedSuggestion(this._selectedIndexFromNavigation);
                break;
            case 40: // down key pressed
                if (this._selectedIndexFromNavigation < this.filteredItems.length - 1)
                    this._selectedIndexFromNavigation++;
                this.enableSelectionForSelectedSuggestion(this._selectedIndexFromNavigation);
                break;
            case 13: // enter key pressed
                var item = (this.configuration.group == null) ?
                    this.filteredItems[this._selectedIndexFromNavigation] :
                    // in case of using group _selectedIndexFromNavigation does not map with the correct index of filteredItems
                    // that's why we do an extra work to get the correct item from the available index
                    this.getItemFromGroup(this._selectedIndexFromNavigation);
                this.performSelection(item);
                break;
        }
    };
    /**
     * Get the right selected item when pressing enter key
     * @param i
     * @returns right item
     */
    SlarnAutocompleteComponent.prototype.getItemFromGroup = function (i) {
        var e_1, _b, e_2, _c;
        var counter = 0;
        var selectedItem = null;
        console.log('groups', this.groups);
        try {
            for (var _d = __values(this.groups), _e = _d.next(); !_e.done; _e = _d.next()) {
                var grp = _e.value;
                console.log('grp', grp);
                var _a = this.filteredGroupedItems[grp];
                try {
                    for (var _a_1 = (e_2 = void 0, __values(_a)), _a_1_1 = _a_1.next(); !_a_1_1.done; _a_1_1 = _a_1.next()) {
                        var item = _a_1_1.value;
                        if (i == counter)
                            selectedItem = item;
                        counter++;
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_a_1_1 && !_a_1_1.done && (_c = _a_1.return)) _c.call(_a_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return selectedItem;
    };
    SlarnAutocompleteComponent.prototype.enableSelectionForSelectedSuggestion = function (index) {
        var sg = this.suggestions.find(function (e, i, array) {
            return (i == index);
        });
        sg.focusSuggestion = true;
    };
    /**
     *
     */
    SlarnAutocompleteComponent.prototype.clearAllSelections = function () {
        this.suggestions.forEach(function (sg, index, array) {
            sg.focusSuggestion = false;
        });
    };
    /**
     * Delete item from selected list and dispatch changes
     * @param indexInSelectedItems
     * @param si
     */
    SlarnAutocompleteComponent.prototype.deleteFromSelectedItems = function (indexInSelectedItems, si) {
        this._selectedItem.splice(indexInSelectedItems, 1);
        this.filteredItems.splice(si.indexInFilteredItems, 0, si.elem);
        this.buildGroupsIfNeeded();
        this._selectedId.splice(indexInSelectedItems, 1);
        if (this._selectedItem.length == 0) {
            this._selectedItem = null;
            this._selectedId = null;
        }
        this.dispatchData();
    };
    /**
     * After key down clear used timer to calculate
     * when user finished typing
     */
    SlarnAutocompleteComponent.prototype.onKeyDown = function ($event) {
        if (this.typingTimer != null)
            clearTimeout(this.typingTimer);
    };
    /**
     * Check if this an alphabet or number key
     * @param $event keyup event
     * @return fireKeySearch
     */
    SlarnAutocompleteComponent.prototype.fireSearchKey = function ($event) {
        return (($event.which <= 105 && $event.which >= 48) ||
            (this._keys.searchTriggerKeys.indexOf($event.which) > -1));
    };
    /**
     * Check if pressed key is a navigation key
     * @param $event
     * @returns
     */
    SlarnAutocompleteComponent.prototype.navigationKey = function ($event) {
        return (this._keys.navigationKeys.indexOf($event.which) > -1);
    };
    /**
     * If it's a local configuration then we will search inside the configuration.data object
     * @param word word to search
     * @param data filtered data
     */
    SlarnAutocompleteComponent.prototype.searchLocally = function (word, data) {
        var _this = this;
        this.filteredItems = [];
        data.forEach(function (item) {
            var _str = JSON.stringify(item);
            if (_str.toLowerCase().indexOf(word.toLowerCase()) != -1 // if word exist in item
                && !_this.existInSelectedItems(item) // and does not exist in selected items
            )
                _this.filteredItems.push(item); // then add it to filteredItems to be displayed in suggestions list
            _this.buildGroupsIfNeeded();
        });
    };
    /**
     * Check if given item exist in _selectedItem array ot not
     * @param item
     */
    SlarnAutocompleteComponent.prototype.existInSelectedItems = function (item) {
        var _this = this;
        var exist;
        if (!Array.isArray(this._selectedItem)) {
            exist = false;
        }
        else {
            exist = (this._selectedItem.find(function (si) {
                return si.elem[_this.configuration.key] === item[_this.configuration.key];
            }) != undefined);
        }
        return exist;
    };
    /**
     * If it's a remote configuration then we get the word and add it to the url
     * before sending the request to the api
     * @param word word to search
     * @param url api url
     * @param selectItemAfterSearch
     */
    SlarnAutocompleteComponent.prototype.searchRemotely = function (word, url, selectItemAfterSearch) {
        var _this = this;
        this.loadingData = true;
        this.filteredItems = [];
        this._service.search(word, url).subscribe(function (res) {
            // only push items who are not in _selectedItems list
            res.forEach(function (item) {
                if (!_this.existInSelectedItems(item))
                    _this.filteredItems.push(item);
            });
            if (selectItemAfterSearch)
                _this.selectItemFromData(_this.filteredItems);
            _this.buildGroupsIfNeeded();
            _this.loadingData = false;
        });
    };
    /**
     * If grouping is requested by the user then we need to prepare it
     */
    SlarnAutocompleteComponent.prototype.buildGroupsIfNeeded = function () {
        if (this.configuration.group != null) {
            // console.log('before grouping', this.filteredItems);
            this.groups = [];
            this.filteredGroupedItems = {};
            var groupedData_1 = this.group(this.filteredItems, this.configuration.group.field);
            var self_1 = this;
            Object.keys(groupedData_1).sort().forEach(function (key) {
                self_1.filteredGroupedItems[key] = groupedData_1[key];
            });
            this.groups = Object.keys(this.filteredGroupedItems);
            // console.log('filteredGroupedItems', this.filteredGroupedItems);
            // console.log('groups', this.groups);
        }
    };
    /**
     * Pares array of items and return grouped object by the given field
     * @param list
     * @param keyGetter
     * @returns Grouped object
     */
    SlarnAutocompleteComponent.prototype.group = function (list, keyGetter) {
        if (typeof keyGetter === 'undefined')
            throw new Error(this.translator.dictionary.errors.unknownFieldForGroupOption[this.configuration.language]);
        var map = {};
        list.forEach(function (item) {
            var key = keyGetter(item);
            if (!(key in map))
                map[key] = [];
            map[key].push(item);
        });
        return map;
    };
    /**
     * Build view with data based on the given template
     * @param object
     * @return string built view
     */
    SlarnAutocompleteComponent.prototype.buildSuggestionView = function (object) {
        var _this = this;
        // console.log('object.toString()', object.toString());
        var view = this.configuration.template;
        this._templateVariables.forEach(function (res) {
            var key = res.replace(/\#/g, ''); // remove # from the string
            var value = _this.extractValue(key, object);
            view = view.replace(res, value); // replace words with object value
        });
        return view;
    };
    /**
     * Build the view of the group based on giving template
     * @param group
     * @returns
     */
    SlarnAutocompleteComponent.prototype.buildGroupView = function (group) {
        var template;
        if (!this.configuration.group.template || this.configuration.group.template == '')
            template = '<div style="background: #a7a3a3;padding: 5px;font-weight: bold;color: #fff;">#__group__#</div>';
        else
            template = this.configuration.group.template;
        return template.replace('#__group__#', group);
    };
    /**
     * Check if item is listed as unselectable item
     * by checking if it exist in this.unselectable array
     *
     * @param item
     */
    SlarnAutocompleteComponent.prototype.isItemUnselectable = function (item) {
        return (this.unselectable.includes(item[this.configuration.key]));
    };
    /**
     * Extract the correct value from the multidimensional object
     * @param keysString: string with keys separated by dots
     * @param object
     * @returns correct value
     */
    SlarnAutocompleteComponent.prototype.extractValue = function (keysString, object) {
        var _this = this;
        var result = null;
        var keys = keysString.split('.');
        var size = keys.length;
        var counter = 1;
        var _currentObject = object;
        keys.forEach(function (key) {
            if (!(key in _currentObject)) {
                var translation = dynamic_translation(_this.translator.dictionary.errors.unknownKeyValue[_this.configuration.language], [key, JSON.stringify(_currentObject)]);
                throw new Error(translation);
            }
            if (counter < size) {
                _currentObject = _currentObject[key];
            }
            else {
                result = _currentObject[key];
            }
            counter++;
        });
        return result;
    };
    /**
     * Triggered after a user select a suggestion
     * @param item selected item from the list
     */
    SlarnAutocompleteComponent.prototype.performSelection = function (item) {
        var _this = this;
        // console.log('selected item', item);
        if (this.configuration.multiple) {
            var index = this.filteredItems.findIndex(function (e) { return e[_this.configuration.key] == item[_this.configuration.key]; });
            // console.log('index', index);
            if (this._selectedItem == null)
                this._selectedItem = [];
            var o = { elem: item, indexInFilteredItems: index };
            console.log('o', o);
            this._selectedItem.push(o);
            this.filteredItems.splice(index, 1);
            if (this.filteredItems.length == 0)
                this.displaySuggestions = false; // if filteredItems list is empty then hide suggestions list
            this.buildGroupsIfNeeded();
            if (this._selectedId == null)
                this._selectedId = [];
            this._selectedId.push(item[this.configuration.key]);
            this.autocompleteInput.nativeElement.value = '';
        }
        else {
            this._selectedItem = item;
            this._selectedId = item[this.configuration.key];
            this.autocompleteInput.nativeElement.value = this._selectedItem[this.configuration.value];
            this.displaySuggestions = false;
        }
        this._selectedIndexFromNavigation = -1;
        this.dispatchData();
    };
    /**
     * Dispatch data to external components
     */
    SlarnAutocompleteComponent.prototype.dispatchData = function () {
        // emit the whole object when item selected
        if (Array.isArray(this._selectedItem))
            this.onItemSelected.emit(this.extractSelectedItems());
        else
            this.onItemSelected.emit(this._selectedItem);
        // propagate only the key to the form
        // console.log('propagation _selectedId: ' + this._selectedId);
        if (this.propagateChange != null)
            this.propagateChange(this._selectedId);
    };
    /**
     * Extract items from _selectedItems
     */
    SlarnAutocompleteComponent.prototype.extractSelectedItems = function () {
        var items = [];
        this._selectedItem.forEach(function (si) {
            items.push(si.elem);
        });
        return items;
    };
    SlarnAutocompleteComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    SlarnAutocompleteComponent.prototype.registerOnTouched = function (fn) { };
    SlarnAutocompleteComponent.prototype.writeValue = function (value) {
        // after setting key value we search for the related item
        if (value != '' && value != null && value != undefined) {
            this.filterSelectedValue(value);
            this.searchAndSelectItemFromKey();
        }
        else {
            this.clearAutocomplete();
            this.dispatchData();
        }
    };
    //======================================================================
    //        FUNCTIONS FOR EXTERNAL USAGE
    //======================================================================
    /**
     * Open suggestions list
     */
    SlarnAutocompleteComponent.prototype.openSuggestions = function () {
        if (this.disabled)
            return;
        if (!this.displaySuggestions) {
            this.displaySuggestions = true;
            if (this.configuration.data) { // if it's local configuration
                this.searchLocally('', this.configuration.data);
            }
            else if (this.configuration.url) { // if it's remote configuration
                this.searchRemotely('', this.configuration.url);
            }
        }
    };
    /**
     * Close suggestions list
     */
    SlarnAutocompleteComponent.prototype.closeSuggestions = function () {
        this.displaySuggestions = false;
    };
    /**
     * Add new item to data
     * If there is another item with the same "key" value then the it will not be added
     * @param item
     * @param selectIt boolean: select the item after adding if true (false by default)
     */
    SlarnAutocompleteComponent.prototype.appendItem = function (item, selectIt) {
        if (this.configuration.data) {
            selectIt = (typeof selectIt === 'undefined') ? false : selectIt;
            var i = this.findItem(this.configuration.data, item);
            if (i == undefined) {
                this.configuration.data.push(item);
                if (selectIt)
                    this.performSelection(item);
            }
            else {
                var translation = dynamic_translation(this.translator.dictionary.errors.duplicateItemDetected[this.configuration.language], [JSON.stringify(i), JSON.stringify(item)]);
                throw new Error(translation);
            }
        }
        else {
            throw new Error(this.translator.dictionary.errors.appendItemWorkOnlyLocally[this.configuration.language]);
        }
    };
    /**
     * Find if item already exist in data
     * @param data
     * @param item
     * @returns
     */
    SlarnAutocompleteComponent.prototype.findItem = function (data, item) {
        var _this = this;
        return data.find(function (elem) {
            return (elem[_this.configuration.key] == item[_this.configuration.key]);
        });
    };
    var SlarnAutocompleteComponent_1;
    SlarnAutocompleteComponent.ctorParameters = function () { return [
        { type: ACService }
    ]; };
    __decorate([
        ViewChild('autocompleteInput')
    ], SlarnAutocompleteComponent.prototype, "autocompleteInput", void 0);
    __decorate([
        ViewChild('displayAllBtn')
    ], SlarnAutocompleteComponent.prototype, "displayAllBtn", void 0);
    __decorate([
        ViewChild('container')
    ], SlarnAutocompleteComponent.prototype, "container", void 0);
    __decorate([
        ViewChild('spanX')
    ], SlarnAutocompleteComponent.prototype, "spanX", void 0);
    __decorate([
        ViewChildren('acsuggestion')
    ], SlarnAutocompleteComponent.prototype, "suggestions", void 0);
    __decorate([
        Input('configuration')
    ], SlarnAutocompleteComponent.prototype, "configuration", void 0);
    __decorate([
        Input('disabled')
    ], SlarnAutocompleteComponent.prototype, "disabled", void 0);
    __decorate([
        Input('unselectable')
    ], SlarnAutocompleteComponent.prototype, "unselectable", void 0);
    __decorate([
        Output('onItemSelected')
    ], SlarnAutocompleteComponent.prototype, "onItemSelected", void 0);
    __decorate([
        Input()
    ], SlarnAutocompleteComponent.prototype, "selectedId", null);
    SlarnAutocompleteComponent = SlarnAutocompleteComponent_1 = __decorate([
        Component({
            selector: 'slarn-autocomplete',
            template: "<div #container class=\"slarn-autocomplete-container\" [ngClass]=\"{'container-rtl-direction': configuration.rtl, 'container-ltr-direction': !configuration.rtl}\">\n  <div class=\"curtan\" *ngIf=\"disabled\"></div>\n  <!-- Hidden select will contain the key(s) of the selected item(s) -->\n  <select\n    [attr.name]=\"(configuration.name) ? configuration.name : null\"\n    [attr.multiple]=\"(configuration.multiple) ? 'multiple' : null\">\n    <ng-container *ngIf=\"configuration.multiple && _selectedItem != null\">\n      <option *ngFor=\"let item of _selectedItem\" [value]=\"(!configuration.multiple) ? item[configuration.key] : item.elem[configuration.key] \" selected>\n        {{item[configuration.key]}}\n      </option>\n    </ng-container>\n    <ng-container *ngIf=\"!configuration.multiple\">\n      <option [value]=\"(_selectedItem) ? _selectedItem[configuration.key] : ''\" selected>\n        {{(_selectedItem) ? _selectedItem[configuration.value] : '' }}\n      </option>\n    </ng-container>\n  </select>\n\n  <!-- When autocomplete is multiple _selectedItems will be displayed here -->\n  <ng-container *ngIf=\"configuration.multiple && _selectedItem != null\">\n        <span class=\"selected-options unselectable-text\"\n              [ngClass]=\"{'selected-options-rtl': configuration.rtl, 'selected-options-ltr': !configuration.rtl}\"\n              *ngFor=\"let si of _selectedItem; let o = index;\">\n            <span class=\"text\" *ngIf=\"si.elem != undefined\">{{si.elem[configuration.value]}}</span> <span class=\"remove\"\n                                                                                                          (click)=\"deleteFromSelectedItems(o, si)\">&nbsp;</span>\n        </span>\n  </ng-container>\n\n  <!-- Autocomplete input will be visible to the user and contain the value -->\n  <input #autocompleteInput id=\"ac\" type=\"text\" autocomplete=\"off\" autoGrow [activated]=\"configuration.multiple\"\n         [style.width]=\"(configuration.multiple) ? '10px' : '100%'\"\n         (keyup)=\"onKeyup($event)\" (keydown)=\"onKeyDown($event)\"\n         [attr.value]=\"(!configuration.multiple && _selectedItem != null) ? _selectedItem[configuration.value] : null\">\n  <span #spanX style=\"display: none;\"></span>\n\n  <!-- Display all button -->\n  <button #displayAllBtn\n          class=\"toggle-suggestions-display\"\n          (click)=\"toggleDisplaySuggestions()\"\n          [style.right]=\"(!configuration.rtl) ? '0': null\" [style.left]=\"(configuration.rtl) ? '0': null\">\n  </button>\n\n  <!-- Suggestions container -->\n  <div class=\"suggestions\" [style.display]=\"(displaySuggestions) ? 'block' : 'none'\">\n    <!--============== Suggestions list ====================-->\n    <!-- Display suggestions without grouping -->\n    <ng-container *ngIf=\"configuration.group == null\">\n      <slarn-ac-suggestion \n          #acsuggestion \n          *ngFor=\"let e of filteredItems; let i = index;\" [item]=\"e\"\n          [unselectable]=\"isItemUnselectable(e)\"\n          (onSuggestionClicked)=\"performSelection($event)\">\n        <div [innerHTML]=\"buildSuggestionView(e) | renderSafely\"></div>\n      </slarn-ac-suggestion>\n    </ng-container>\n\n    <!-- Display suggestions with grouping -->\n    <ng-container *ngIf=\"configuration.group != null\">\n      <div *ngFor=\"let g of groups\">\n        <div [innerHTML]=\"buildGroupView(g) | renderSafely\"></div>\n        <slarn-ac-suggestion #acsuggestion *ngFor=\"let e of filteredGroupedItems[g]; let i = index;\" [item]=\"e\"\n                             (onSuggestionClicked)=\"performSelection($event)\">\n          <div [innerHTML]=\"buildSuggestionView(e) | renderSafely\"></div>\n        </slarn-ac-suggestion>\n      </div>\n    </ng-container>\n    <!--============== End Suggestions list =================-->\n\n    <!-- Displayed when no match found -->\n    <div #emptyResult *ngIf=\"filteredItems != null && filteredItems.length == 0 && !loadingData\"\n         class=\"no-match-found\">\n      <ng-content select=\".empty-result-view\"></ng-content>\n      <ng-container *ngIf=\"emptyResult.children.length == 0\">{{translator.dictionary.noMatchFoundText[configuration.language]}}</ng-container>\n    </div>\n\n    <!--  Displayed when loading data from api -->\n    <ng-container *ngIf=\"configuration.loadingView\">\n      <div *ngIf=\"loadingData\"\n           class=\"loading-data\"\n           [innerHTML]=\"configuration.loadingView | renderSafely\">\n      </div>\n    </ng-container>\n  </div>\n</div>\n",
            providers: [{
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return SlarnAutocompleteComponent_1; }),
                    multi: true
                }],
            styles: [".slarn-autocomplete-container{padding-top:0;margin:0;position:relative}.slarn-autocomplete-container .curtan{position:absolute;background:rgba(255,255,255,.47);width:100%;z-index:1;left:-.5px;height:100%;cursor:not-allowed}.unselectable-text{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none}.container-rtl-direction{padding-left:15px;padding-right:3px;direction:rtl}.container-ltr-direction{padding-left:3px;padding-right:15px}.slarn-autocomplete-container select{display:none}.slarn-autocomplete-container input{margin-bottom:1px;display:table-cell;width:10px;box-sizing:border-box;border:none;min-height:28px;background-color:transparent}.slarn-autocomplete-container input:focus{outline:0}.slarn-autocomplete-container .selected-options{font-size:14px;margin-bottom:3px;display:inline-block}.selected-options-rtl{margin-left:5px}.selected-options-ltr{margin-right:5px}.slarn-autocomplete-container .selected-options .text{padding:2px;cursor:default}.slarn-autocomplete-container .selected-options .remove{border-right:none;border-top:none;border-bottom:none;cursor:pointer;padding-left:10px;padding-right:3px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAW0lEQVR4AWMYWUCAGmr4gfgeEPfjUdMPVcNPyLB2IP6Pw7B+qFw7bu2ENbSji5FqWAMQN8JdSSaYBjKAIkMQrkIYRKkhjQS9RnlgUx79jdRMkLzUyCKCDCMHAABoYiU8YS3zcAAAAABJRU5ErkJggg==);background-repeat:no-repeat;background-position:center;background-size:70%}.slarn-autocomplete-container .suggestions{position:absolute;width:100%;background:#fff;z-index:2;display:block;max-height:200px;overflow-y:auto;left:-1px}.loading-data,.slarn-autocomplete-container .no-match-found{padding:5px}.slarn-autocomplete-container .toggle-suggestions-display{position:absolute;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiBwcLEx22EzYqAAAAW0lEQVQoz2NgGAyAm2EFgxBWGRGG1QysTAxfGZ4z7MGiRIRhH8Mdht8QTj/DOTQlwgwXGdqRBVCVCDNcQJVGVSLEcB5TGqEEpzRMyTnc0gwMDAytDPV0DWSiAAC0ghX2P8wBMwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wNy0wN1QxMToxOToyOSswMjowMHRLTC0AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDctMDdUMTE6MTk6MjkrMDI6MDAFFvSRAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==);background-repeat:no-repeat;background-position:center center;cursor:pointer;width:30px;background-color:transparent}.slarn-autocomplete-container .toggle-suggestions-display:hover{background-color:#ececec}"]
        })
    ], SlarnAutocompleteComponent);
    return SlarnAutocompleteComponent;
}());
export { SlarnAutocompleteComponent };
/**
 * Suggestion component for Autocomplete
 */
var SlarnAutocompleteSuggestionComponent = /** @class */ (function () {
    function SlarnAutocompleteSuggestionComponent() {
        this.unselectable = false;
        this.onSuggestionClicked = new EventEmitter();
        this.focusSuggestion = false;
    }
    SlarnAutocompleteSuggestionComponent.prototype.ngOnInit = function () { };
    SlarnAutocompleteSuggestionComponent.prototype.selectItem = function () {
        if (!this.unselectable)
            this.onSuggestionClicked.emit(this.item);
        else
            console.log('this item is unselectable', this.item);
    };
    __decorate([
        Input('item')
    ], SlarnAutocompleteSuggestionComponent.prototype, "item", void 0);
    __decorate([
        Input('unselectable')
    ], SlarnAutocompleteSuggestionComponent.prototype, "unselectable", void 0);
    __decorate([
        Output('onSuggestionClicked')
    ], SlarnAutocompleteSuggestionComponent.prototype, "onSuggestionClicked", void 0);
    SlarnAutocompleteSuggestionComponent = __decorate([
        Component({
            selector: 'slarn-ac-suggestion',
            template: "\n    <div [class.unselectable]=\"unselectable\" class=\"sg\" (click)=\"selectItem()\" [focused]=\"focusSuggestion\">\n      <div *ngIf=\"unselectable\" class=\"suggestion-curtain\"></div>\n      <div class=\"content\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  ",
            styles: ["\n    .sg {\n      cursor: default;\n      position: relative;\n    }\n\n    .sg .content{\n      padding: 5px;\n    }\n\n    .sg .suggestion-curtain{\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      background: #ffffffa3;\n      cursor: not-allowed;\n    }\n\n    .sg:not(.unselectable):hover {\n      background: #ececec;\n    }\n\n  "]
        })
    ], SlarnAutocompleteSuggestionComponent);
    return SlarnAutocompleteSuggestionComponent;
}());
export { SlarnAutocompleteSuggestionComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xhcm4tYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3NsYXJuLWF1dG9jb21wbGV0ZS1jYS8iLCJzb3VyY2VzIjpbImxpYi9hdXRvY29tcGxldGUvc2xhcm4tYXV0b2NvbXBsZXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEVBQ1QsVUFBVSxFQUFFLFlBQVksRUFDekIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ3ZELE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBQUMsWUFBWSxFQUFFLG1CQUFtQixFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQWE1RTtJQXNDRSxvQ0FBb0IsUUFBbUI7UUFBdkMsaUJBRUM7UUFGbUIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQWpDdkM7Ozs7V0FJRztRQUNLLFVBQUssR0FBRztZQUNkLGlCQUFpQixFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ25DLGNBQWMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUEsa0JBQWtCO1NBQy9DLENBQUM7UUFDTSxvQkFBZSxHQUFRLElBQUksQ0FBQztRQUM1QixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQix1QkFBa0IsR0FBRyxHQUFHLENBQUM7UUFDekIsaUNBQTRCLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDbEQsbUNBQW1DO1FBRW5DLHVCQUFrQixHQUFZLEtBQUssQ0FBQztRQUNwQyxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixrQkFBYSxHQUFlLEVBQUUsQ0FBQztRQUMvQixXQUFNLEdBQWtCLElBQUksQ0FB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LG9DQUFvQyxDQWNoRDtJQUFELDJDQUFDO0NBQUEsQUFkRCxJQWNDO1NBZFksb0NBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkLFxuICBmb3J3YXJkUmVmLCBWaWV3Q2hpbGRyZW4sIFF1ZXJ5TGlzdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QUNTZXJ2aWNlfSBmcm9tICcuL3NsYXJuLWF1dG9jb21wbGV0ZS5zZXJ2aWNlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0FDVHJhbnNsYXRvciwgZHluYW1pY190cmFuc2xhdGlvbiwgdHJhbnNsYXRvcn0gZnJvbSBcIi4vdHJhbnNsYXRpb25cIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2xhcm4tYXV0b2NvbXBsZXRlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NsYXJuLWF1dG9jb21wbGV0ZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NsYXJuLWF1dG9jb21wbGV0ZS5jb21wb25lbnQuY3NzJ10sXG4gIHByb3ZpZGVyczogW3tcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBTbGFybkF1dG9jb21wbGV0ZUNvbXBvbmVudCksXG4gICAgbXVsdGk6IHRydWVcbiAgfV0sXG4gIC8vIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLkVtdWxhdGVkLFxufSlcbmV4cG9ydCBjbGFzcyBTbGFybkF1dG9jb21wbGV0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBwcml2YXRlIF90ZW1wbGF0ZVZhcmlhYmxlczogUmVnRXhwTWF0Y2hBcnJheTtcbiAgcHJpdmF0ZSBfc2VsZWN0ZWRJZDogbnVtYmVyIHwgc3RyaW5nIHwgQXJyYXk8bnVtYmVyIHwgc3RyaW5nPjtcbiAgX3NlbGVjdGVkSXRlbTogYW55IHwgQXJyYXk8U2VsZWN0ZWRJdGVtPjtcblxuICAvKipcbiAgICogbGlzdCBjb250YWlucyBjb2RlIG9mIGtleXMgdGhhdCB3aWxsIHRyaWdnZXIgdGhlIHNlYXJjaCBmdW5jdGlvblxuICAgKiBhbmQgdGhlIGtleXMgdGhhdCByZXByZXNlbnQgbmF2aWdhdGlvbiBhY3Rpb25cbiAgICogQGxpbmsgaHR0cHM6Ly93d3cuY2FtYmlhcmVzZWFyY2guY29tL2FydGljbGVzLzE1L2phdmFzY3JpcHQtY2hhci1jb2Rlcy1rZXktY29kZXNcbiAgICovXG4gIHByaXZhdGUgX2tleXMgPSB7XG4gICAgc2VhcmNoVHJpZ2dlcktleXM6IFs0NiwgMjIyLCA4LCAzMl0sXG4gICAgbmF2aWdhdGlvbktleXM6IFszOCwgNDAsIDEzXS8vIHVwLCBkb3duLCBlbnRlclxuICB9O1xuICBwcml2YXRlIHByb3BhZ2F0ZUNoYW5nZTogYW55ID0gbnVsbDtcbiAgcHJpdmF0ZSB0eXBpbmdUaW1lciA9IG51bGw7XG4gIHByaXZhdGUgZG9uZVR5cGluZ0ludGVydmFsID0gMjUwO1xuICBwcml2YXRlIF9zZWxlY3RlZEluZGV4RnJvbU5hdmlnYXRpb246IG51bWJlciA9IC0xO1xuICAvLyBwcml2YXRlIF9pc0xvY2FsQ29uZmlnOiBib29sZWFuO1xuXG4gIGRpc3BsYXlTdWdnZXN0aW9uczogYm9vbGVhbiA9IGZhbHNlO1xuICBsb2FkaW5nRGF0YTogYm9vbGVhbiA9IGZhbHNlO1xuICBmaWx0ZXJlZEl0ZW1zOiBBcnJheTxhbnk+ID0gW107XG4gIGdyb3VwczogQXJyYXk8c3RyaW5nPiA9IG51bGw7XG4gIGZpbHRlcmVkR3JvdXBlZEl0ZW1zOiBhbnk7XG4gIHRyYW5zbGF0b3IgPSB0cmFuc2xhdG9yO1xuXG4gIEBWaWV3Q2hpbGQoJ2F1dG9jb21wbGV0ZUlucHV0JykgYXV0b2NvbXBsZXRlSW5wdXQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2Rpc3BsYXlBbGxCdG4nKSBkaXNwbGF5QWxsQnRuOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdjb250YWluZXInKSBjb250YWluZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3NwYW5YJykgc3Bhblg6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGRyZW4oJ2Fjc3VnZ2VzdGlvbicpIHN1Z2dlc3Rpb25zOiBRdWVyeUxpc3Q8U2xhcm5BdXRvY29tcGxldGVTdWdnZXN0aW9uQ29tcG9uZW50PjtcblxuICBASW5wdXQoJ2NvbmZpZ3VyYXRpb24nKSBjb25maWd1cmF0aW9uOiBhbnk7XG4gIEBJbnB1dCgnZGlzYWJsZWQnKSBkaXNhYmxlZDogYm9vbGVhbjtcbiAgQElucHV0KCd1bnNlbGVjdGFibGUnKSB1bnNlbGVjdGFibGU6IEFycmF5PHN0cmluZyB8IG51bWJlcj4gPSBbXTtcbiAgQE91dHB1dCgnb25JdGVtU2VsZWN0ZWQnKSBvbkl0ZW1TZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogQUNTZXJ2aWNlKSB7XG4gICAgLy8gcmVxdWlyZSgnc3R5bGUtbG9hZGVyIS4vLi4vLi4vdGhlbWVzL2RlZmF1bHQuY3NzJyk7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgc2VsZWN0ZWRJZCh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nIHwgQXJyYXk8bnVtYmVyIHwgc3RyaW5nPikge1xuICAgIHRoaXMuZmlsdGVyU2VsZWN0ZWRWYWx1ZSh2YWx1ZSk7XG4gICAgdGhpcy5zZWFyY2hBbmRTZWxlY3RJdGVtRnJvbUtleSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbHRlciBnaXZlbiB2YWx1ZSBhbmQgbWFrZSBzdXJlIHRoYXQgdGhlIGF1dG9jb21wbGV0ZSBnZXRzIHRoZSBjb3JyZWN0IGRhdGFcbiAgICogdG8gd29yayBhcyBleHBlY3RlZFxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIHByaXZhdGUgZmlsdGVyU2VsZWN0ZWRWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuX3NlbGVjdGVkSWQgPSB2YWx1ZTtcbiAgICAvLyBhZnRlciBzZXR0aW5nIGtleSB2YWx1ZSB3ZSBzZWFyY2ggZm9yIHRoZSByZWxhdGVkIGl0ZW1cbiAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uLm11bHRpcGxlICYmICFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgLy8gY29uc29sZS5sb2coJ211bHRpcGxlIGF1dG9jb21wbGV0ZSBhbmQgdmFsdWUgbm90IGFuIGFycmF5LCBjb252ZXJ0aW5nIF9zZWxlY3RlZElkIHRvIGFycmF5IGFuZCBwdXNoIHRoZSB2YWx1ZScpO1xuICAgICAgdGhpcy5fc2VsZWN0ZWRJZCA9IFtdO1xuICAgICAgdGhpcy5fc2VsZWN0ZWRJZC5wdXNoKHZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuY29uZmlndXJhdGlvbi5tdWx0aXBsZSAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLnRyYW5zbGF0b3IuZGljdGlvbmFyeS5lcnJvcnMucGFzc2luZ0FycmF5VmFsdWVXaXRoTm9NdWx0aXBsZU9wdGlvblt0aGlzLmNvbmZpZ3VyYXRpb24ubGFuZ3VhZ2VdKTtcblxuICAgIGlmICgoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdGhpcy5hcnJheUhhc09iamVjdCh2YWx1ZSkpXG4gICAgICB8fCAoIUFycmF5LmlzQXJyYXkodmFsdWUpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMudHJhbnNsYXRvci5kaWN0aW9uYXJ5LmVycm9ycy51bmtub3duVHlwZVt0aGlzLmNvbmZpZ3VyYXRpb24ubGFuZ3VhZ2VdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBhcnJheSBjb250YWluIG9uZSBvciBtYW55IG9iamVjdHNcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBwcml2YXRlIGFycmF5SGFzT2JqZWN0KHZhbHVlOiBBcnJheTxhbnk+KSB7XG4gICAgbGV0IGhhc09iamVjdCA9IGZhbHNlO1xuICAgIHZhbHVlLmZvckVhY2goZSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGUgPT09ICdvYmplY3QnKSBoYXNPYmplY3QgPSB0cnVlO1xuICAgIH0pO1xuICAgIHJldHVybiBoYXNPYmplY3Q7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBzZWxlY3RlZCBrZXkocylcbiAgICovXG4gIGdldCBzZWxlY3RlZElkKCk6IG51bWJlciB8IHN0cmluZyB8IEFycmF5PG51bWJlciB8IHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZElkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgc2VsZWN0ZWQgaXRlbShzKVxuICAgKi9cbiAgZ2V0IHNlbGVjdGVkRGF0YSgpOiBhbnkge1xuICAgIHJldHVybiAoQXJyYXkuaXNBcnJheSh0aGlzLl9zZWxlY3RlZEl0ZW0pKSA/IHRoaXMuZXh0cmFjdFNlbGVjdGVkSXRlbXMoKSA6IHRoaXMuX3NlbGVjdGVkSXRlbTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaW5pdENvbmZpZ3VyYXRpb24oKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmV4dHJhY3RUZW1wbGF0ZVZhcmlhYmxlcygpO1xuXG4gICAgLy8gSSBjYWxsZWQgdGhpcyBsaXN0ZW5lciBpbiBuZ0FmdGVyVmlld0luaXQgYmVjYXVzZSBJIGRvbid0IHdhbnQgdGhlIGxpc3RlbmVyXG4gICAgLy8gdG8gYmUgc2V0IG9uZSB0aW1lXG4gICAgLy8gbmdPbkluaXQgaXMgZmlyZWQgYWZ0ZXIgbmdPbkNoYW5nZXMgd2hpY2ggaXMgY2FsbGVkIGFmdGVyIGFueSBjaGFuZ2UgaW4gdGhlIHZpZXdcbiAgICBpZighdGhpcy5kaXNhYmxlZCkgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNoZWNrSWZDbGlja2VkSW5zaWRlLCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5lciB0byBjaGVjayBpZiB1c2VyIGNsaWNrZWQgb3V0c2lkZSBvZiB0aGUgYXV0b2NvbXBsZXRlXG4gICAqIElmIGhlIGRpZCB0aGVuIHdlIHNob3VsZCBoaWRlIHRoZSBzdWdnZXN0aW9uIGxpc3RcbiAgICogU28gd2UgbWFrZSBzdXJlIHRoYXQgdGhlIGF1dG9jb21wbGV0ZSBhY3RzIGxpa2UgYW55IG90aGVyIGxpc3RcbiAgICovXG4gIGNoZWNrSWZDbGlja2VkSW5zaWRlID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgIGxldCBpc0NsaWNrSW5zaWRlID0gdGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpO1xuICAgIGlmICghaXNDbGlja0luc2lkZSkgdGhpcy5kaXNwbGF5U3VnZ2VzdGlvbnMgPSBmYWxzZTtcbiAgICBlbHNlIHRoaXMuYXV0b2NvbXBsZXRlSW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDbGVhciBhdXRvY29tcGxldGUgc2VsZWN0aW9uXG4gICAqL1xuICBjbGVhckF1dG9jb21wbGV0ZSgpIHtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICB0aGlzLl9zZWxlY3RlZEl0ZW0gPSBudWxsO1xuICAgIHRoaXMuX3NlbGVjdGVkSWQgPSBudWxsO1xuICAgIHRoaXMuZmlsdGVyZWRJdGVtcyA9IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIEhpZGUgb3IgZGlzcGxheSBzdWdnZXN0aW9ucyBsaXN0XG4gICAqL1xuICB0b2dnbGVEaXNwbGF5U3VnZ2VzdGlvbnMoKSB7XG4gICAgaWYgKCF0aGlzLmRpc3BsYXlTdWdnZXN0aW9ucykge1xuICAgICAgdGhpcy5vcGVuU3VnZ2VzdGlvbnMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jbG9zZVN1Z2dlc3Rpb25zKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXQgZGVmYXVsdCBjb25maWd1cmF0aW9uXG4gICAqL1xuICBwcml2YXRlIGluaXRDb25maWd1cmF0aW9uKCkge1xuICAgIGlmICghdGhpcy5jb25maWd1cmF0aW9uLnJ0bCkgdGhpcy5jb25maWd1cmF0aW9uLnJ0bCA9IGZhbHNlO1xuICAgIHRoaXMucHJlcGFyZVVzZWRMYW5ndWFnZSgpO1xuICAgIGlmICghdGhpcy5jb25maWd1cmF0aW9uLm11bHRpcGxlKSB0aGlzLmNvbmZpZ3VyYXRpb24ubXVsdGlwbGUgPSBmYWxzZTtcbiAgICBpZiAoIXRoaXMuY29uZmlndXJhdGlvbi50ZW1wbGF0ZSkgdGhpcy5jb25maWd1cmF0aW9uLnRlbXBsYXRlID0gJzxkaXY+IycgKyB0aGlzLmNvbmZpZ3VyYXRpb24udmFsdWUgKyAnIzwvZGl2Pic7XG4gICAgaWYgKCEoPEFDUmVtb3RlQ29uZmlndXJhdGlvbj4gdGhpcy5jb25maWd1cmF0aW9uKS5taW5DaGFyYWN0ZXJzKSAoPEFDUmVtb3RlQ29uZmlndXJhdGlvbj4gdGhpcy5jb25maWd1cmF0aW9uKS5taW5DaGFyYWN0ZXJzID0gMTtcbiAgICBpZiAoISg8QUNSZW1vdGVDb25maWd1cmF0aW9uPiB0aGlzLmNvbmZpZ3VyYXRpb24pLmxvYWRpbmdWaWV3KVxuICAgICAgKDxBQ1JlbW90ZUNvbmZpZ3VyYXRpb24+IHRoaXMuY29uZmlndXJhdGlvbikubG9hZGluZ1ZpZXcgPSB0cmFuc2xhdG9yLmRpY3Rpb25hcnkubG9hZGluZ1RleHRbdGhpcy5jb25maWd1cmF0aW9uLmxhbmd1YWdlXTtcbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZVVzZWRMYW5ndWFnZSgpe1xuICAgIGlmKCF0aGlzLmNvbmZpZ3VyYXRpb24ubGFuZ3VhZ2UpIHRoaXMuY29uZmlndXJhdGlvbi5sYW5ndWFnZSA9IEFDVHJhbnNsYXRvci5FTjtcbiAgICBpZih0aGlzLmNvbmZpZ3VyYXRpb24ubGFuZ3VhZ2UgJiYgdHJhbnNsYXRvci5hdmFpbGFibGVMYW5ndWFnZXMuaW5kZXhPZih0aGlzLmNvbmZpZ3VyYXRpb24ubGFuZ3VhZ2UpID09IC0xKXtcbiAgICAgIGxldCB0cmFuc2xhdGlvbiA9IGR5bmFtaWNfdHJhbnNsYXRpb24oXG4gICAgICAgIHRoaXMudHJhbnNsYXRvci5kaWN0aW9uYXJ5LmVycm9ycy51bmtub3duTGFuZ3VhZ2VbQUNUcmFuc2xhdG9yLkVOXSxcbiAgICAgICAgW3RoaXMuY29uZmlndXJhdGlvbi5sYW5ndWFnZSwgSlNPTi5zdHJpbmdpZnkodHJhbnNsYXRvci5hdmFpbGFibGVMYW5ndWFnZXMpXVxuICAgICAgKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcih0cmFuc2xhdGlvbik7XG4gICAgfVxuXG4gIH1cblxuICAvKipcbiAgICogU2VhcmNoIGFuZCBzZWxlY3QgaXRlbSBieSBrZXkgdmFsdWVcbiAgICovXG4gIHByaXZhdGUgc2VhcmNoQW5kU2VsZWN0SXRlbUZyb21LZXkoKSB7XG4gICAgaWYgKCg8QUNMb2NhbENvbmZpZ3VyYXRpb24+IHRoaXMuY29uZmlndXJhdGlvbikuZGF0YSkgey8vIGlmIGl0J3MgbG9jYWwgY29uZmlndXJhdGlvblxuXG4gICAgICB0aGlzLnNlbGVjdEl0ZW1Gcm9tRGF0YSgoPEFDTG9jYWxDb25maWd1cmF0aW9uPiB0aGlzLmNvbmZpZ3VyYXRpb24pLmRhdGEpO1xuXG4gICAgfSBlbHNlIGlmICgoPEFDUmVtb3RlQ29uZmlndXJhdGlvbj4gdGhpcy5jb25maWd1cmF0aW9uKS51cmwpIHsvLyBpZiBpdCdzIHJlbW90ZSBjb25maWd1cmF0aW9uXG5cbiAgICAgIHRoaXMuc2VhcmNoUmVtb3RlbHkoJycsICg8QUNSZW1vdGVDb25maWd1cmF0aW9uPiB0aGlzLmNvbmZpZ3VyYXRpb24pLnVybCwgdHJ1ZSk7XG5cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VhcmNoIGFuZCBzZWxlY3QgaXRlbSBmcm9tIGRhdGEgYnkgdGhlIHZhbHVlIG9mIHRoZSBrZXlcbiAgICogQHBhcmFtIGRhdGE6IGFueVtdXG4gICAqL1xuICBwcml2YXRlIHNlbGVjdEl0ZW1Gcm9tRGF0YShkYXRhOiBBcnJheTxhbnk+KSB7XG5cbiAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uLm11bHRpcGxlKSB7XG4gICAgICB0aGlzLl9zZWxlY3RlZEl0ZW0gPSBbXTtcbiAgICAgIGxldCBjb3VudGVyID0gMDtcbiAgICAgIGRhdGEuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaWYgKCg8QXJyYXk8bnVtYmVyIHwgc3RyaW5nPj4gdGhpcy5fc2VsZWN0ZWRJZCkuaW5jbHVkZXMoaXRlbVt0aGlzLmNvbmZpZ3VyYXRpb24ua2V5XSkpIHtcbiAgICAgICAgICBsZXQgc2k6IFNlbGVjdGVkSXRlbSA9IHtlbGVtOiBpdGVtLCBpbmRleEluRmlsdGVyZWRJdGVtczogY291bnRlcn07XG4gICAgICAgICAgdGhpcy5fc2VsZWN0ZWRJdGVtLnB1c2goc2kpO1xuICAgICAgICB9XG4gICAgICAgIGNvdW50ZXIrKztcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZWxlY3RlZEl0ZW0gPSBudWxsO1xuICAgICAgZGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpZiAoaXRlbVt0aGlzLmNvbmZpZ3VyYXRpb24ua2V5XSA9PSB0aGlzLl9zZWxlY3RlZElkKSB7XG4gICAgICAgICAgdGhpcy5fc2VsZWN0ZWRJdGVtID0gaXRlbTtcbiAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLl9zZWxlY3RlZEl0ZW1bdGhpcy5jb25maWd1cmF0aW9uLnZhbHVlXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIC8vIG1ha2Ugc3VyZSB0byBkaXNwYXRjaCBkYXRhIGFmdGVyIHNlbGVjdGlvblxuICAgIHRoaXMuZGlzcGF0Y2hEYXRhKCk7XG4gIH1cblxuICAvKipcbiAgICogRXh0cmFjdCBhdmFpbGFibGUga2V5cyBmcm9tIHRlbXBsYXRlXG4gICAqIHdpbGwgYmUgdXNlZCB0byBkaXNsYXkgZGF0YSBpbiB0aGUgc3VnZ2VzdGlvbnMgcGFuZWxcbiAgICovXG4gIHByaXZhdGUgZXh0cmFjdFRlbXBsYXRlVmFyaWFibGVzKCkge1xuICAgIC8vIFJlZ2V4IHRvIGZpbmQgdGhlIHdvcmRzIGJldHdlZW4gdG8gI1xuICAgIC8vIG1heSBjb250YWluIG51bWJlcnMgYW5kIGRvdHNcbiAgICBjb25zdCByZWd4ID0gL1xcIyg/OlthLXpBLVowLTlfXFwuXSspXFwjL2c7XG5cbiAgICAvLyBnZXQgbWF0Y2hlZCByZXN1bHRcbiAgICB0aGlzLl90ZW1wbGF0ZVZhcmlhYmxlcyA9IHRoaXMuY29uZmlndXJhdGlvbi50ZW1wbGF0ZS5tYXRjaChyZWd4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBmaXJlZCBlYWNoIHRpbWUgYSB1c2VyIHByZXNzIGEga2V5XG4gICAqIEBwYXJhbSAkZXZlbnRcbiAgICovXG4gIG9uS2V5dXAoJGV2ZW50KSB7XG5cbiAgICBpZiAodGhpcy5maXJlU2VhcmNoS2V5KCRldmVudCkpIHtcbiAgICAgIGNvbnN0IHJlZyA9ICRldmVudC50YXJnZXQudmFsdWU7XG4gICAgICBpZiAocmVnID09ICcnKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheVN1Z2dlc3Rpb25zID0gZmFsc2U7XG4gICAgICAgIGlmICghdGhpcy5jb25maWd1cmF0aW9uLm11bHRpcGxlKSB7XG5cbiAgICAgICAgICB0aGlzLmNsZWFyQXV0b2NvbXBsZXRlKCk7XG4gICAgICAgICAgdGhpcy5kaXNwYXRjaERhdGEoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBpZiAoKDxBQ0xvY2FsQ29uZmlndXJhdGlvbj4gdGhpcy5jb25maWd1cmF0aW9uKS5kYXRhKSB7Ly8gaWYgaXQncyBsb2NhbCBjb25maWd1cmF0aW9uXG4gICAgICAgICAgdGhpcy5kaXNwbGF5U3VnZ2VzdGlvbnMgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuc2VhcmNoTG9jYWxseShyZWcsICg8QUNMb2NhbENvbmZpZ3VyYXRpb24+IHRoaXMuY29uZmlndXJhdGlvbikuZGF0YSk7XG5cbiAgICAgICAgfSBlbHNlIGlmICgoPEFDUmVtb3RlQ29uZmlndXJhdGlvbj4gdGhpcy5jb25maWd1cmF0aW9uKS51cmwpIHsvLyBpZiBpdCdzIHJlbW90ZSBjb25maWd1cmF0aW9uXG4gICAgICAgICAgLy8gd2hlbiB3b3JraW5nIHJlbW90ZWx5IGFuZCBmb3IgYmV0dGVyIHVzZXIgZXhwZXJpZW5jZVxuICAgICAgICAgIC8vIHRoZSBzZWFyY2hSZW1vdGVseSBmdW5jdGlvbiB3aWxsIGJlIGZpcmVkIHdoZW4gdXNlciBmaW5pc2ggdHlwaW5nXG4gICAgICAgICAgLy8gYW5kIHdlIGFzc3VtZSB0aGF0IGZpbmlzaGluZyB0eXBpbmcgbWVhbnMgbm90IHByZXNzaW5nIGtleSBmb3IgbGlrZSAyNTBtc1xuICAgICAgICAgIGlmKCg8QUNSZW1vdGVDb25maWd1cmF0aW9uPiB0aGlzLmNvbmZpZ3VyYXRpb24pLm1pbkNoYXJhY3RlcnMgPD0gcmVnLmxlbmd0aCl7Ly8gbWFrZSBzdXJlIHRvIGNhbGwgYXBpIGFmdGVyIHR5cGluZyB0aGUgbmVlZCBudW1iZXIgb2YgY2hhcmFjdGVyc1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5U3VnZ2VzdGlvbnMgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nRGF0YSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmZpbHRlcmVkSXRlbXMgPSBbXTtcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGluZ1RpbWVyICE9IG51bGwpIGNsZWFyVGltZW91dCh0aGlzLnR5cGluZ1RpbWVyKTtcbiAgICAgICAgICAgIHRoaXMudHlwaW5nVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5zZWFyY2hSZW1vdGVseShyZWcsICg8QUNSZW1vdGVDb25maWd1cmF0aW9uPiB0aGlzLmNvbmZpZ3VyYXRpb24pLnVybCk7XG4gICAgICAgICAgICB9LCB0aGlzLmRvbmVUeXBpbmdJbnRlcnZhbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLm5hdmlnYXRpb25LZXkoJGV2ZW50KSkge1xuICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLm5hdmlnYXRlKCRldmVudC53aGljaCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBuYXZpZ2F0ZShrZXkpe1xuICAgIHRoaXMuY2xlYXJBbGxTZWxlY3Rpb25zKCk7XG4gICAgc3dpdGNoKGtleSl7XG4gICAgICBjYXNlIDM4Oi8vIHVwIGtleSBwcmVzc2VkXG4gICAgICAgIGlmKHRoaXMuX3NlbGVjdGVkSW5kZXhGcm9tTmF2aWdhdGlvbiA+IDApIHRoaXMuX3NlbGVjdGVkSW5kZXhGcm9tTmF2aWdhdGlvbi0tO1xuICAgICAgICB0aGlzLmVuYWJsZVNlbGVjdGlvbkZvclNlbGVjdGVkU3VnZ2VzdGlvbih0aGlzLl9zZWxlY3RlZEluZGV4RnJvbU5hdmlnYXRpb24pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDA6Ly8gZG93biBrZXkgcHJlc3NlZFxuICAgICAgICBpZih0aGlzLl9zZWxlY3RlZEluZGV4RnJvbU5hdmlnYXRpb24gPCB0aGlzLmZpbHRlcmVkSXRlbXMubGVuZ3RoIC0gMSkgdGhpcy5fc2VsZWN0ZWRJbmRleEZyb21OYXZpZ2F0aW9uKys7XG4gICAgICAgIHRoaXMuZW5hYmxlU2VsZWN0aW9uRm9yU2VsZWN0ZWRTdWdnZXN0aW9uKHRoaXMuX3NlbGVjdGVkSW5kZXhGcm9tTmF2aWdhdGlvbik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxMzovLyBlbnRlciBrZXkgcHJlc3NlZFxuICAgICAgICBsZXQgaXRlbTogYW55ID0gKHRoaXMuY29uZmlndXJhdGlvbi5ncm91cCA9PSBudWxsKSA/XG4gICAgICAgICAgdGhpcy5maWx0ZXJlZEl0ZW1zW3RoaXMuX3NlbGVjdGVkSW5kZXhGcm9tTmF2aWdhdGlvbl0gOlxuICAgICAgICAgIC8vIGluIGNhc2Ugb2YgdXNpbmcgZ3JvdXAgX3NlbGVjdGVkSW5kZXhGcm9tTmF2aWdhdGlvbiBkb2VzIG5vdCBtYXAgd2l0aCB0aGUgY29ycmVjdCBpbmRleCBvZiBmaWx0ZXJlZEl0ZW1zXG4gICAgICAgICAgLy8gdGhhdCdzIHdoeSB3ZSBkbyBhbiBleHRyYSB3b3JrIHRvIGdldCB0aGUgY29ycmVjdCBpdGVtIGZyb20gdGhlIGF2YWlsYWJsZSBpbmRleFxuICAgICAgICAgIHRoaXMuZ2V0SXRlbUZyb21Hcm91cCh0aGlzLl9zZWxlY3RlZEluZGV4RnJvbU5hdmlnYXRpb24pO1xuXG4gICAgICAgIHRoaXMucGVyZm9ybVNlbGVjdGlvbihpdGVtKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcmlnaHQgc2VsZWN0ZWQgaXRlbSB3aGVuIHByZXNzaW5nIGVudGVyIGtleVxuICAgKiBAcGFyYW0gaVxuICAgKiBAcmV0dXJucyByaWdodCBpdGVtXG4gICAqL1xuICBwcml2YXRlIGdldEl0ZW1Gcm9tR3JvdXAoaTogbnVtYmVyKXtcbiAgICBsZXQgY291bnRlciA9IDA7XG4gICAgbGV0IHNlbGVjdGVkSXRlbSA9IG51bGw7XG4gICAgY29uc29sZS5sb2coJ2dyb3VwcycsIHRoaXMuZ3JvdXBzKTtcbiAgICBmb3IobGV0IGdycCBvZiB0aGlzLmdyb3Vwcyl7XG4gICAgICBjb25zb2xlLmxvZygnZ3JwJywgZ3JwKTtcbiAgICAgIGxldCBfYTogQXJyYXk8YW55PiA9IHRoaXMuZmlsdGVyZWRHcm91cGVkSXRlbXNbZ3JwXTtcbiAgICAgIGZvcihsZXQgaXRlbSBvZiBfYSl7XG4gICAgICAgIGlmKGkgPT0gY291bnRlcikgc2VsZWN0ZWRJdGVtID0gaXRlbTtcbiAgICAgICAgY291bnRlcisrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0ZWRJdGVtO1xuICB9XG5cbiAgcHJpdmF0ZSBlbmFibGVTZWxlY3Rpb25Gb3JTZWxlY3RlZFN1Z2dlc3Rpb24oaW5kZXg6IG51bWJlcil7XG4gICAgbGV0IHNnOiBTbGFybkF1dG9jb21wbGV0ZVN1Z2dlc3Rpb25Db21wb25lbnQgPSB0aGlzLnN1Z2dlc3Rpb25zLmZpbmQoKGUsIGksIGFycmF5KSA9PiB7XG4gICAgICByZXR1cm4gKGkgPT0gaW5kZXgpO1xuICAgIH0pO1xuICAgIHNnLmZvY3VzU3VnZ2VzdGlvbiA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIHByaXZhdGUgY2xlYXJBbGxTZWxlY3Rpb25zKCl7XG4gICAgdGhpcy5zdWdnZXN0aW9ucy5mb3JFYWNoKChzZzogU2xhcm5BdXRvY29tcGxldGVTdWdnZXN0aW9uQ29tcG9uZW50LCBpbmRleDogbnVtYmVyLCBhcnJheSkgPT4ge1xuICAgICAgICBzZy5mb2N1c1N1Z2dlc3Rpb24gPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgaXRlbSBmcm9tIHNlbGVjdGVkIGxpc3QgYW5kIGRpc3BhdGNoIGNoYW5nZXNcbiAgICogQHBhcmFtIGluZGV4SW5TZWxlY3RlZEl0ZW1zXG4gICAqIEBwYXJhbSBzaVxuICAgKi9cbiAgZGVsZXRlRnJvbVNlbGVjdGVkSXRlbXMoaW5kZXhJblNlbGVjdGVkSXRlbXM6IG51bWJlciwgc2k6IFNlbGVjdGVkSXRlbSkge1xuICAgIHRoaXMuX3NlbGVjdGVkSXRlbS5zcGxpY2UoaW5kZXhJblNlbGVjdGVkSXRlbXMsIDEpO1xuICAgIHRoaXMuZmlsdGVyZWRJdGVtcy5zcGxpY2Uoc2kuaW5kZXhJbkZpbHRlcmVkSXRlbXMsIDAsIHNpLmVsZW0pO1xuICAgIHRoaXMuYnVpbGRHcm91cHNJZk5lZWRlZCgpO1xuICAgICg8QXJyYXk8bnVtYmVyIHwgc3RyaW5nPj4gdGhpcy5fc2VsZWN0ZWRJZCkuc3BsaWNlKGluZGV4SW5TZWxlY3RlZEl0ZW1zLCAxKTtcblxuICAgIGlmICh0aGlzLl9zZWxlY3RlZEl0ZW0ubGVuZ3RoID09IDApIHtcbiAgICAgIHRoaXMuX3NlbGVjdGVkSXRlbSA9IG51bGw7XG4gICAgICB0aGlzLl9zZWxlY3RlZElkID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLmRpc3BhdGNoRGF0YSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFmdGVyIGtleSBkb3duIGNsZWFyIHVzZWQgdGltZXIgdG8gY2FsY3VsYXRlXG4gICAqIHdoZW4gdXNlciBmaW5pc2hlZCB0eXBpbmdcbiAgICovXG4gIG9uS2V5RG93bigkZXZlbnQpIHtcbiAgICBpZiAodGhpcy50eXBpbmdUaW1lciAhPSBudWxsKSBjbGVhclRpbWVvdXQodGhpcy50eXBpbmdUaW1lcik7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhpcyBhbiBhbHBoYWJldCBvciBudW1iZXIga2V5XG4gICAqIEBwYXJhbSAkZXZlbnQga2V5dXAgZXZlbnRcbiAgICogQHJldHVybiBmaXJlS2V5U2VhcmNoXG4gICAqL1xuICBwcml2YXRlIGZpcmVTZWFyY2hLZXkoJGV2ZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgICgkZXZlbnQud2hpY2ggPD0gMTA1ICYmICRldmVudC53aGljaCA+PSA0OCkgfHxcbiAgICAgICh0aGlzLl9rZXlzLnNlYXJjaFRyaWdnZXJLZXlzLmluZGV4T2YoJGV2ZW50LndoaWNoKSA+IC0xKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgcHJlc3NlZCBrZXkgaXMgYSBuYXZpZ2F0aW9uIGtleVxuICAgKiBAcGFyYW0gJGV2ZW50XG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBwcml2YXRlIG5hdmlnYXRpb25LZXkoJGV2ZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICh0aGlzLl9rZXlzLm5hdmlnYXRpb25LZXlzLmluZGV4T2YoJGV2ZW50LndoaWNoKSA+IC0xKVxuICB9XG5cbiAgLyoqXG4gICAqIElmIGl0J3MgYSBsb2NhbCBjb25maWd1cmF0aW9uIHRoZW4gd2Ugd2lsbCBzZWFyY2ggaW5zaWRlIHRoZSBjb25maWd1cmF0aW9uLmRhdGEgb2JqZWN0XG4gICAqIEBwYXJhbSB3b3JkIHdvcmQgdG8gc2VhcmNoXG4gICAqIEBwYXJhbSBkYXRhIGZpbHRlcmVkIGRhdGFcbiAgICovXG4gIHByaXZhdGUgc2VhcmNoTG9jYWxseSh3b3JkOiBzdHJpbmcsIGRhdGE6IEFycmF5PGFueT4pIHtcbiAgICB0aGlzLmZpbHRlcmVkSXRlbXMgPSBbXTtcbiAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGxldCBfc3RyID0gSlNPTi5zdHJpbmdpZnkoaXRlbSk7XG4gICAgICBpZiAoXG4gICAgICAgIF9zdHIudG9Mb3dlckNhc2UoKS5pbmRleE9mKHdvcmQudG9Mb3dlckNhc2UoKSkgIT0gLTEgLy8gaWYgd29yZCBleGlzdCBpbiBpdGVtXG4gICAgICAgICYmICF0aGlzLmV4aXN0SW5TZWxlY3RlZEl0ZW1zKGl0ZW0pIC8vIGFuZCBkb2VzIG5vdCBleGlzdCBpbiBzZWxlY3RlZCBpdGVtc1xuICAgICAgKSB0aGlzLmZpbHRlcmVkSXRlbXMucHVzaChpdGVtKTsvLyB0aGVuIGFkZCBpdCB0byBmaWx0ZXJlZEl0ZW1zIHRvIGJlIGRpc3BsYXllZCBpbiBzdWdnZXN0aW9ucyBsaXN0XG5cbiAgICAgIHRoaXMuYnVpbGRHcm91cHNJZk5lZWRlZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGdpdmVuIGl0ZW0gZXhpc3QgaW4gX3NlbGVjdGVkSXRlbSBhcnJheSBvdCBub3RcbiAgICogQHBhcmFtIGl0ZW1cbiAgICovXG4gIHByaXZhdGUgZXhpc3RJblNlbGVjdGVkSXRlbXMoaXRlbTogYW55KTogYm9vbGVhbiB7XG4gICAgbGV0IGV4aXN0OiBib29sZWFuO1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLl9zZWxlY3RlZEl0ZW0pKSB7XG4gICAgICBleGlzdCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBleGlzdCA9ICh0aGlzLl9zZWxlY3RlZEl0ZW0uZmluZChzaSA9PlxuICAgICAgICBzaS5lbGVtW3RoaXMuY29uZmlndXJhdGlvbi5rZXldID09PSBpdGVtW3RoaXMuY29uZmlndXJhdGlvbi5rZXldXG4gICAgICApICE9IHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIHJldHVybiBleGlzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiBpdCdzIGEgcmVtb3RlIGNvbmZpZ3VyYXRpb24gdGhlbiB3ZSBnZXQgdGhlIHdvcmQgYW5kIGFkZCBpdCB0byB0aGUgdXJsXG4gICAqIGJlZm9yZSBzZW5kaW5nIHRoZSByZXF1ZXN0IHRvIHRoZSBhcGlcbiAgICogQHBhcmFtIHdvcmQgd29yZCB0byBzZWFyY2hcbiAgICogQHBhcmFtIHVybCBhcGkgdXJsXG4gICAqIEBwYXJhbSBzZWxlY3RJdGVtQWZ0ZXJTZWFyY2hcbiAgICovXG4gIHByaXZhdGUgc2VhcmNoUmVtb3RlbHkod29yZDogc3RyaW5nLCB1cmw6IHN0cmluZywgc2VsZWN0SXRlbUFmdGVyU2VhcmNoPzogYm9vbGVhbikge1xuICAgIHRoaXMubG9hZGluZ0RhdGEgPSB0cnVlO1xuICAgIHRoaXMuZmlsdGVyZWRJdGVtcyA9IFtdO1xuICAgIHRoaXMuX3NlcnZpY2Uuc2VhcmNoKHdvcmQsIHVybCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAvLyBvbmx5IHB1c2ggaXRlbXMgd2hvIGFyZSBub3QgaW4gX3NlbGVjdGVkSXRlbXMgbGlzdFxuICAgICAgcmVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmV4aXN0SW5TZWxlY3RlZEl0ZW1zKGl0ZW0pKSB0aGlzLmZpbHRlcmVkSXRlbXMucHVzaChpdGVtKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHNlbGVjdEl0ZW1BZnRlclNlYXJjaCkgdGhpcy5zZWxlY3RJdGVtRnJvbURhdGEodGhpcy5maWx0ZXJlZEl0ZW1zKTtcbiAgICAgIHRoaXMuYnVpbGRHcm91cHNJZk5lZWRlZCgpO1xuICAgICAgdGhpcy5sb2FkaW5nRGF0YSA9IGZhbHNlO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIElmIGdyb3VwaW5nIGlzIHJlcXVlc3RlZCBieSB0aGUgdXNlciB0aGVuIHdlIG5lZWQgdG8gcHJlcGFyZSBpdFxuICAgKi9cbiAgcHJpdmF0ZSBidWlsZEdyb3Vwc0lmTmVlZGVkKCl7XG4gICAgaWYodGhpcy5jb25maWd1cmF0aW9uLmdyb3VwICE9IG51bGwpe1xuICAgICAgLy8gY29uc29sZS5sb2coJ2JlZm9yZSBncm91cGluZycsIHRoaXMuZmlsdGVyZWRJdGVtcyk7XG4gICAgICB0aGlzLmdyb3VwcyA9IFtdO1xuICAgICAgdGhpcy5maWx0ZXJlZEdyb3VwZWRJdGVtcyA9IHt9O1xuXG4gICAgICBsZXQgZ3JvdXBlZERhdGEgPSB0aGlzLmdyb3VwKHRoaXMuZmlsdGVyZWRJdGVtcywgdGhpcy5jb25maWd1cmF0aW9uLmdyb3VwLmZpZWxkKTtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgIE9iamVjdC5rZXlzKGdyb3VwZWREYXRhKS5zb3J0KCkuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgc2VsZi5maWx0ZXJlZEdyb3VwZWRJdGVtc1trZXldID0gZ3JvdXBlZERhdGFba2V5XTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5ncm91cHMgPSBPYmplY3Qua2V5cyh0aGlzLmZpbHRlcmVkR3JvdXBlZEl0ZW1zKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdmaWx0ZXJlZEdyb3VwZWRJdGVtcycsIHRoaXMuZmlsdGVyZWRHcm91cGVkSXRlbXMpO1xuICAgICAgLy8gY29uc29sZS5sb2coJ2dyb3VwcycsIHRoaXMuZ3JvdXBzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGFyZXMgYXJyYXkgb2YgaXRlbXMgYW5kIHJldHVybiBncm91cGVkIG9iamVjdCBieSB0aGUgZ2l2ZW4gZmllbGRcbiAgICogQHBhcmFtIGxpc3RcbiAgICogQHBhcmFtIGtleUdldHRlclxuICAgKiBAcmV0dXJucyBHcm91cGVkIG9iamVjdFxuICAgKi9cbiAgcHJpdmF0ZSBncm91cChsaXN0LCBrZXlHZXR0ZXIpIHtcbiAgICBpZih0eXBlb2Yga2V5R2V0dGVyID09PSAndW5kZWZpbmVkJylcbiAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLnRyYW5zbGF0b3IuZGljdGlvbmFyeS5lcnJvcnMudW5rbm93bkZpZWxkRm9yR3JvdXBPcHRpb25bdGhpcy5jb25maWd1cmF0aW9uLmxhbmd1YWdlXSk7XG4gICAgY29uc3QgbWFwID0ge307XG4gICAgbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSBrZXlHZXR0ZXIoaXRlbSk7XG4gICAgICBpZiAoIShrZXkgaW4gbWFwKSkgbWFwW2tleV0gPSBbXTtcbiAgICAgIG1hcFtrZXldLnB1c2goaXRlbSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG1hcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZCB2aWV3IHdpdGggZGF0YSBiYXNlZCBvbiB0aGUgZ2l2ZW4gdGVtcGxhdGVcbiAgICogQHBhcmFtIG9iamVjdFxuICAgKiBAcmV0dXJuIHN0cmluZyBidWlsdCB2aWV3XG4gICAqL1xuICBidWlsZFN1Z2dlc3Rpb25WaWV3KG9iamVjdDogYW55KTogc3RyaW5nIHtcbiAgICAvLyBjb25zb2xlLmxvZygnb2JqZWN0LnRvU3RyaW5nKCknLCBvYmplY3QudG9TdHJpbmcoKSk7XG4gICAgbGV0IHZpZXc6IHN0cmluZyA9IHRoaXMuY29uZmlndXJhdGlvbi50ZW1wbGF0ZTtcbiAgICB0aGlzLl90ZW1wbGF0ZVZhcmlhYmxlcy5mb3JFYWNoKChyZXM6IHN0cmluZykgPT4ge1xuICAgICAgbGV0IGtleSA9IHJlcy5yZXBsYWNlKC9cXCMvZywgJycpOy8vIHJlbW92ZSAjIGZyb20gdGhlIHN0cmluZ1xuICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgPSB0aGlzLmV4dHJhY3RWYWx1ZShrZXksIG9iamVjdCk7XG4gICAgICB2aWV3ID0gdmlldy5yZXBsYWNlKHJlcywgdmFsdWUpOy8vIHJlcGxhY2Ugd29yZHMgd2l0aCBvYmplY3QgdmFsdWVcbiAgICB9KTtcbiAgICByZXR1cm4gdmlldztcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZCB0aGUgdmlldyBvZiB0aGUgZ3JvdXAgYmFzZWQgb24gZ2l2aW5nIHRlbXBsYXRlXG4gICAqIEBwYXJhbSBncm91cFxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgYnVpbGRHcm91cFZpZXcoZ3JvdXA6IHN0cmluZyl7XG4gICAgbGV0IHRlbXBsYXRlOiBzdHJpbmc7XG4gICAgaWYoIXRoaXMuY29uZmlndXJhdGlvbi5ncm91cC50ZW1wbGF0ZSB8fCB0aGlzLmNvbmZpZ3VyYXRpb24uZ3JvdXAudGVtcGxhdGUgPT0gJycpXG4gICAgICB0ZW1wbGF0ZSA9ICc8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZDogI2E3YTNhMztwYWRkaW5nOiA1cHg7Zm9udC13ZWlnaHQ6IGJvbGQ7Y29sb3I6ICNmZmY7XCI+I19fZ3JvdXBfXyM8L2Rpdj4nO1xuICAgIGVsc2VcbiAgICAgIHRlbXBsYXRlID0gdGhpcy5jb25maWd1cmF0aW9uLmdyb3VwLnRlbXBsYXRlO1xuICAgIHJldHVybiB0ZW1wbGF0ZS5yZXBsYWNlKCcjX19ncm91cF9fIycsIGdyb3VwKTtcbiAgfVxuICBcbiAgLyoqXG4gICAqIENoZWNrIGlmIGl0ZW0gaXMgbGlzdGVkIGFzIHVuc2VsZWN0YWJsZSBpdGVtXG4gICAqIGJ5IGNoZWNraW5nIGlmIGl0IGV4aXN0IGluIHRoaXMudW5zZWxlY3RhYmxlIGFycmF5XG4gICAqIFxuICAgKiBAcGFyYW0gaXRlbVxuICAgKi9cbiAgaXNJdGVtVW5zZWxlY3RhYmxlKGl0ZW06IGFueSl7XG4gICAgcmV0dXJuICh0aGlzLnVuc2VsZWN0YWJsZS5pbmNsdWRlcyhpdGVtW3RoaXMuY29uZmlndXJhdGlvbi5rZXldKSk7XG4gIH1cblxuICAvKipcbiAgICogRXh0cmFjdCB0aGUgY29ycmVjdCB2YWx1ZSBmcm9tIHRoZSBtdWx0aWRpbWVuc2lvbmFsIG9iamVjdFxuICAgKiBAcGFyYW0ga2V5c1N0cmluZzogc3RyaW5nIHdpdGgga2V5cyBzZXBhcmF0ZWQgYnkgZG90c1xuICAgKiBAcGFyYW0gb2JqZWN0XG4gICAqIEByZXR1cm5zIGNvcnJlY3QgdmFsdWVcbiAgICovXG4gIHByaXZhdGUgZXh0cmFjdFZhbHVlKGtleXNTdHJpbmc6IHN0cmluZywgb2JqZWN0OiBhbnkpOiBzdHJpbmcge1xuICAgIGxldCByZXN1bHQ6IHN0cmluZyA9IG51bGw7XG4gICAgbGV0IGtleXM6IEFycmF5PHN0cmluZz4gPSBrZXlzU3RyaW5nLnNwbGl0KCcuJyk7XG4gICAgbGV0IHNpemUgPSBrZXlzLmxlbmd0aDtcbiAgICBsZXQgY291bnRlciA9IDE7XG4gICAgbGV0IF9jdXJyZW50T2JqZWN0ID0gb2JqZWN0O1xuXG4gICAga2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoIShrZXkgaW4gX2N1cnJlbnRPYmplY3QpKXtcbiAgICAgICAgbGV0IHRyYW5zbGF0aW9uID0gZHluYW1pY190cmFuc2xhdGlvbihcbiAgICAgICAgICB0aGlzLnRyYW5zbGF0b3IuZGljdGlvbmFyeS5lcnJvcnMudW5rbm93bktleVZhbHVlW3RoaXMuY29uZmlndXJhdGlvbi5sYW5ndWFnZV0sXG4gICAgICAgICAgW2tleSwgSlNPTi5zdHJpbmdpZnkoX2N1cnJlbnRPYmplY3QpXVxuICAgICAgICApO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IodHJhbnNsYXRpb24pO1xuICAgICAgfVxuXG4gICAgICBpZiAoY291bnRlciA8IHNpemUpIHtcbiAgICAgICAgX2N1cnJlbnRPYmplY3QgPSBfY3VycmVudE9iamVjdFtrZXldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gX2N1cnJlbnRPYmplY3Rba2V5XTtcbiAgICAgIH1cbiAgICAgIGNvdW50ZXIrKztcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXJlZCBhZnRlciBhIHVzZXIgc2VsZWN0IGEgc3VnZ2VzdGlvblxuICAgKiBAcGFyYW0gaXRlbSBzZWxlY3RlZCBpdGVtIGZyb20gdGhlIGxpc3RcbiAgICovXG4gIHBlcmZvcm1TZWxlY3Rpb24oaXRlbTogYW55KSB7XG4gICAgLy8gY29uc29sZS5sb2coJ3NlbGVjdGVkIGl0ZW0nLCBpdGVtKTtcbiAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uLm11bHRpcGxlKSB7XG5cbiAgICAgIGxldCBpbmRleCA9IHRoaXMuZmlsdGVyZWRJdGVtcy5maW5kSW5kZXgoZSA9PiBlW3RoaXMuY29uZmlndXJhdGlvbi5rZXldID09IGl0ZW1bdGhpcy5jb25maWd1cmF0aW9uLmtleV0pO1xuICAgICAgLy8gY29uc29sZS5sb2coJ2luZGV4JywgaW5kZXgpO1xuICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkSXRlbSA9PSBudWxsKSB0aGlzLl9zZWxlY3RlZEl0ZW0gPSBbXTtcbiAgICAgIGxldCBvOiBTZWxlY3RlZEl0ZW0gPSB7ZWxlbTogaXRlbSwgaW5kZXhJbkZpbHRlcmVkSXRlbXM6IGluZGV4fTtcbiAgICAgIGNvbnNvbGUubG9nKCdvJywgbyk7XG4gICAgICB0aGlzLl9zZWxlY3RlZEl0ZW0ucHVzaChvKTtcbiAgICAgIHRoaXMuZmlsdGVyZWRJdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgaWYgKHRoaXMuZmlsdGVyZWRJdGVtcy5sZW5ndGggPT0gMCkgdGhpcy5kaXNwbGF5U3VnZ2VzdGlvbnMgPSBmYWxzZTsvLyBpZiBmaWx0ZXJlZEl0ZW1zIGxpc3QgaXMgZW1wdHkgdGhlbiBoaWRlIHN1Z2dlc3Rpb25zIGxpc3RcbiAgICAgIHRoaXMuYnVpbGRHcm91cHNJZk5lZWRlZCgpO1xuXG4gICAgICBpZiAodGhpcy5fc2VsZWN0ZWRJZCA9PSBudWxsKSB0aGlzLl9zZWxlY3RlZElkID0gW107XG4gICAgICAoPEFycmF5PG51bWJlciB8IHN0cmluZz4+IHRoaXMuX3NlbGVjdGVkSWQpLnB1c2goaXRlbVt0aGlzLmNvbmZpZ3VyYXRpb24ua2V5XSk7XG4gICAgICB0aGlzLmF1dG9jb21wbGV0ZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2VsZWN0ZWRJdGVtID0gaXRlbTtcbiAgICAgIHRoaXMuX3NlbGVjdGVkSWQgPSBpdGVtW3RoaXMuY29uZmlndXJhdGlvbi5rZXldO1xuICAgICAgdGhpcy5hdXRvY29tcGxldGVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5fc2VsZWN0ZWRJdGVtW3RoaXMuY29uZmlndXJhdGlvbi52YWx1ZV07XG4gICAgICB0aGlzLmRpc3BsYXlTdWdnZXN0aW9ucyA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLl9zZWxlY3RlZEluZGV4RnJvbU5hdmlnYXRpb24gPSAtMTtcbiAgICB0aGlzLmRpc3BhdGNoRGF0YSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoIGRhdGEgdG8gZXh0ZXJuYWwgY29tcG9uZW50c1xuICAgKi9cbiAgcHJpdmF0ZSBkaXNwYXRjaERhdGEoKSB7XG4gICAgLy8gZW1pdCB0aGUgd2hvbGUgb2JqZWN0IHdoZW4gaXRlbSBzZWxlY3RlZFxuICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuX3NlbGVjdGVkSXRlbSkpXG4gICAgICB0aGlzLm9uSXRlbVNlbGVjdGVkLmVtaXQodGhpcy5leHRyYWN0U2VsZWN0ZWRJdGVtcygpKTtcbiAgICBlbHNlXG4gICAgICB0aGlzLm9uSXRlbVNlbGVjdGVkLmVtaXQodGhpcy5fc2VsZWN0ZWRJdGVtKTtcblxuICAgIC8vIHByb3BhZ2F0ZSBvbmx5IHRoZSBrZXkgdG8gdGhlIGZvcm1cbiAgICAvLyBjb25zb2xlLmxvZygncHJvcGFnYXRpb24gX3NlbGVjdGVkSWQ6ICcgKyB0aGlzLl9zZWxlY3RlZElkKTtcbiAgICBpZiAodGhpcy5wcm9wYWdhdGVDaGFuZ2UgIT0gbnVsbCkgdGhpcy5wcm9wYWdhdGVDaGFuZ2UodGhpcy5fc2VsZWN0ZWRJZCk7XG4gIH1cblxuICAvKipcbiAgICogRXh0cmFjdCBpdGVtcyBmcm9tIF9zZWxlY3RlZEl0ZW1zXG4gICAqL1xuICBwcml2YXRlIGV4dHJhY3RTZWxlY3RlZEl0ZW1zKCkge1xuICAgIGxldCBpdGVtcyA9IFtdO1xuICAgICg8QXJyYXk8U2VsZWN0ZWRJdGVtPj4gdGhpcy5fc2VsZWN0ZWRJdGVtKS5mb3JFYWNoKHNpID0+IHtcbiAgICAgIGl0ZW1zLnB1c2goc2kuZWxlbSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGl0ZW1zO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbikge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7IH1cblxuICB3cml0ZVZhbHVlKHZhbHVlKSB7XG4gICAgLy8gYWZ0ZXIgc2V0dGluZyBrZXkgdmFsdWUgd2Ugc2VhcmNoIGZvciB0aGUgcmVsYXRlZCBpdGVtXG5cbiAgICBpZiAodmFsdWUgIT0gJycgJiYgdmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuZmlsdGVyU2VsZWN0ZWRWYWx1ZSh2YWx1ZSk7XG4gICAgICB0aGlzLnNlYXJjaEFuZFNlbGVjdEl0ZW1Gcm9tS2V5KCk7XG4gICAgfWVsc2V7XG4gICAgICB0aGlzLmNsZWFyQXV0b2NvbXBsZXRlKCk7XG4gICAgICB0aGlzLmRpc3BhdGNoRGF0YSgpO1xuICAgIH1cbiAgfVxuXG4gIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAvLyAgICAgICAgRlVOQ1RJT05TIEZPUiBFWFRFUk5BTCBVU0FHRVxuICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgLyoqXG4gICAqIE9wZW4gc3VnZ2VzdGlvbnMgbGlzdFxuICAgKi9cbiAgb3BlblN1Z2dlc3Rpb25zKCl7XG4gICAgaWYodGhpcy5kaXNhYmxlZCkgcmV0dXJuO1xuICAgIFxuICAgIGlmKCF0aGlzLmRpc3BsYXlTdWdnZXN0aW9ucyl7XG4gICAgICB0aGlzLmRpc3BsYXlTdWdnZXN0aW9ucyA9IHRydWU7XG4gICAgICBpZiAoKDxBQ0xvY2FsQ29uZmlndXJhdGlvbj4gdGhpcy5jb25maWd1cmF0aW9uKS5kYXRhKSB7Ly8gaWYgaXQncyBsb2NhbCBjb25maWd1cmF0aW9uXG5cbiAgICAgICAgdGhpcy5zZWFyY2hMb2NhbGx5KCcnLCAoPEFDTG9jYWxDb25maWd1cmF0aW9uPiB0aGlzLmNvbmZpZ3VyYXRpb24pLmRhdGEpO1xuXG4gICAgICB9IGVsc2UgaWYgKCg8QUNSZW1vdGVDb25maWd1cmF0aW9uPiB0aGlzLmNvbmZpZ3VyYXRpb24pLnVybCkgey8vIGlmIGl0J3MgcmVtb3RlIGNvbmZpZ3VyYXRpb25cblxuICAgICAgICB0aGlzLnNlYXJjaFJlbW90ZWx5KCcnLCAoPEFDUmVtb3RlQ29uZmlndXJhdGlvbj4gdGhpcy5jb25maWd1cmF0aW9uKS51cmwpO1xuXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlIHN1Z2dlc3Rpb25zIGxpc3RcbiAgICovXG4gIGNsb3NlU3VnZ2VzdGlvbnMoKXtcbiAgICB0aGlzLmRpc3BsYXlTdWdnZXN0aW9ucyA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBuZXcgaXRlbSB0byBkYXRhXG4gICAqIElmIHRoZXJlIGlzIGFub3RoZXIgaXRlbSB3aXRoIHRoZSBzYW1lIFwia2V5XCIgdmFsdWUgdGhlbiB0aGUgaXQgd2lsbCBub3QgYmUgYWRkZWRcbiAgICogQHBhcmFtIGl0ZW1cbiAgICogQHBhcmFtIHNlbGVjdEl0IGJvb2xlYW46IHNlbGVjdCB0aGUgaXRlbSBhZnRlciBhZGRpbmcgaWYgdHJ1ZSAoZmFsc2UgYnkgZGVmYXVsdClcbiAgICovXG4gIGFwcGVuZEl0ZW0oaXRlbTogYW55LCBzZWxlY3RJdDogYm9vbGVhbil7XG4gICAgaWYgKCg8QUNMb2NhbENvbmZpZ3VyYXRpb24+IHRoaXMuY29uZmlndXJhdGlvbikuZGF0YSkge1xuICAgICAgc2VsZWN0SXQgPSAodHlwZW9mIHNlbGVjdEl0ID09PSAndW5kZWZpbmVkJykgPyBmYWxzZSA6IHNlbGVjdEl0O1xuICAgICAgbGV0IGkgPXRoaXMuZmluZEl0ZW0oKDxBQ0xvY2FsQ29uZmlndXJhdGlvbj4gdGhpcy5jb25maWd1cmF0aW9uKS5kYXRhLCBpdGVtKTtcbiAgICAgIGlmKGkgPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgKDxBQ0xvY2FsQ29uZmlndXJhdGlvbj4gdGhpcy5jb25maWd1cmF0aW9uKS5kYXRhLnB1c2goaXRlbSk7XG4gICAgICAgIGlmKHNlbGVjdEl0KSB0aGlzLnBlcmZvcm1TZWxlY3Rpb24oaXRlbSk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgbGV0IHRyYW5zbGF0aW9uID0gZHluYW1pY190cmFuc2xhdGlvbihcbiAgICAgICAgICB0aGlzLnRyYW5zbGF0b3IuZGljdGlvbmFyeS5lcnJvcnMuZHVwbGljYXRlSXRlbURldGVjdGVkW3RoaXMuY29uZmlndXJhdGlvbi5sYW5ndWFnZV0sXG4gICAgICAgICAgW0pTT04uc3RyaW5naWZ5KGkpLCBKU09OLnN0cmluZ2lmeShpdGVtKV1cbiAgICAgICAgKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRyYW5zbGF0aW9uKTtcbiAgICAgIH1cblxuICAgIH1lbHNle1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMudHJhbnNsYXRvci5kaWN0aW9uYXJ5LmVycm9ycy5hcHBlbmRJdGVtV29ya09ubHlMb2NhbGx5W3RoaXMuY29uZmlndXJhdGlvbi5sYW5ndWFnZV0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGlmIGl0ZW0gYWxyZWFkeSBleGlzdCBpbiBkYXRhXG4gICAqIEBwYXJhbSBkYXRhXG4gICAqIEBwYXJhbSBpdGVtXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBwcml2YXRlIGZpbmRJdGVtKGRhdGE6IEFycmF5PGFueT4sIGl0ZW06IGFueSl7XG4gICAgcmV0dXJuIGRhdGEuZmluZChlbGVtID0+IHtcbiAgICAgIHJldHVybiAoZWxlbVt0aGlzLmNvbmZpZ3VyYXRpb24ua2V5XSA9PSBpdGVtW3RoaXMuY29uZmlndXJhdGlvbi5rZXldKTtcbiAgICB9KTtcbiAgfVxufVxuXG5cbi8qKlxuICogU3VnZ2VzdGlvbiBjb21wb25lbnQgZm9yIEF1dG9jb21wbGV0ZVxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzbGFybi1hYy1zdWdnZXN0aW9uJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtjbGFzcy51bnNlbGVjdGFibGVdPVwidW5zZWxlY3RhYmxlXCIgY2xhc3M9XCJzZ1wiIChjbGljayk9XCJzZWxlY3RJdGVtKClcIiBbZm9jdXNlZF09XCJmb2N1c1N1Z2dlc3Rpb25cIj5cbiAgICAgIDxkaXYgKm5nSWY9XCJ1bnNlbGVjdGFibGVcIiBjbGFzcz1cInN1Z2dlc3Rpb24tY3VydGFpblwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlczogW2BcbiAgICAuc2cge1xuICAgICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIH1cblxuICAgIC5zZyAuY29udGVudHtcbiAgICAgIHBhZGRpbmc6IDVweDtcbiAgICB9XG5cbiAgICAuc2cgLnN1Z2dlc3Rpb24tY3VydGFpbntcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgYmFja2dyb3VuZDogI2ZmZmZmZmEzO1xuICAgICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbiAgICB9XG5cbiAgICAuc2c6bm90KC51bnNlbGVjdGFibGUpOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQ6ICNlY2VjZWM7XG4gICAgfVxuXG4gIGBdLFxufSlcbmV4cG9ydCBjbGFzcyBTbGFybkF1dG9jb21wbGV0ZVN1Z2dlc3Rpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoJ2l0ZW0nKSBpdGVtOiBhbnk7XG4gIEBJbnB1dCgndW5zZWxlY3RhYmxlJykgdW5zZWxlY3RhYmxlOiBib29sZWFuID0gZmFsc2U7XG4gIEBPdXRwdXQoJ29uU3VnZ2VzdGlvbkNsaWNrZWQnKSBvblN1Z2dlc3Rpb25DbGlja2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgZm9jdXNTdWdnZXN0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHsgfVxuXG4gIHNlbGVjdEl0ZW0oKSB7XG4gICAgaWYoIXRoaXMudW5zZWxlY3RhYmxlKSB0aGlzLm9uU3VnZ2VzdGlvbkNsaWNrZWQuZW1pdCh0aGlzLml0ZW0pO1xuICAgIGVsc2UgY29uc29sZS5sb2coJ3RoaXMgaXRlbSBpcyB1bnNlbGVjdGFibGUnLCB0aGlzLml0ZW0pO1xuICB9XG59XG5cbi8qKlxuICogQXV0b0NvbXBsZXRlIGNvbmZpZ3VyYXRpb25cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb25maWd1cmF0aW9uIHtcbiAgLyoqXG4gICAqIGtleSB3aWxsIGJlIHN0b3JlZCBpbiB0aGUgaW5wdXRcbiAgICogbXVzdCBiZSB0aGUgdW5pcXVlIHZhbHVlIG9mIHRoZSBvYmplY3QgKGV4OiBpZClcbiAgICogd2lsbCBiZSB1c2VkIHRvIHNlYXJjaCBpdGVtIGFuZCB3aGVuIHNlbmRpbmcgZm9ybVxuICAgKi9cbiAga2V5OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIHZhbHVlIHdpbGwgYmUgZGlzcGxheWVkIHRvIHRoZSB1c2VyIGluIHRoZSBpbnB1dFxuICAgKi9cbiAgdmFsdWU6IHN0cmluZztcblxuICAvKipcbiAgICogdGVtcGxhdGUgdGhhdCB3aWxsIGJlIGRpc3BsYXllZCBpbiB0aGUgc3VnZ2VzdGlvbnMgbGlzdFxuICAgKiBpZiB0aGlzIGF0dHJpYnV0ZSBpcyBub3QgZGVmaW5lZCB0aGVuIHRoZSBhdXRvY29tcGxldGUgd2lsbFxuICAgKiB1c2UgdGhlIGRlZmF1bHQgdGVtcGxhdGUgYW5kIGRpc3BsYXkgb25seSB0aGUgdmFsdWVcbiAgICovXG4gIHRlbXBsYXRlPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgbGFuZ3VhZ2UgdGhhdCB3aWxsIGJlIHVzZWQgdG8gZGlzcGxheSBkZWZhdWx0IHRleHRzIGFuZCBlcnJvcnNcbiAgICovXG4gIGxhbmd1YWdlPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBSVEwgU3VwcG9ydCAoZmFsc2UgYnkgZGVmYXVsdClcbiAgICovXG4gIHJ0bD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIG5hbWUgd2lsbCBiZSBnaXZpbmcgdG8gdGhlIGlucHV0XG4gICAqL1xuICBuYW1lPzogc3RyaW5nXG5cbiAgLyoqXG4gICAqIGFsbG93IG11bHRpcGxlIHNlbGVjdGlvbiAoZGVmYXVsdDogZmFsc2UpXG4gICAqL1xuICBtdWx0aXBsZT86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIGFsbG93IHRvIGdyb3VwIGl0ZW1zIGJ5IGEgc3BlY2lmaWMgZmllbGRcbiAgICovXG4gIGdyb3VwPzogR3JvdXA7XG59XG5cbi8qKlxuICogUmVtb3RlIGNvbmZpZ3VyYXRpb24gdXNlZCB3aGVuIHlvdSB3YW50IHRvIHdvcmsgcmVtb3RlbHkgd2l0aCBhbiBhcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBQ1JlbW90ZUNvbmZpZ3VyYXRpb24gZXh0ZW5kcyBDb25maWd1cmF0aW9uIHtcbiAgLyoqXG4gICAqIFVSTCB0byB0aGUgQVBJXG4gICAqL1xuICB1cmw6IHN0cmluZztcblxuICAvKipcbiAgICogbnVtYmVyIG9mIGNoYXJhY3RlcnMgbmVlZGVkIGJlZm9yZSBjYWxsaW5nIGFwaVxuICAgKi9cbiAgbWluQ2hhcmFjdGVycz86IG51bWJlcjtcblxuICAvKipcbiAgICogdGV4dCBvciBodG1sIHdpbGwgYmUgcmVuZGVyZWQgd2hlbiBsb2FkaW5nIGRhdGEgcmVtb3RlbHlcbiAgICovXG4gIGxvYWRpbmdWaWV3Pzogc3RyaW5nO1xufVxuXG4vKipcbiAqIExvY2FsIGNvbmZpZ3VyYXRpb246IHVzZWQgaWYgeW91IHdhbnQgdG8gcGFzcyBkYXRhIGV4cGxpY2l0bHkgdG8gdGhlIEF1dG9Db21wbGV0ZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFDTG9jYWxDb25maWd1cmF0aW9uIGV4dGVuZHMgQ29uZmlndXJhdGlvbiB7XG4gIGRhdGE6IEFycmF5PGFueT47XG59XG5cbi8qKlxuICogR3JvdXAgaXRlbXNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBHcm91cHtcbiAgLyoqXG4gICAqIEFycm93IGZ1bmN0aW9uIHRvIHNwZWNpZnkgdGhlIGdyb3VwIGZpZWxkXG4gICAqIFVzZWQgYXJyb3cgZnVuY3Rpb24gaW5zdGVhZCBvZiBhIHNpbXBsZSBmaWVsZCBjdXogdGhlIGdyb3VwIGZpZWxkIGNhbiBiZSBhIGZpZWxkIG9mIGFub3RoZXIgY29tcGxleCBvYmplY3RcbiAgICovXG4gIGZpZWxkOiBhbnk7XG5cbiAgLyoqXG4gICAqIEJsb2NrIHRoYXQgd2lsbCBiZSByZW5kZXJlZCBmb3IgdGhlIGdyb3VwXG4gICAqL1xuICB0ZW1wbGF0ZT86IHN0cmluZztcbn1cblxuLyoqXG4gKiBXZSB3aWxsIHVzZSB0aGlzIG9iamVjdCB0byBzdG9yZSBzZWxlY3RlZCBpdGVtc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIFNlbGVjdGVkSXRlbSB7XG4gIGVsZW06IGFueTsvLyBzZWxlY3RlZCBvYmplY3RcbiAgaW5kZXhJbkZpbHRlcmVkSXRlbXM6IG51bWJlcjsvLyBrZWVwIHRyYWNrIG9mIGl0J3MgaW5kZXggaW4gZmlsdGVyZWRJdGVtcyBzbyB3ZSBjYW4gcmV0dXJuIGl0IHRvIGl0J3MgZXhhY3QgcGxhY2Vcbn1cbiJdfQ==