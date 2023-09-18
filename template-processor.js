'use strict';

class TemplateProcessor {
    constructor(template) {
        this.template = template;
    }

    fillIn(dictionary) {
        let res = this.template;

        for (const key in dictionary) {
            if (dictionary.hasOwnProperty(key)) {
                const val = dictionary[key];
                const place = `{{${key}}}`;
                res = res.split(place).join(val);
            }
        }

        return res;
    }
}

const template = 'My favorite month is {{month}} but not the day {{day}} or the year {{year}}';
const dateTemplate = new TemplateProcessor(template);

const dictionary = { month: 'July', day: '1', year: '2016' };
const str = dateTemplate.fillIn(dictionary);

console.log(str);
