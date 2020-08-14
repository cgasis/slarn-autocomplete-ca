import { __decorate } from 'tslib';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, EventEmitter, ViewChild, ViewChildren, Input, Output, Component, forwardRef, ElementRef, HostListener, Directive, Renderer2, Pipe, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

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

/**
 * Enum class contains the available languages
 */
var ACTranslator;
(function (ACTranslator) {
    ACTranslator["EN"] = "en";
    ACTranslator["FR"] = "fr";
    ACTranslator["AR"] = "ar";
})(ACTranslator || (ACTranslator = {}));
/**
 * Configuration of the translator
 */
const translator = {
    // available languages
    availableLanguages: [ACTranslator.EN, ACTranslator.FR, ACTranslator.AR],
    // translation book
    dictionary: {
        loadingText: {
            'en': 'Loading data...',
            'fr': 'Chargement des données...',
            'ar': 'تحميل البيانات...'
        },
        noMatchFoundText: {
            'en': 'No match found!',
            'fr': 'Pas de résultat trouvé!',
            'ar': 'لا يوجد تطابق!'
        },
        errors: {
            passingArrayValueWithNoMultipleOption: {
                'en': 'You have passed an array value to be selected\n either change the value or set the "multiple" option to true in the configuration.',
                'fr': 'Vous avez passé une valeur de tableau à sélectionner\n modifier la valeur ou changer l\'option "multiple" à true dans la configuration.',
                'ar': 'لقد قمت بتمرير قيمة جدول لاختيارها, عليك بتغير القمة أو تغير الخيار "multiple" إلى "true".'
            },
            unknownType: {
                'en': 'The type of "selectedId" must be number, string or Array of numbers or strings!',
                'fr': 'Le type de "selectedId" doit être number, string ou tableau de numbers ou strings',
                'ar': 'نوع المتغير "selectedId" يجب أن يكون numbers، strings أو مصفوفة numbers أو strings',
            },
            unknownLanguage: {
                'en': 'Unknown language ":1"!\n Please make sure to select one of the available languages ":2".',
                'fr': 'Langue inconnue ":1"\n Assurez-vous de sélectionner l\'une des langues disponibles ":2".',
                'ar': 'اللغة المختارة ":1" غير معروفة، الرجاء إختيار واحدة من الغات المتوفرة ":2".'
            },
            unknownFieldForGroupOption: {
                'en': 'You have added the option "group" to the autocomplete but forgot to specify the "field"!',
                'fr': 'Vous avez ajouté l\'option "group" mais vous avez oublié l\'option "field"!',
                'ar': 'لقد قمت بإضافة الخيار "group" لكن لم تحدد الخيار "field"!',
            },
            unknownKeyValue: {
                'en': 'Can\'t find the key ":1" in the object ":2"!',
                'fr': 'On ne peux pas trouvé le clé ":1" dans l\'object ":2"!',
                'ar': 'لم نتمكن من إيجاد المتغير ":1" في المكون ":2"!',
            },
            duplicateItemDetected: {
                'en': 'An item with the same "key" value already exist in the "data" array: ":1"\nUnable to append the item ":2"',
                'fr': 'An élément avec la même valeur de "key" existe dans le tableau "data": ":1"\nImpossible d\'ajouter l\'élément ":2"',
                'ar': 'يوجد عنصر بنفس قمة المتغير "key" في المصفوفة "data": ":1"\n لا يمكن إضافة العنصر: ":2"',
            },
            appendItemWorkOnlyLocally: {
                'en': '"appendItem()" function is for local configuration only\nIf you are using an API (remote configuration) and you add a new object to it then this new object will be available when you start typing in the autocomplete.\'',
                'fr': '"appendItem()" est une fonction pour la configuration locale\nSi vous utilisez une API (configuration à distance) et vous ajoutez un nouveau objet donc ce dérnier sera disponible lorsque vous commencez à taper dans l\'autocomplete.',
                'ar': '"appendItem()" هي وظيفة تستعمل فقط في التكوين المحلي "ACLocalConfoguration"\n إذا كنت تستعمل التكوين عن بعد "ACRemoteConfiguration" إذاً العنصر الجديد سيكون متاح حالما تشرع في الكتابة.',
            }
        }
    }
};
/**
 * Add values to message dynamically and translate it
 * @param message
 * @param values
 * @returns
 */
function dynamic_translation(message, values) {
    let counter = 1;
    values.forEach(value => {
        message = message.replace(':' + counter, value);
        counter++;
    });
    return message;
}

var SlarnAutocompleteComponent_1;
let SlarnAutocompleteComponent = SlarnAutocompleteComponent_1 = class SlarnAutocompleteComponent {
    constructor(_service) {
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
        this.checkIfClickedInside = (event) => {
            let isClickInside = this.container.nativeElement.contains(event.target);
            if (!isClickInside)
                this.displaySuggestions = false;
            else
                this.autocompleteInput.nativeElement.focus();
        };
        // require('style-loader!./../../themes/default.css');
    }
    set selectedId(value) {
        this.filterSelectedValue(value);
        this.searchAndSelectItemFromKey();
    }
    /**
     * Filter given value and make sure that the autocomplete gets the correct data
     * to work as expected
     * @param value
     */
    filterSelectedValue(value) {
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
    }
    /**
     * Check array contain one or many objects
     * @param value
     */
    arrayHasObject(value) {
        let hasObject = false;
        value.forEach(e => {
            if (typeof e === 'object')
                hasObject = true;
        });
        return hasObject;
    }
    /**
     * Return the selected key(s)
     */
    get selectedId() {
        return this._selectedId;
    }
    /**
     * Return the selected item(s)
     */
    get selectedData() {
        return (Array.isArray(this._selectedItem)) ? this.extractSelectedItems() : this._selectedItem;
    }
    ngOnInit() {
        this.initConfiguration();
    }
    ngAfterViewInit() {
        this.extractTemplateVariables();
        // I called this listener in ngAfterViewInit because I don't want the listener
        // to be set one time
        // ngOnInit is fired after ngOnChanges which is called after any change in the view
        if (!this.disabled)
            document.addEventListener('click', this.checkIfClickedInside, true);
    }
    /**
     * Clear autocomplete selection
     */
    clearAutocomplete() {
        this.autocompleteInput.nativeElement.value = '';
        this._selectedItem = null;
        this._selectedId = null;
        this.filteredItems = [];
    }
    /**
     * Hide or display suggestions list
     */
    toggleDisplaySuggestions() {
        if (!this.displaySuggestions) {
            this.openSuggestions();
        }
        else {
            this.closeSuggestions();
        }
    }
    /**
     * Init default configuration
     */
    initConfiguration() {
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
    }
    prepareUsedLanguage() {
        if (!this.configuration.language)
            this.configuration.language = ACTranslator.EN;
        if (this.configuration.language && translator.availableLanguages.indexOf(this.configuration.language) == -1) {
            let translation = dynamic_translation(this.translator.dictionary.errors.unknownLanguage[ACTranslator.EN], [this.configuration.language, JSON.stringify(translator.availableLanguages)]);
            throw new Error(translation);
        }
    }
    /**
     * Search and select item by key value
     */
    searchAndSelectItemFromKey() {
        if (this.configuration.data) { // if it's local configuration
            this.selectItemFromData(this.configuration.data);
        }
        else if (this.configuration.url) { // if it's remote configuration
            this.searchRemotely('', this.configuration.url, true);
        }
    }
    /**
     * Search and select item from data by the value of the key
     * @param data: any[]
     */
    selectItemFromData(data) {
        if (this.configuration.multiple) {
            this._selectedItem = [];
            let counter = 0;
            data.forEach(item => {
                if (this._selectedId.includes(item[this.configuration.key])) {
                    let si = { elem: item, indexInFilteredItems: counter };
                    this._selectedItem.push(si);
                }
                counter++;
            });
        }
        else {
            this._selectedItem = null;
            data.forEach(item => {
                if (item[this.configuration.key] == this._selectedId) {
                    this._selectedItem = item;
                    this.autocompleteInput.nativeElement.value = this._selectedItem[this.configuration.value];
                }
            });
        }
        // make sure to dispatch data after selection
        this.dispatchData();
    }
    /**
     * Extract available keys from template
     * will be used to dislay data in the suggestions panel
     */
    extractTemplateVariables() {
        // Regex to find the words between to #
        // may contain numbers and dots
        const regx = /\#(?:[a-zA-Z0-9_\.]+)\#/g;
        // get matched result
        this._templateVariables = this.configuration.template.match(regx);
    }
    /**
     * fired each time a user press a key
     * @param $event
     */
    onKeyup($event) {
        if (this.fireSearchKey($event)) {
            const reg = $event.target.value;
            if (reg == '') {
                this.displaySuggestions = false;
                if (!this.configuration.multiple) {
                    this.clearAutocomplete();
                    this.dispatchData();
                }
            }
            else {
                if (this.configuration.data) { // if it's local configuration
                    this.displaySuggestions = true;
                    this.searchLocally(reg, this.configuration.data);
                }
                else if (this.configuration.url) { // if it's remote configuration
                    // when working remotely and for better user experience
                    // the searchRemotely function will be fired when user finish typing
                    // and we assume that finishing typing means not pressing key for like 250ms
                    if (this.configuration.minCharacters <= reg.length) { // make sure to call api after typing the need number of characters
                        this.displaySuggestions = true;
                        this.loadingData = true;
                        this.filteredItems = [];
                        if (this.typingTimer != null)
                            clearTimeout(this.typingTimer);
                        this.typingTimer = setTimeout(() => {
                            this.searchRemotely(reg, this.configuration.url);
                        }, this.doneTypingInterval);
                    }
                }
            }
        }
        else if (this.navigationKey($event)) {
            $event.preventDefault();
            this.navigate($event.which);
        }
    }
    navigate(key) {
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
                let item = (this.configuration.group == null) ?
                    this.filteredItems[this._selectedIndexFromNavigation] :
                    // in case of using group _selectedIndexFromNavigation does not map with the correct index of filteredItems
                    // that's why we do an extra work to get the correct item from the available index
                    this.getItemFromGroup(this._selectedIndexFromNavigation);
                this.performSelection(item);
                break;
        }
    }
    /**
     * Get the right selected item when pressing enter key
     * @param i
     * @returns right item
     */
    getItemFromGroup(i) {
        let counter = 0;
        let selectedItem = null;
        console.log('groups', this.groups);
        for (let grp of this.groups) {
            console.log('grp', grp);
            let _a = this.filteredGroupedItems[grp];
            for (let item of _a) {
                if (i == counter)
                    selectedItem = item;
                counter++;
            }
        }
        return selectedItem;
    }
    enableSelectionForSelectedSuggestion(index) {
        let sg = this.suggestions.find((e, i, array) => {
            return (i == index);
        });
        sg.focusSuggestion = true;
    }
    /**
     *
     */
    clearAllSelections() {
        this.suggestions.forEach((sg, index, array) => {
            sg.focusSuggestion = false;
        });
    }
    /**
     * Delete item from selected list and dispatch changes
     * @param indexInSelectedItems
     * @param si
     */
    deleteFromSelectedItems(indexInSelectedItems, si) {
        this._selectedItem.splice(indexInSelectedItems, 1);
        this.filteredItems.splice(si.indexInFilteredItems, 0, si.elem);
        this.buildGroupsIfNeeded();
        this._selectedId.splice(indexInSelectedItems, 1);
        if (this._selectedItem.length == 0) {
            this._selectedItem = null;
            this._selectedId = null;
        }
        this.dispatchData();
    }
    /**
     * After key down clear used timer to calculate
     * when user finished typing
     */
    onKeyDown($event) {
        if (this.typingTimer != null)
            clearTimeout(this.typingTimer);
    }
    /**
     * Check if this an alphabet or number key
     * @param $event keyup event
     * @return fireKeySearch
     */
    fireSearchKey($event) {
        return (($event.which <= 105 && $event.which >= 48) ||
            (this._keys.searchTriggerKeys.indexOf($event.which) > -1));
    }
    /**
     * Check if pressed key is a navigation key
     * @param $event
     * @returns
     */
    navigationKey($event) {
        return (this._keys.navigationKeys.indexOf($event.which) > -1);
    }
    /**
     * If it's a local configuration then we will search inside the configuration.data object
     * @param word word to search
     * @param data filtered data
     */
    searchLocally(word, data) {
        this.filteredItems = [];
        data.forEach((item) => {
            let _str = JSON.stringify(item);
            if (_str.toLowerCase().indexOf(word.toLowerCase()) != -1 // if word exist in item
                && !this.existInSelectedItems(item) // and does not exist in selected items
            )
                this.filteredItems.push(item); // then add it to filteredItems to be displayed in suggestions list
            this.buildGroupsIfNeeded();
        });
    }
    /**
     * Check if given item exist in _selectedItem array ot not
     * @param item
     */
    existInSelectedItems(item) {
        let exist;
        if (!Array.isArray(this._selectedItem)) {
            exist = false;
        }
        else {
            exist = (this._selectedItem.find(si => si.elem[this.configuration.key] === item[this.configuration.key]) != undefined);
        }
        return exist;
    }
    /**
     * If it's a remote configuration then we get the word and add it to the url
     * before sending the request to the api
     * @param word word to search
     * @param url api url
     * @param selectItemAfterSearch
     */
    searchRemotely(word, url, selectItemAfterSearch) {
        this.loadingData = true;
        this.filteredItems = [];
        this._service.search(word, url).subscribe(res => {
            // only push items who are not in _selectedItems list
            res.forEach((item) => {
                if (!this.existInSelectedItems(item))
                    this.filteredItems.push(item);
            });
            if (selectItemAfterSearch)
                this.selectItemFromData(this.filteredItems);
            this.buildGroupsIfNeeded();
            this.loadingData = false;
        });
    }
    /**
     * If grouping is requested by the user then we need to prepare it
     */
    buildGroupsIfNeeded() {
        if (this.configuration.group != null) {
            // console.log('before grouping', this.filteredItems);
            this.groups = [];
            this.filteredGroupedItems = {};
            let groupedData = this.group(this.filteredItems, this.configuration.group.field);
            let self = this;
            Object.keys(groupedData).sort().forEach(function (key) {
                self.filteredGroupedItems[key] = groupedData[key];
            });
            this.groups = Object.keys(this.filteredGroupedItems);
            // console.log('filteredGroupedItems', this.filteredGroupedItems);
            // console.log('groups', this.groups);
        }
    }
    /**
     * Pares array of items and return grouped object by the given field
     * @param list
     * @param keyGetter
     * @returns Grouped object
     */
    group(list, keyGetter) {
        if (typeof keyGetter === 'undefined')
            throw new Error(this.translator.dictionary.errors.unknownFieldForGroupOption[this.configuration.language]);
        const map = {};
        list.forEach((item) => {
            const key = keyGetter(item);
            if (!(key in map))
                map[key] = [];
            map[key].push(item);
        });
        return map;
    }
    /**
     * Build view with data based on the given template
     * @param object
     * @return string built view
     */
    buildSuggestionView(object) {
        // console.log('object.toString()', object.toString());
        let view = this.configuration.template;
        this._templateVariables.forEach((res) => {
            let key = res.replace(/\#/g, ''); // remove # from the string
            let value = this.extractValue(key, object);
            view = view.replace(res, value); // replace words with object value
        });
        return view;
    }
    /**
     * Build the view of the group based on giving template
     * @param group
     * @returns
     */
    buildGroupView(group) {
        let template;
        if (!this.configuration.group.template || this.configuration.group.template == '')
            template = '<div style="background: #a7a3a3;padding: 5px;font-weight: bold;color: #fff;">#__group__#</div>';
        else
            template = this.configuration.group.template;
        return template.replace('#__group__#', group);
    }
    /**
     * Check if item is listed as unselectable item
     * by checking if it exist in this.unselectable array
     *
     * @param item
     */
    isItemUnselectable(item) {
        return (this.unselectable.includes(item[this.configuration.key]));
    }
    /**
     * Extract the correct value from the multidimensional object
     * @param keysString: string with keys separated by dots
     * @param object
     * @returns correct value
     */
    extractValue(keysString, object) {
        let result = null;
        let keys = keysString.split('.');
        let size = keys.length;
        let counter = 1;
        let _currentObject = object;
        keys.forEach(key => {
            if (!(key in _currentObject)) {
                let translation = dynamic_translation(this.translator.dictionary.errors.unknownKeyValue[this.configuration.language], [key, JSON.stringify(_currentObject)]);
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
    }
    /**
     * Triggered after a user select a suggestion
     * @param item selected item from the list
     */
    performSelection(item) {
        // console.log('selected item', item);
        if (this.configuration.multiple) {
            let index = this.filteredItems.findIndex(e => e[this.configuration.key] == item[this.configuration.key]);
            // console.log('index', index);
            if (this._selectedItem == null)
                this._selectedItem = [];
            let o = { elem: item, indexInFilteredItems: index };
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
    }
    /**
     * Dispatch data to external components
     */
    dispatchData() {
        // emit the whole object when item selected
        if (Array.isArray(this._selectedItem))
            this.onItemSelected.emit(this.extractSelectedItems());
        else
            this.onItemSelected.emit(this._selectedItem);
        // propagate only the key to the form
        // console.log('propagation _selectedId: ' + this._selectedId);
        if (this.propagateChange != null)
            this.propagateChange(this._selectedId);
    }
    /**
     * Extract items from _selectedItems
     */
    extractSelectedItems() {
        let items = [];
        this._selectedItem.forEach(si => {
            items.push(si.elem);
        });
        return items;
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn) { }
    writeValue(value) {
        // after setting key value we search for the related item
        if (value != '' && value != null && value != undefined) {
            this.filterSelectedValue(value);
            this.searchAndSelectItemFromKey();
        }
        else {
            this.clearAutocomplete();
            this.dispatchData();
        }
    }
    //======================================================================
    //        FUNCTIONS FOR EXTERNAL USAGE
    //======================================================================
    /**
     * Open suggestions list
     */
    openSuggestions() {
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
    }
    /**
     * Close suggestions list
     */
    closeSuggestions() {
        this.displaySuggestions = false;
    }
    /**
     * Add new item to data
     * If there is another item with the same "key" value then the it will not be added
     * @param item
     * @param selectIt boolean: select the item after adding if true (false by default)
     */
    appendItem(item, selectIt) {
        if (this.configuration.data) {
            selectIt = (typeof selectIt === 'undefined') ? false : selectIt;
            let i = this.findItem(this.configuration.data, item);
            if (i == undefined) {
                this.configuration.data.push(item);
                if (selectIt)
                    this.performSelection(item);
            }
            else {
                let translation = dynamic_translation(this.translator.dictionary.errors.duplicateItemDetected[this.configuration.language], [JSON.stringify(i), JSON.stringify(item)]);
                throw new Error(translation);
            }
        }
        else {
            throw new Error(this.translator.dictionary.errors.appendItemWorkOnlyLocally[this.configuration.language]);
        }
    }
    /**
     * Find if item already exist in data
     * @param data
     * @param item
     * @returns
     */
    findItem(data, item) {
        return data.find(elem => {
            return (elem[this.configuration.key] == item[this.configuration.key]);
        });
    }
};
SlarnAutocompleteComponent.ctorParameters = () => [
    { type: ACService }
];
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
                useExisting: forwardRef(() => SlarnAutocompleteComponent_1),
                multi: true
            }],
        styles: [".slarn-autocomplete-container{padding-top:0;margin:0;position:relative}.slarn-autocomplete-container .curtan{position:absolute;background:rgba(255,255,255,.47);width:100%;z-index:1;left:-.5px;height:100%;cursor:not-allowed}.unselectable-text{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none}.container-rtl-direction{padding-left:15px;padding-right:3px;direction:rtl}.container-ltr-direction{padding-left:3px;padding-right:15px}.slarn-autocomplete-container select{display:none}.slarn-autocomplete-container input{margin-bottom:1px;display:table-cell;width:10px;box-sizing:border-box;border:none;min-height:28px;background-color:transparent}.slarn-autocomplete-container input:focus{outline:0}.slarn-autocomplete-container .selected-options{font-size:14px;margin-bottom:3px;display:inline-block}.selected-options-rtl{margin-left:5px}.selected-options-ltr{margin-right:5px}.slarn-autocomplete-container .selected-options .text{padding:2px;cursor:default}.slarn-autocomplete-container .selected-options .remove{border-right:none;border-top:none;border-bottom:none;cursor:pointer;padding-left:10px;padding-right:3px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAW0lEQVR4AWMYWUCAGmr4gfgeEPfjUdMPVcNPyLB2IP6Pw7B+qFw7bu2ENbSji5FqWAMQN8JdSSaYBjKAIkMQrkIYRKkhjQS9RnlgUx79jdRMkLzUyCKCDCMHAABoYiU8YS3zcAAAAABJRU5ErkJggg==);background-repeat:no-repeat;background-position:center;background-size:70%}.slarn-autocomplete-container .suggestions{position:absolute;width:100%;background:#fff;z-index:2;display:block;max-height:200px;overflow-y:auto;left:-1px}.loading-data,.slarn-autocomplete-container .no-match-found{padding:5px}.slarn-autocomplete-container .toggle-suggestions-display{position:absolute;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiBwcLEx22EzYqAAAAW0lEQVQoz2NgGAyAm2EFgxBWGRGG1QysTAxfGZ4z7MGiRIRhH8Mdht8QTj/DOTQlwgwXGdqRBVCVCDNcQJVGVSLEcB5TGqEEpzRMyTnc0gwMDAytDPV0DWSiAAC0ghX2P8wBMwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wNy0wN1QxMToxOToyOSswMjowMHRLTC0AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDctMDdUMTE6MTk6MjkrMDI6MDAFFvSRAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==);background-repeat:no-repeat;background-position:center center;cursor:pointer;width:30px;background-color:transparent}.slarn-autocomplete-container .toggle-suggestions-display:hover{background-color:#ececec}"]
    })
], SlarnAutocompleteComponent);
/**
 * Suggestion component for Autocomplete
 */
let SlarnAutocompleteSuggestionComponent = class SlarnAutocompleteSuggestionComponent {
    constructor() {
        this.unselectable = false;
        this.onSuggestionClicked = new EventEmitter();
        this.focusSuggestion = false;
    }
    ngOnInit() { }
    selectItem() {
        if (!this.unselectable)
            this.onSuggestionClicked.emit(this.item);
        else
            console.log('this item is unselectable', this.item);
    }
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
        template: `
    <div [class.unselectable]="unselectable" class="sg" (click)="selectItem()" [focused]="focusSuggestion">
      <div *ngIf="unselectable" class="suggestion-curtain"></div>
      <div class="content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
        styles: [`
    .sg {
      cursor: default;
      position: relative;
    }

    .sg .content{
      padding: 5px;
    }

    .sg .suggestion-curtain{
      position: absolute;
      width: 100%;
      height: 100%;
      background: #ffffffa3;
      cursor: not-allowed;
    }

    .sg:not(.unselectable):hover {
      background: #ececec;
    }

  `]
    })
], SlarnAutocompleteSuggestionComponent);

let AutoGrowDirective = class AutoGrowDirective {
    constructor(elem) {
        this.elem = elem;
        this.activated = true;
    }
    autoGrow() {
        if (this.activated) {
            let input = this.elem.nativeElement;
            this.fireAutoGrow(input);
        }
    }
    fireAutoGrow(input) {
        let pad_right = 5;
        let tmp = document.createElement('div');
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
        let width = tmp.clientWidth + pad_right + 1;
        tmp.parentNode.removeChild(tmp);
        input.style.width = width + 'px';
    }
};
AutoGrowDirective.ctorParameters = () => [
    { type: ElementRef }
];
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

let SlarnAutocompleteModule = class SlarnAutocompleteModule {
};
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

/*
 * Public API Surface of slarn-autocomplete-ca
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ACService, SlarnAutocompleteComponent, SlarnAutocompleteModule, SlarnAutocompleteSuggestionComponent, AutoGrowDirective as ɵa, FocusedDirective as ɵb, RenderSafelyPipe as ɵc };
//# sourceMappingURL=slarn-autocomplete-ca.js.map
