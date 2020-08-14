(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common/http'), require('@angular/core'), require('@angular/forms'), require('@angular/common'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('slarn-autocomplete-ca', ['exports', '@angular/common/http', '@angular/core', '@angular/forms', '@angular/common', '@angular/platform-browser'], factory) :
    (global = global || self, factory(global['slarn-autocomplete-ca'] = {}, global.ng.common.http, global.ng.core, global.ng.forms, global.ng.common, global.ng.platformBrowser));
}(this, (function (exports, http, core, forms, common, platformBrowser) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

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
            { type: http.HttpClient }
        ]; };
        ACService = __decorate([
            core.Injectable()
        ], ACService);
        return ACService;
    }());

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
    var translator = {
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
        var counter = 1;
        values.forEach(function (value) {
            message = message.replace(':' + counter, value);
            counter++;
        });
        return message;
    }

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
            this.onItemSelected = new core.EventEmitter();
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
            core.ViewChild('autocompleteInput')
        ], SlarnAutocompleteComponent.prototype, "autocompleteInput", void 0);
        __decorate([
            core.ViewChild('displayAllBtn')
        ], SlarnAutocompleteComponent.prototype, "displayAllBtn", void 0);
        __decorate([
            core.ViewChild('container')
        ], SlarnAutocompleteComponent.prototype, "container", void 0);
        __decorate([
            core.ViewChild('spanX')
        ], SlarnAutocompleteComponent.prototype, "spanX", void 0);
        __decorate([
            core.ViewChildren('acsuggestion')
        ], SlarnAutocompleteComponent.prototype, "suggestions", void 0);
        __decorate([
            core.Input('configuration')
        ], SlarnAutocompleteComponent.prototype, "configuration", void 0);
        __decorate([
            core.Input('disabled')
        ], SlarnAutocompleteComponent.prototype, "disabled", void 0);
        __decorate([
            core.Input('unselectable')
        ], SlarnAutocompleteComponent.prototype, "unselectable", void 0);
        __decorate([
            core.Output('onItemSelected')
        ], SlarnAutocompleteComponent.prototype, "onItemSelected", void 0);
        __decorate([
            core.Input()
        ], SlarnAutocompleteComponent.prototype, "selectedId", null);
        SlarnAutocompleteComponent = SlarnAutocompleteComponent_1 = __decorate([
            core.Component({
                selector: 'slarn-autocomplete',
                template: "<div #container class=\"slarn-autocomplete-container\" [ngClass]=\"{'container-rtl-direction': configuration.rtl, 'container-ltr-direction': !configuration.rtl}\">\n  <div class=\"curtan\" *ngIf=\"disabled\"></div>\n  <!-- Hidden select will contain the key(s) of the selected item(s) -->\n  <select\n    [attr.name]=\"(configuration.name) ? configuration.name : null\"\n    [attr.multiple]=\"(configuration.multiple) ? 'multiple' : null\">\n    <ng-container *ngIf=\"configuration.multiple && _selectedItem != null\">\n      <option *ngFor=\"let item of _selectedItem\" [value]=\"(!configuration.multiple) ? item[configuration.key] : item.elem[configuration.key] \" selected>\n        {{item[configuration.key]}}\n      </option>\n    </ng-container>\n    <ng-container *ngIf=\"!configuration.multiple\">\n      <option [value]=\"(_selectedItem) ? _selectedItem[configuration.key] : ''\" selected>\n        {{(_selectedItem) ? _selectedItem[configuration.value] : '' }}\n      </option>\n    </ng-container>\n  </select>\n\n  <!-- When autocomplete is multiple _selectedItems will be displayed here -->\n  <ng-container *ngIf=\"configuration.multiple && _selectedItem != null\">\n        <span class=\"selected-options unselectable-text\"\n              [ngClass]=\"{'selected-options-rtl': configuration.rtl, 'selected-options-ltr': !configuration.rtl}\"\n              *ngFor=\"let si of _selectedItem; let o = index;\">\n            <span class=\"text\" *ngIf=\"si.elem != undefined\">{{si.elem[configuration.value]}}</span> <span class=\"remove\"\n                                                                                                          (click)=\"deleteFromSelectedItems(o, si)\">&nbsp;</span>\n        </span>\n  </ng-container>\n\n  <!-- Autocomplete input will be visible to the user and contain the value -->\n  <input #autocompleteInput id=\"ac\" type=\"text\" autocomplete=\"off\" autoGrow [activated]=\"configuration.multiple\"\n         [style.width]=\"(configuration.multiple) ? '10px' : '100%'\"\n         (keyup)=\"onKeyup($event)\" (keydown)=\"onKeyDown($event)\"\n         [attr.value]=\"(!configuration.multiple && _selectedItem != null) ? _selectedItem[configuration.value] : null\">\n  <span #spanX style=\"display: none;\"></span>\n\n  <!-- Display all button -->\n  <button #displayAllBtn\n          class=\"toggle-suggestions-display\"\n          (click)=\"toggleDisplaySuggestions()\"\n          [style.right]=\"(!configuration.rtl) ? '0': null\" [style.left]=\"(configuration.rtl) ? '0': null\">\n  </button>\n\n  <!-- Suggestions container -->\n  <div class=\"suggestions\" [style.display]=\"(displaySuggestions) ? 'block' : 'none'\">\n    <!--============== Suggestions list ====================-->\n    <!-- Display suggestions without grouping -->\n    <ng-container *ngIf=\"configuration.group == null\">\n      <slarn-ac-suggestion \n          #acsuggestion \n          *ngFor=\"let e of filteredItems; let i = index;\" [item]=\"e\"\n          [unselectable]=\"isItemUnselectable(e)\"\n          (onSuggestionClicked)=\"performSelection($event)\">\n        <div [innerHTML]=\"buildSuggestionView(e) | renderSafely\"></div>\n      </slarn-ac-suggestion>\n    </ng-container>\n\n    <!-- Display suggestions with grouping -->\n    <ng-container *ngIf=\"configuration.group != null\">\n      <div *ngFor=\"let g of groups\">\n        <div [innerHTML]=\"buildGroupView(g) | renderSafely\"></div>\n        <slarn-ac-suggestion #acsuggestion *ngFor=\"let e of filteredGroupedItems[g]; let i = index;\" [item]=\"e\"\n                             (onSuggestionClicked)=\"performSelection($event)\">\n          <div [innerHTML]=\"buildSuggestionView(e) | renderSafely\"></div>\n        </slarn-ac-suggestion>\n      </div>\n    </ng-container>\n    <!--============== End Suggestions list =================-->\n\n    <!-- Displayed when no match found -->\n    <div #emptyResult *ngIf=\"filteredItems != null && filteredItems.length == 0 && !loadingData\"\n         class=\"no-match-found\">\n      <ng-content select=\".empty-result-view\"></ng-content>\n      <ng-container *ngIf=\"emptyResult.children.length == 0\">{{translator.dictionary.noMatchFoundText[configuration.language]}}</ng-container>\n    </div>\n\n    <!--  Displayed when loading data from api -->\n    <ng-container *ngIf=\"configuration.loadingView\">\n      <div *ngIf=\"loadingData\"\n           class=\"loading-data\"\n           [innerHTML]=\"configuration.loadingView | renderSafely\">\n      </div>\n    </ng-container>\n  </div>\n</div>\n",
                providers: [{
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return SlarnAutocompleteComponent_1; }),
                        multi: true
                    }],
                styles: [".slarn-autocomplete-container{padding-top:0;margin:0;position:relative}.slarn-autocomplete-container .curtan{position:absolute;background:rgba(255,255,255,.47);width:100%;z-index:1;left:-.5px;height:100%;cursor:not-allowed}.unselectable-text{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none}.container-rtl-direction{padding-left:15px;padding-right:3px;direction:rtl}.container-ltr-direction{padding-left:3px;padding-right:15px}.slarn-autocomplete-container select{display:none}.slarn-autocomplete-container input{margin-bottom:1px;display:table-cell;width:10px;box-sizing:border-box;border:none;min-height:28px;background-color:transparent}.slarn-autocomplete-container input:focus{outline:0}.slarn-autocomplete-container .selected-options{font-size:14px;margin-bottom:3px;display:inline-block}.selected-options-rtl{margin-left:5px}.selected-options-ltr{margin-right:5px}.slarn-autocomplete-container .selected-options .text{padding:2px;cursor:default}.slarn-autocomplete-container .selected-options .remove{border-right:none;border-top:none;border-bottom:none;cursor:pointer;padding-left:10px;padding-right:3px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAW0lEQVR4AWMYWUCAGmr4gfgeEPfjUdMPVcNPyLB2IP6Pw7B+qFw7bu2ENbSji5FqWAMQN8JdSSaYBjKAIkMQrkIYRKkhjQS9RnlgUx79jdRMkLzUyCKCDCMHAABoYiU8YS3zcAAAAABJRU5ErkJggg==);background-repeat:no-repeat;background-position:center;background-size:70%}.slarn-autocomplete-container .suggestions{position:absolute;width:100%;background:#fff;z-index:2;display:block;max-height:200px;overflow-y:auto;left:-1px}.loading-data,.slarn-autocomplete-container .no-match-found{padding:5px}.slarn-autocomplete-container .toggle-suggestions-display{position:absolute;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiBwcLEx22EzYqAAAAW0lEQVQoz2NgGAyAm2EFgxBWGRGG1QysTAxfGZ4z7MGiRIRhH8Mdht8QTj/DOTQlwgwXGdqRBVCVCDNcQJVGVSLEcB5TGqEEpzRMyTnc0gwMDAytDPV0DWSiAAC0ghX2P8wBMwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wNy0wN1QxMToxOToyOSswMjowMHRLTC0AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDctMDdUMTE6MTk6MjkrMDI6MDAFFvSRAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==);background-repeat:no-repeat;background-position:center center;cursor:pointer;width:30px;background-color:transparent}.slarn-autocomplete-container .toggle-suggestions-display:hover{background-color:#ececec}"]
            })
        ], SlarnAutocompleteComponent);
        return SlarnAutocompleteComponent;
    }());
    /**
     * Suggestion component for Autocomplete
     */
    var SlarnAutocompleteSuggestionComponent = /** @class */ (function () {
        function SlarnAutocompleteSuggestionComponent() {
            this.unselectable = false;
            this.onSuggestionClicked = new core.EventEmitter();
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
            core.Input('item')
        ], SlarnAutocompleteSuggestionComponent.prototype, "item", void 0);
        __decorate([
            core.Input('unselectable')
        ], SlarnAutocompleteSuggestionComponent.prototype, "unselectable", void 0);
        __decorate([
            core.Output('onSuggestionClicked')
        ], SlarnAutocompleteSuggestionComponent.prototype, "onSuggestionClicked", void 0);
        SlarnAutocompleteSuggestionComponent = __decorate([
            core.Component({
                selector: 'slarn-ac-suggestion',
                template: "\n    <div [class.unselectable]=\"unselectable\" class=\"sg\" (click)=\"selectItem()\" [focused]=\"focusSuggestion\">\n      <div *ngIf=\"unselectable\" class=\"suggestion-curtain\"></div>\n      <div class=\"content\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  ",
                styles: ["\n    .sg {\n      cursor: default;\n      position: relative;\n    }\n\n    .sg .content{\n      padding: 5px;\n    }\n\n    .sg .suggestion-curtain{\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      background: #ffffffa3;\n      cursor: not-allowed;\n    }\n\n    .sg:not(.unselectable):hover {\n      background: #ececec;\n    }\n\n  "]
            })
        ], SlarnAutocompleteSuggestionComponent);
        return SlarnAutocompleteSuggestionComponent;
    }());

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
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input('activated')
        ], AutoGrowDirective.prototype, "activated", void 0);
        __decorate([
            core.HostListener('keyup'),
            core.HostListener('keydown'),
            core.HostListener('keypress ')
        ], AutoGrowDirective.prototype, "autoGrow", null);
        AutoGrowDirective = __decorate([
            core.Directive({
                selector: '[autoGrow]',
            })
        ], AutoGrowDirective);
        return AutoGrowDirective;
    }());

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
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        __decorate([
            core.Input()
        ], FocusedDirective.prototype, "focused", null);
        FocusedDirective = __decorate([
            core.Directive({
                selector: '[focused]'
            })
        ], FocusedDirective);
        return FocusedDirective;
    }());

    var RenderSafelyPipe = /** @class */ (function () {
        function RenderSafelyPipe(sanitized) {
            this.sanitized = sanitized;
        }
        RenderSafelyPipe.prototype.transform = function (value) {
            return this.sanitized.bypassSecurityTrustHtml(value);
        };
        RenderSafelyPipe.ctorParameters = function () { return [
            { type: platformBrowser.DomSanitizer }
        ]; };
        RenderSafelyPipe = __decorate([
            core.Pipe({
                name: 'renderSafely'
            })
        ], RenderSafelyPipe);
        return RenderSafelyPipe;
    }());

    var SlarnAutocompleteModule = /** @class */ (function () {
        function SlarnAutocompleteModule() {
        }
        SlarnAutocompleteModule = __decorate([
            core.NgModule({
                imports: [
                    common.CommonModule, http.HttpClientModule
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

    exports.ACService = ACService;
    exports.SlarnAutocompleteComponent = SlarnAutocompleteComponent;
    exports.SlarnAutocompleteModule = SlarnAutocompleteModule;
    exports.SlarnAutocompleteSuggestionComponent = SlarnAutocompleteSuggestionComponent;
    exports.ɵa = AutoGrowDirective;
    exports.ɵb = FocusedDirective;
    exports.ɵc = RenderSafelyPipe;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=slarn-autocomplete-ca.umd.js.map
