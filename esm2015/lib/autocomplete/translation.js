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
export const translator = {
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
    let counter = 1;
    values.forEach(value => {
        message = message.replace(':' + counter, value);
        counter++;
    });
    return message;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zbGFybi1hdXRvY29tcGxldGUtY2EvIiwic291cmNlcyI6WyJsaWIvYXV0b2NvbXBsZXRlL3RyYW5zbGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHO0FBQ0gsTUFBTSxDQUFOLElBQVksWUFJWDtBQUpELFdBQVksWUFBWTtJQUN0Qix5QkFBUyxDQUFBO0lBQ1QseUJBQVMsQ0FBQTtJQUNULHlCQUFTLENBQUE7QUFDWCxDQUFDLEVBSlcsWUFBWSxLQUFaLFlBQVksUUFJdkI7QUFFRDs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBUTtJQUM3QixzQkFBc0I7SUFDdEIsa0JBQWtCLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLFlBQVksQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLEVBQUUsQ0FBQztJQUV2RSxtQkFBbUI7SUFDbkIsVUFBVSxFQUFFO1FBQ1YsV0FBVyxFQUFFO1lBQ1gsSUFBSSxFQUFFLGlCQUFpQjtZQUN2QixJQUFJLEVBQUUsMkJBQTJCO1lBQ2pDLElBQUksRUFBRSxtQkFBbUI7U0FDMUI7UUFDRCxnQkFBZ0IsRUFBRTtZQUNoQixJQUFJLEVBQUUsaUJBQWlCO1lBQ3ZCLElBQUksRUFBRSx5QkFBeUI7WUFDL0IsSUFBSSxFQUFFLGdCQUFnQjtTQUN2QjtRQUNELE1BQU0sRUFBQztZQUNMLHFDQUFxQyxFQUFFO2dCQUNyQyxJQUFJLEVBQUUsb0lBQW9JO2dCQUMxSSxJQUFJLEVBQUUseUlBQXlJO2dCQUMvSSxJQUFJLEVBQUUsNEZBQTRGO2FBQ25HO1lBQ0QsV0FBVyxFQUFFO2dCQUNYLElBQUksRUFBRSxpRkFBaUY7Z0JBQ3ZGLElBQUksRUFBRSxtRkFBbUY7Z0JBQ3pGLElBQUksRUFBRSxvRkFBb0Y7YUFDM0Y7WUFDRCxlQUFlLEVBQUU7Z0JBQ2YsSUFBSSxFQUFFLDBGQUEwRjtnQkFDaEcsSUFBSSxFQUFFLDBGQUEwRjtnQkFDaEcsSUFBSSxFQUFFLDZFQUE2RTthQUNwRjtZQUNELDBCQUEwQixFQUFDO2dCQUN6QixJQUFJLEVBQUUsMEZBQTBGO2dCQUNoRyxJQUFJLEVBQUUsNkVBQTZFO2dCQUNuRixJQUFJLEVBQUUsMkRBQTJEO2FBQ2xFO1lBQ0QsZUFBZSxFQUFFO2dCQUNmLElBQUksRUFBRSw4Q0FBOEM7Z0JBQ3BELElBQUksRUFBRSx3REFBd0Q7Z0JBQzlELElBQUksRUFBRSxnREFBZ0Q7YUFDdkQ7WUFDRCxxQkFBcUIsRUFBRTtnQkFDckIsSUFBSSxFQUFFLDJHQUEyRztnQkFDakgsSUFBSSxFQUFFLG9IQUFvSDtnQkFDMUgsSUFBSSxFQUFFLHdGQUF3RjthQUMvRjtZQUNELHlCQUF5QixFQUFFO2dCQUN6QixJQUFJLEVBQUUsNE5BQTROO2dCQUNsTyxJQUFJLEVBQUUseU9BQXlPO2dCQUMvTyxJQUFJLEVBQUUsMExBQTBMO2FBQ2pNO1NBQ0Y7S0FDRjtDQUNGLENBQUM7QUFFRjs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxPQUFlLEVBQUUsTUFBa0I7SUFDckUsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDckIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5QyxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRW51bSBjbGFzcyBjb250YWlucyB0aGUgYXZhaWxhYmxlIGxhbmd1YWdlc1xuICovXG5leHBvcnQgZW51bSBBQ1RyYW5zbGF0b3J7XG4gIEVOID0gJ2VuJyxcbiAgRlIgPSAnZnInLFxuICBBUiA9ICdhcicsXG59XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBvZiB0aGUgdHJhbnNsYXRvclxuICovXG5leHBvcnQgY29uc3QgdHJhbnNsYXRvcjogYW55ID0ge1xuICAvLyBhdmFpbGFibGUgbGFuZ3VhZ2VzXG4gIGF2YWlsYWJsZUxhbmd1YWdlczogW0FDVHJhbnNsYXRvci5FTiwgQUNUcmFuc2xhdG9yLkZSLCBBQ1RyYW5zbGF0b3IuQVJdLFxuXG4gIC8vIHRyYW5zbGF0aW9uIGJvb2tcbiAgZGljdGlvbmFyeToge1xuICAgIGxvYWRpbmdUZXh0OiB7XG4gICAgICAnZW4nOiAnTG9hZGluZyBkYXRhLi4uJyxcbiAgICAgICdmcic6ICdDaGFyZ2VtZW50IGRlcyBkb25uw6llcy4uLicsXG4gICAgICAnYXInOiAn2KrYrdmF2YrZhCDYp9mE2KjZitin2YbYp9iqLi4uJ1xuICAgIH0sXG4gICAgbm9NYXRjaEZvdW5kVGV4dDoge1xuICAgICAgJ2VuJzogJ05vIG1hdGNoIGZvdW5kIScsXG4gICAgICAnZnInOiAnUGFzIGRlIHLDqXN1bHRhdCB0cm91dsOpIScsXG4gICAgICAnYXInOiAn2YTYpyDZitmI2KzYryDYqti32KfYqNmCISdcbiAgICB9LFxuICAgIGVycm9yczp7XG4gICAgICBwYXNzaW5nQXJyYXlWYWx1ZVdpdGhOb011bHRpcGxlT3B0aW9uOiB7XG4gICAgICAgICdlbic6ICdZb3UgaGF2ZSBwYXNzZWQgYW4gYXJyYXkgdmFsdWUgdG8gYmUgc2VsZWN0ZWRcXG4gZWl0aGVyIGNoYW5nZSB0aGUgdmFsdWUgb3Igc2V0IHRoZSBcIm11bHRpcGxlXCIgb3B0aW9uIHRvIHRydWUgaW4gdGhlIGNvbmZpZ3VyYXRpb24uJyxcbiAgICAgICAgJ2ZyJzogJ1ZvdXMgYXZleiBwYXNzw6kgdW5lIHZhbGV1ciBkZSB0YWJsZWF1IMOgIHPDqWxlY3Rpb25uZXJcXG4gbW9kaWZpZXIgbGEgdmFsZXVyIG91IGNoYW5nZXIgbFxcJ29wdGlvbiBcIm11bHRpcGxlXCIgw6AgdHJ1ZSBkYW5zIGxhIGNvbmZpZ3VyYXRpb24uJyxcbiAgICAgICAgJ2FyJzogJ9mE2YLYryDZgtmF2Kog2KjYqtmF2LHZitixINmC2YrZhdipINis2K/ZiNmEINmE2KfYrtiq2YrYp9ix2YfYpywg2LnZhNmK2YMg2KjYqti62YrYsSDYp9mE2YLZhdipINij2Ygg2KrYutmK2LEg2KfZhNiu2YrYp9ixIFwibXVsdGlwbGVcIiDYpdmE2YkgXCJ0cnVlXCIuJ1xuICAgICAgfSxcbiAgICAgIHVua25vd25UeXBlOiB7XG4gICAgICAgICdlbic6ICdUaGUgdHlwZSBvZiBcInNlbGVjdGVkSWRcIiBtdXN0IGJlIG51bWJlciwgc3RyaW5nIG9yIEFycmF5IG9mIG51bWJlcnMgb3Igc3RyaW5ncyEnLFxuICAgICAgICAnZnInOiAnTGUgdHlwZSBkZSBcInNlbGVjdGVkSWRcIiBkb2l0IMOqdHJlIG51bWJlciwgc3RyaW5nIG91IHRhYmxlYXUgZGUgbnVtYmVycyBvdSBzdHJpbmdzJyxcbiAgICAgICAgJ2FyJzogJ9mG2YjYuSDYp9mE2YXYqti62YrYsSBcInNlbGVjdGVkSWRcIiDZitis2Kgg2KPZhiDZitmD2YjZhiBudW1iZXJz2Iwgc3RyaW5ncyDYo9mIINmF2LXZgdmI2YHYqSBudW1iZXJzINij2Yggc3RyaW5ncycsXG4gICAgICB9LFxuICAgICAgdW5rbm93bkxhbmd1YWdlOiB7XG4gICAgICAgICdlbic6ICdVbmtub3duIGxhbmd1YWdlIFwiOjFcIiFcXG4gUGxlYXNlIG1ha2Ugc3VyZSB0byBzZWxlY3Qgb25lIG9mIHRoZSBhdmFpbGFibGUgbGFuZ3VhZ2VzIFwiOjJcIi4nLFxuICAgICAgICAnZnInOiAnTGFuZ3VlIGluY29ubnVlIFwiOjFcIlxcbiBBc3N1cmV6LXZvdXMgZGUgc8OpbGVjdGlvbm5lciBsXFwndW5lIGRlcyBsYW5ndWVzIGRpc3BvbmlibGVzIFwiOjJcIi4nLFxuICAgICAgICAnYXInOiAn2KfZhNmE2LrYqSDYp9mE2YXYrtiq2KfYsdipIFwiOjFcIiDYutmK2LEg2YXYudix2YjZgdip2Iwg2KfZhNix2KzYp9ihINil2K7YqtmK2KfYsSDZiNin2K3Yr9ipINmF2YYg2KfZhNi62KfYqiDYp9mE2YXYqtmI2YHYsdipIFwiOjJcIi4nXG4gICAgICB9LFxuICAgICAgdW5rbm93bkZpZWxkRm9yR3JvdXBPcHRpb246e1xuICAgICAgICAnZW4nOiAnWW91IGhhdmUgYWRkZWQgdGhlIG9wdGlvbiBcImdyb3VwXCIgdG8gdGhlIGF1dG9jb21wbGV0ZSBidXQgZm9yZ290IHRvIHNwZWNpZnkgdGhlIFwiZmllbGRcIiEnLFxuICAgICAgICAnZnInOiAnVm91cyBhdmV6IGFqb3V0w6kgbFxcJ29wdGlvbiBcImdyb3VwXCIgbWFpcyB2b3VzIGF2ZXogb3VibGnDqSBsXFwnb3B0aW9uIFwiZmllbGRcIiEnLFxuICAgICAgICAnYXInOiAn2YTZgtivINmC2YXYqiDYqNil2LbYp9mB2Kkg2KfZhNiu2YrYp9ixIFwiZ3JvdXBcIiDZhNmD2YYg2YTZhSDYqtit2K/YryDYp9mE2K7Zitin2LEgXCJmaWVsZFwiIScsXG4gICAgICB9LFxuICAgICAgdW5rbm93bktleVZhbHVlOiB7XG4gICAgICAgICdlbic6ICdDYW5cXCd0IGZpbmQgdGhlIGtleSBcIjoxXCIgaW4gdGhlIG9iamVjdCBcIjoyXCIhJyxcbiAgICAgICAgJ2ZyJzogJ09uIG5lIHBldXggcGFzIHRyb3V2w6kgbGUgY2zDqSBcIjoxXCIgZGFucyBsXFwnb2JqZWN0IFwiOjJcIiEnLFxuICAgICAgICAnYXInOiAn2YTZhSDZhtiq2YXZg9mGINmF2YYg2KXZitis2KfYryDYp9mE2YXYqti62YrYsSBcIjoxXCIg2YHZiiDYp9mE2YXZg9mI2YYgXCI6MlwiIScsXG4gICAgICB9LFxuICAgICAgZHVwbGljYXRlSXRlbURldGVjdGVkOiB7XG4gICAgICAgICdlbic6ICdBbiBpdGVtIHdpdGggdGhlIHNhbWUgXCJrZXlcIiB2YWx1ZSBhbHJlYWR5IGV4aXN0IGluIHRoZSBcImRhdGFcIiBhcnJheTogXCI6MVwiXFxuVW5hYmxlIHRvIGFwcGVuZCB0aGUgaXRlbSBcIjoyXCInLFxuICAgICAgICAnZnInOiAnQW4gw6lsw6ltZW50IGF2ZWMgbGEgbcOqbWUgdmFsZXVyIGRlIFwia2V5XCIgZXhpc3RlIGRhbnMgbGUgdGFibGVhdSBcImRhdGFcIjogXCI6MVwiXFxuSW1wb3NzaWJsZSBkXFwnYWpvdXRlciBsXFwnw6lsw6ltZW50IFwiOjJcIicsXG4gICAgICAgICdhcic6ICfZitmI2KzYryDYudmG2LXYsSDYqNmG2YHYsyDZgtmF2Kkg2KfZhNmF2KrYutmK2LEgXCJrZXlcIiDZgdmKINin2YTZhdi12YHZiNmB2KkgXCJkYXRhXCI6IFwiOjFcIlxcbiDZhNinINmK2YXZg9mGINil2LbYp9mB2Kkg2KfZhNi52YbYtdixOiBcIjoyXCInLFxuICAgICAgfSxcbiAgICAgIGFwcGVuZEl0ZW1Xb3JrT25seUxvY2FsbHk6IHtcbiAgICAgICAgJ2VuJzogJ1wiYXBwZW5kSXRlbSgpXCIgZnVuY3Rpb24gaXMgZm9yIGxvY2FsIGNvbmZpZ3VyYXRpb24gb25seVxcbklmIHlvdSBhcmUgdXNpbmcgYW4gQVBJIChyZW1vdGUgY29uZmlndXJhdGlvbikgYW5kIHlvdSBhZGQgYSBuZXcgb2JqZWN0IHRvIGl0IHRoZW4gdGhpcyBuZXcgb2JqZWN0IHdpbGwgYmUgYXZhaWxhYmxlIHdoZW4geW91IHN0YXJ0IHR5cGluZyBpbiB0aGUgYXV0b2NvbXBsZXRlLlxcJycsXG4gICAgICAgICdmcic6ICdcImFwcGVuZEl0ZW0oKVwiIGVzdCB1bmUgZm9uY3Rpb24gcG91ciBsYSBjb25maWd1cmF0aW9uIGxvY2FsZVxcblNpIHZvdXMgdXRpbGlzZXogdW5lIEFQSSAoY29uZmlndXJhdGlvbiDDoCBkaXN0YW5jZSkgZXQgdm91cyBham91dGV6IHVuIG5vdXZlYXUgb2JqZXQgZG9uYyBjZSBkw6lybmllciBzZXJhIGRpc3BvbmlibGUgbG9yc3F1ZSB2b3VzIGNvbW1lbmNleiDDoCB0YXBlciBkYW5zIGxcXCdhdXRvY29tcGxldGUuJyxcbiAgICAgICAgJ2FyJzogJ1wiYXBwZW5kSXRlbSgpXCIg2YfZiiDZiNi42YrZgdipINiq2LPYqti52YXZhCDZgdmC2Lcg2YHZiiDYp9mE2KrZg9mI2YrZhiDYp9mE2YXYrdmE2YogXCJBQ0xvY2FsQ29uZm9ndXJhdGlvblwiXFxuINil2LDYpyDZg9mG2Kog2KrYs9iq2LnZhdmEINin2YTYqtmD2YjZitmGINi52YYg2KjYudivIFwiQUNSZW1vdGVDb25maWd1cmF0aW9uXCIg2KXYsNin2Ysg2KfZhNi52YbYtdixINin2YTYrNiv2YrYryDYs9mK2YPZiNmGINmF2KrYp9itINit2KfZhNmF2Kcg2KrYtNix2Lkg2YHZiiDYp9mE2YPYqtin2KjYqS4nLFxuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBBZGQgdmFsdWVzIHRvIG1lc3NhZ2UgZHluYW1pY2FsbHkgYW5kIHRyYW5zbGF0ZSBpdFxuICogQHBhcmFtIG1lc3NhZ2VcbiAqIEBwYXJhbSB2YWx1ZXNcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkeW5hbWljX3RyYW5zbGF0aW9uKG1lc3NhZ2U6IHN0cmluZywgdmFsdWVzOiBBcnJheTxhbnk+KXtcbiAgbGV0IGNvdW50ZXIgPSAxO1xuICB2YWx1ZXMuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgbWVzc2FnZSA9IG1lc3NhZ2UucmVwbGFjZSgnOicrY291bnRlciwgdmFsdWUpO1xuICAgIGNvdW50ZXIrKztcbiAgfSk7XG5cbiAgcmV0dXJuIG1lc3NhZ2U7XG59XG4iXX0=