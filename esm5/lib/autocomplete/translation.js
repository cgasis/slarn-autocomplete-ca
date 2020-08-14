/**
 * Enum class contains the available languages
 */
export var ACTranslator;
(function (ACTranslator) {
    ACTranslator["EN"] = "en";
    ACTranslator["FR"] = "fr";
    ACTranslator["AR"] = "ar";
})(ACTranslator || (ACTranslator = {}));
/**
 * Configuration of the translator
 */
export var translator = {
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
export function dynamic_translation(message, values) {
    var counter = 1;
    values.forEach(function (value) {
        message = message.replace(':' + counter, value);
        counter++;
    });
    return message;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zbGFybi1hdXRvY29tcGxldGUtY2EvIiwic291cmNlcyI6WyJsaWIvYXV0b2NvbXBsZXRlL3RyYW5zbGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHO0FBQ0gsTUFBTSxDQUFOLElBQVksWUFJWDtBQUpELFdBQVksWUFBWTtJQUN0Qix5QkFBUyxDQUFBO0lBQ1QseUJBQVMsQ0FBQTtJQUNULHlCQUFTLENBQUE7QUFDWCxDQUFDLEVBSlcsWUFBWSxLQUFaLFlBQVksUUFJdkI7QUFFRDs7R0FFRztBQUNILE1BQU0sQ0FBQyxJQUFNLFVBQVUsR0FBUTtJQUM3QixzQkFBc0I7SUFDdEIsa0JBQWtCLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLFlBQVksQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLEVBQUUsQ0FBQztJQUV2RSxtQkFBbUI7SUFDbkIsVUFBVSxFQUFFO1FBQ1YsV0FBVyxFQUFFO1lBQ1gsSUFBSSxFQUFFLGlCQUFpQjtZQUN2QixJQUFJLEVBQUUsMkJBQTJCO1lBQ2pDLElBQUksRUFBRSxtQkFBbUI7U0FDMUI7UUFDRCxnQkFBZ0IsRUFBRTtZQUNoQixJQUFJLEVBQUUsaUJBQWlCO1lBQ3ZCLElBQUksRUFBRSx5QkFBeUI7WUFDL0IsSUFBSSxFQUFFLGdCQUFnQjtTQUN2QjtRQUNELE1BQU0sRUFBQztZQUNMLHFDQUFxQyxFQUFFO2dCQUNyQyxJQUFJLEVBQUUsb0lBQW9JO2dCQUMxSSxJQUFJLEVBQUUseUlBQXlJO2dCQUMvSSxJQUFJLEVBQUUsNEZBQTRGO2FBQ25HO1lBQ0QsV0FBVyxFQUFFO2dCQUNYLElBQUksRUFBRSxpRkFBaUY7Z0JBQ3ZGLElBQUksRUFBRSxtRkFBbUY7Z0JBQ3pGLElBQUksRUFBRSxvRkFBb0Y7YUFDM0Y7WUFDRCxlQUFlLEVBQUU7Z0JBQ2YsSUFBSSxFQUFFLDBGQUEwRjtnQkFDaEcsSUFBSSxFQUFFLDBGQUEwRjtnQkFDaEcsSUFBSSxFQUFFLDZFQUE2RTthQUNwRjtZQUNELDBCQUEwQixFQUFDO2dCQUN6QixJQUFJLEVBQUUsMEZBQTBGO2dCQUNoRyxJQUFJLEVBQUUsNkVBQTZFO2dCQUNuRixJQUFJLEVBQUUsMkRBQTJEO2FBQ2xFO1lBQ0QsZUFBZSxFQUFFO2dCQUNmLElBQUksRUFBRSw4Q0FBOEM7Z0JBQ3BELElBQUksRUFBRSx3REFBd0Q7Z0JBQzlELElBQUksRUFBRSxnREFBZ0Q7YUFDdkQ7WUFDRCxxQkFBcUIsRUFBRTtnQkFDckIsSUFBSSxFQUFFLDJHQUEyRztnQkFDakgsSUFBSSxFQUFFLG9IQUFvSDtnQkFDMUgsSUFBSSxFQUFFLHdGQUF3RjthQUMvRjtZQUNELHlCQUF5QixFQUFFO2dCQUN6QixJQUFJLEVBQUUsNE5BQTROO2dCQUNsTyxJQUFJLEVBQUUseU9BQXlPO2dCQUMvTyxJQUFJLEVBQUUsMExBQTBMO2FBQ2pNO1NBQ0Y7S0FDRjtDQUNGLENBQUM7QUFFRjs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxPQUFlLEVBQUUsTUFBa0I7SUFDckUsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO1FBQ2xCLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUMsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEVudW0gY2xhc3MgY29udGFpbnMgdGhlIGF2YWlsYWJsZSBsYW5ndWFnZXNcbiAqL1xuZXhwb3J0IGVudW0gQUNUcmFuc2xhdG9ye1xuICBFTiA9ICdlbicsXG4gIEZSID0gJ2ZyJyxcbiAgQVIgPSAnYXInLFxufVxuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gb2YgdGhlIHRyYW5zbGF0b3JcbiAqL1xuZXhwb3J0IGNvbnN0IHRyYW5zbGF0b3I6IGFueSA9IHtcbiAgLy8gYXZhaWxhYmxlIGxhbmd1YWdlc1xuICBhdmFpbGFibGVMYW5ndWFnZXM6IFtBQ1RyYW5zbGF0b3IuRU4sIEFDVHJhbnNsYXRvci5GUiwgQUNUcmFuc2xhdG9yLkFSXSxcblxuICAvLyB0cmFuc2xhdGlvbiBib29rXG4gIGRpY3Rpb25hcnk6IHtcbiAgICBsb2FkaW5nVGV4dDoge1xuICAgICAgJ2VuJzogJ0xvYWRpbmcgZGF0YS4uLicsXG4gICAgICAnZnInOiAnQ2hhcmdlbWVudCBkZXMgZG9ubsOpZXMuLi4nLFxuICAgICAgJ2FyJzogJ9iq2K3ZhdmK2YQg2KfZhNio2YrYp9mG2KfYqi4uLidcbiAgICB9LFxuICAgIG5vTWF0Y2hGb3VuZFRleHQ6IHtcbiAgICAgICdlbic6ICdObyBtYXRjaCBmb3VuZCEnLFxuICAgICAgJ2ZyJzogJ1BhcyBkZSByw6lzdWx0YXQgdHJvdXbDqSEnLFxuICAgICAgJ2FyJzogJ9mE2Kcg2YrZiNis2K8g2KrYt9in2KjZgiEnXG4gICAgfSxcbiAgICBlcnJvcnM6e1xuICAgICAgcGFzc2luZ0FycmF5VmFsdWVXaXRoTm9NdWx0aXBsZU9wdGlvbjoge1xuICAgICAgICAnZW4nOiAnWW91IGhhdmUgcGFzc2VkIGFuIGFycmF5IHZhbHVlIHRvIGJlIHNlbGVjdGVkXFxuIGVpdGhlciBjaGFuZ2UgdGhlIHZhbHVlIG9yIHNldCB0aGUgXCJtdWx0aXBsZVwiIG9wdGlvbiB0byB0cnVlIGluIHRoZSBjb25maWd1cmF0aW9uLicsXG4gICAgICAgICdmcic6ICdWb3VzIGF2ZXogcGFzc8OpIHVuZSB2YWxldXIgZGUgdGFibGVhdSDDoCBzw6lsZWN0aW9ubmVyXFxuIG1vZGlmaWVyIGxhIHZhbGV1ciBvdSBjaGFuZ2VyIGxcXCdvcHRpb24gXCJtdWx0aXBsZVwiIMOgIHRydWUgZGFucyBsYSBjb25maWd1cmF0aW9uLicsXG4gICAgICAgICdhcic6ICfZhNmC2K8g2YLZhdiqINio2KrZhdix2YrYsSDZgtmK2YXYqSDYrNiv2YjZhCDZhNin2K7YqtmK2KfYsdmH2KcsINi52YTZitmDINio2KrYutmK2LEg2KfZhNmC2YXYqSDYo9mIINiq2LrZitixINin2YTYrtmK2KfYsSBcIm11bHRpcGxlXCIg2KXZhNmJIFwidHJ1ZVwiLidcbiAgICAgIH0sXG4gICAgICB1bmtub3duVHlwZToge1xuICAgICAgICAnZW4nOiAnVGhlIHR5cGUgb2YgXCJzZWxlY3RlZElkXCIgbXVzdCBiZSBudW1iZXIsIHN0cmluZyBvciBBcnJheSBvZiBudW1iZXJzIG9yIHN0cmluZ3MhJyxcbiAgICAgICAgJ2ZyJzogJ0xlIHR5cGUgZGUgXCJzZWxlY3RlZElkXCIgZG9pdCDDqnRyZSBudW1iZXIsIHN0cmluZyBvdSB0YWJsZWF1IGRlIG51bWJlcnMgb3Ugc3RyaW5ncycsXG4gICAgICAgICdhcic6ICfZhtmI2Lkg2KfZhNmF2KrYutmK2LEgXCJzZWxlY3RlZElkXCIg2YrYrNioINij2YYg2YrZg9mI2YYgbnVtYmVyc9iMIHN0cmluZ3Mg2KPZiCDZhdi12YHZiNmB2KkgbnVtYmVycyDYo9mIIHN0cmluZ3MnLFxuICAgICAgfSxcbiAgICAgIHVua25vd25MYW5ndWFnZToge1xuICAgICAgICAnZW4nOiAnVW5rbm93biBsYW5ndWFnZSBcIjoxXCIhXFxuIFBsZWFzZSBtYWtlIHN1cmUgdG8gc2VsZWN0IG9uZSBvZiB0aGUgYXZhaWxhYmxlIGxhbmd1YWdlcyBcIjoyXCIuJyxcbiAgICAgICAgJ2ZyJzogJ0xhbmd1ZSBpbmNvbm51ZSBcIjoxXCJcXG4gQXNzdXJlei12b3VzIGRlIHPDqWxlY3Rpb25uZXIgbFxcJ3VuZSBkZXMgbGFuZ3VlcyBkaXNwb25pYmxlcyBcIjoyXCIuJyxcbiAgICAgICAgJ2FyJzogJ9in2YTZhNi62Kkg2KfZhNmF2K7Yqtin2LHYqSBcIjoxXCIg2LrZitixINmF2LnYsdmI2YHYqdiMINin2YTYsdis2KfYoSDYpdiu2KrZitin2LEg2YjYp9it2K/YqSDZhdmGINin2YTYutin2Kog2KfZhNmF2KrZiNmB2LHYqSBcIjoyXCIuJ1xuICAgICAgfSxcbiAgICAgIHVua25vd25GaWVsZEZvckdyb3VwT3B0aW9uOntcbiAgICAgICAgJ2VuJzogJ1lvdSBoYXZlIGFkZGVkIHRoZSBvcHRpb24gXCJncm91cFwiIHRvIHRoZSBhdXRvY29tcGxldGUgYnV0IGZvcmdvdCB0byBzcGVjaWZ5IHRoZSBcImZpZWxkXCIhJyxcbiAgICAgICAgJ2ZyJzogJ1ZvdXMgYXZleiBham91dMOpIGxcXCdvcHRpb24gXCJncm91cFwiIG1haXMgdm91cyBhdmV6IG91Ymxpw6kgbFxcJ29wdGlvbiBcImZpZWxkXCIhJyxcbiAgICAgICAgJ2FyJzogJ9mE2YLYryDZgtmF2Kog2KjYpdi22KfZgdipINin2YTYrtmK2KfYsSBcImdyb3VwXCIg2YTZg9mGINmE2YUg2KrYrdiv2K8g2KfZhNiu2YrYp9ixIFwiZmllbGRcIiEnLFxuICAgICAgfSxcbiAgICAgIHVua25vd25LZXlWYWx1ZToge1xuICAgICAgICAnZW4nOiAnQ2FuXFwndCBmaW5kIHRoZSBrZXkgXCI6MVwiIGluIHRoZSBvYmplY3QgXCI6MlwiIScsXG4gICAgICAgICdmcic6ICdPbiBuZSBwZXV4IHBhcyB0cm91dsOpIGxlIGNsw6kgXCI6MVwiIGRhbnMgbFxcJ29iamVjdCBcIjoyXCIhJyxcbiAgICAgICAgJ2FyJzogJ9mE2YUg2YbYqtmF2YPZhiDZhdmGINil2YrYrNin2K8g2KfZhNmF2KrYutmK2LEgXCI6MVwiINmB2Yog2KfZhNmF2YPZiNmGIFwiOjJcIiEnLFxuICAgICAgfSxcbiAgICAgIGR1cGxpY2F0ZUl0ZW1EZXRlY3RlZDoge1xuICAgICAgICAnZW4nOiAnQW4gaXRlbSB3aXRoIHRoZSBzYW1lIFwia2V5XCIgdmFsdWUgYWxyZWFkeSBleGlzdCBpbiB0aGUgXCJkYXRhXCIgYXJyYXk6IFwiOjFcIlxcblVuYWJsZSB0byBhcHBlbmQgdGhlIGl0ZW0gXCI6MlwiJyxcbiAgICAgICAgJ2ZyJzogJ0FuIMOpbMOpbWVudCBhdmVjIGxhIG3Dqm1lIHZhbGV1ciBkZSBcImtleVwiIGV4aXN0ZSBkYW5zIGxlIHRhYmxlYXUgXCJkYXRhXCI6IFwiOjFcIlxcbkltcG9zc2libGUgZFxcJ2Fqb3V0ZXIgbFxcJ8OpbMOpbWVudCBcIjoyXCInLFxuICAgICAgICAnYXInOiAn2YrZiNis2K8g2LnZhti12LEg2KjZhtmB2LMg2YLZhdipINin2YTZhdiq2LrZitixIFwia2V5XCIg2YHZiiDYp9mE2YXYtdmB2YjZgdipIFwiZGF0YVwiOiBcIjoxXCJcXG4g2YTYpyDZitmF2YPZhiDYpdi22KfZgdipINin2YTYudmG2LXYsTogXCI6MlwiJyxcbiAgICAgIH0sXG4gICAgICBhcHBlbmRJdGVtV29ya09ubHlMb2NhbGx5OiB7XG4gICAgICAgICdlbic6ICdcImFwcGVuZEl0ZW0oKVwiIGZ1bmN0aW9uIGlzIGZvciBsb2NhbCBjb25maWd1cmF0aW9uIG9ubHlcXG5JZiB5b3UgYXJlIHVzaW5nIGFuIEFQSSAocmVtb3RlIGNvbmZpZ3VyYXRpb24pIGFuZCB5b3UgYWRkIGEgbmV3IG9iamVjdCB0byBpdCB0aGVuIHRoaXMgbmV3IG9iamVjdCB3aWxsIGJlIGF2YWlsYWJsZSB3aGVuIHlvdSBzdGFydCB0eXBpbmcgaW4gdGhlIGF1dG9jb21wbGV0ZS5cXCcnLFxuICAgICAgICAnZnInOiAnXCJhcHBlbmRJdGVtKClcIiBlc3QgdW5lIGZvbmN0aW9uIHBvdXIgbGEgY29uZmlndXJhdGlvbiBsb2NhbGVcXG5TaSB2b3VzIHV0aWxpc2V6IHVuZSBBUEkgKGNvbmZpZ3VyYXRpb24gw6AgZGlzdGFuY2UpIGV0IHZvdXMgYWpvdXRleiB1biBub3V2ZWF1IG9iamV0IGRvbmMgY2UgZMOpcm5pZXIgc2VyYSBkaXNwb25pYmxlIGxvcnNxdWUgdm91cyBjb21tZW5jZXogw6AgdGFwZXIgZGFucyBsXFwnYXV0b2NvbXBsZXRlLicsXG4gICAgICAgICdhcic6ICdcImFwcGVuZEl0ZW0oKVwiINmH2Yog2YjYuNmK2YHYqSDYqtiz2KrYudmF2YQg2YHZgti3INmB2Yog2KfZhNiq2YPZiNmK2YYg2KfZhNmF2K3ZhNmKIFwiQUNMb2NhbENvbmZvZ3VyYXRpb25cIlxcbiDYpdiw2Kcg2YPZhtiqINiq2LPYqti52YXZhCDYp9mE2KrZg9mI2YrZhiDYudmGINio2LnYryBcIkFDUmVtb3RlQ29uZmlndXJhdGlvblwiINil2LDYp9mLINin2YTYudmG2LXYsSDYp9mE2KzYr9mK2K8g2LPZitmD2YjZhiDZhdiq2KfYrSDYrdin2YTZhdinINiq2LTYsdi5INmB2Yog2KfZhNmD2KrYp9io2KkuJyxcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogQWRkIHZhbHVlcyB0byBtZXNzYWdlIGR5bmFtaWNhbGx5IGFuZCB0cmFuc2xhdGUgaXRcbiAqIEBwYXJhbSBtZXNzYWdlXG4gKiBAcGFyYW0gdmFsdWVzXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZHluYW1pY190cmFuc2xhdGlvbihtZXNzYWdlOiBzdHJpbmcsIHZhbHVlczogQXJyYXk8YW55Pil7XG4gIGxldCBjb3VudGVyID0gMTtcbiAgdmFsdWVzLmZvckVhY2godmFsdWUgPT4ge1xuICAgIG1lc3NhZ2UgPSBtZXNzYWdlLnJlcGxhY2UoJzonK2NvdW50ZXIsIHZhbHVlKTtcbiAgICBjb3VudGVyKys7XG4gIH0pO1xuXG4gIHJldHVybiBtZXNzYWdlO1xufVxuIl19