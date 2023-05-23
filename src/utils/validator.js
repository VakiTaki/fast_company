export function validator(data, config) {
    const errors = {};
    const validate = (validateMethod, data, config) => {
        let statusValidate;
        switch (validateMethod) {
            case "isRequired":
                statusValidate = (data.trim() === "");
                break;
            case "isEmail": {
                const emailRegExp = /^\S+@\S+\.\S+$/g;
                statusValidate = !emailRegExp.test(data);
                break;
            }
            case "isCapitalSymbol": {
                const capitalSymbolRegExp = /[A-Z]+/g;
                statusValidate = !capitalSymbolRegExp.test(data);
                break;
            }
            case "isContainDigit": {
                const containDigitRegExp = /\d+/g;
                statusValidate = !containDigitRegExp.test(data);
                break;
            }
            case "minLength": {
                statusValidate = data.length < config.value;
                break;
            }
            default:
                break;
        }
        if (statusValidate) return config.message;
    };
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(validateMethod, data[fieldName], config[fieldName][validateMethod]);
            if (error && !errors[fieldName]) { errors[fieldName] = error; };
        }
    }
    return errors;
}
