export type Validator = (val: any) => {
    valid: boolean;
    text: string
}

export const required = () => {
    let text = 'This field is required';

    let vfunc: Validator = (value: any) => {
        if (value === '' || value === undefined || value === null) {
            console.log(value)
            return {valid: false, text: text};
        }
        return {valid: true, text: ''};
    };

    return vfunc
};

export const maxValue = (maxVal: number) => {
    let text = `Must be smaller than ${maxVal}`;

    let vfunc: Validator = (value: any) => {
        if (parseInt(value, 10) > maxVal) {
            return {valid: false, text: text};
        }
        return {valid: true, text: ''};
    };

    return vfunc
};

export const minValue = (minVal: number) => {
    let text = `Must be larger than ${minVal}`;

    let vfunc: Validator = (value: any) => {
        if (parseInt(value, 10) < minVal) {
            return {valid: false, text: text};
        }
        return {valid: true, text: ''};
    };

    return vfunc
};

export const ipAddress = () => {
    let pattern = /^(?!.*\.$)((?!0\d)(1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
    let text = 'Not a valid IP address';

    let vfunc: Validator = (value: any) => {
        if (!pattern.test(value)) {
            return {valid: false, text: text};
        }
        return {valid: true, text: ''};
    };

    return vfunc
};

export const integer = () => {
    let text = 'Must be a whole number';

    let vfunc: Validator = (value: any) => {
        if (!isNaN(value) && Number(value) % 1 === 0) {
            return {valid: true, text: ''};
        }
        return {valid: false, text: text};
    };

    return vfunc
};

export const email = () => {
    let text = 'Not a valid email address';

    let vfunc: Validator = (value: any) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (re.test(String(value).toLowerCase())) {
            return {valid: true, text: ''};
        }
        return {valid: false, text: text};
    };

    return vfunc
};
