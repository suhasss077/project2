'use strict';

class TemplateProcessor {
    constructor(template) {
        this.template = template;
    }

    fillIn(dictionary) {
        let result = this.template;

        for (const key in dictionary) {
            if (dictionary.hasOwnProperty(key)) {
                const placeholder = `{{${key}}}`;
                const value = dictionary[key];
                result = result.split(placeholder).join(value);
            }
        }

        return result;
    }
}

// Example usage:
const template = 'My favorite month is {{month}} but not the day {{day}} or the year {{year}}';
const dateTemplate = new TemplateProcessor(template);

const dictionary = { month: 'July', day: '1', year: '2016' };
const str = dateTemplate.fillIn(dictionary);

console.log(str);
