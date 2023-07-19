module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ["plugin:react/recommended", "standard"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        indent: [0, 4], // Отступ количество пробелов
        semi: [2, "always"], // Точка с запятой в конце строки

        // Ошибка при наличии пробела при обозночении функции, уберём её
        "space-before-function-paren": [
            "error",
            { anonymous: "always", named: "never" }
        ],
        "multiline-ternary": ["off"],

        // Использование двойных кавычек
        quotes: ["error", "double", { allowTemplateLiterals: true, avoidEscape: true }]
    }
};
