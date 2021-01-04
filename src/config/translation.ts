import translations from './lang/translations.eng.json';

interface Attributes {
    [key: string]: string;
}

function replaceAttributes(label: string, options: Attributes = {}): string {
    // Replaces any ":key" with a value in the options
    return label.replace(/:(\w+)/gi, (word) => {
        const key = word.replace(/^:/, '');

        if (options[key] === undefined || options[key] === null) {
            return '';
        }

        return options[key];
    });
}

export default function trans(key: string, attributes?: Attributes): string {
    // @ts-ignore
    const result: string = translations[key];

    if (!result) {
        return key;
    }

    return replaceAttributes(result, attributes);
}

export function booleanToYesNo(bool = false): string {
    return bool ? trans('global.yes') : trans('global.no');
}
