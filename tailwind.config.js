module.exports = {
    purge: {
        content: ['_site/**/*.html'],
        options: {
            safelist: [],
        },
    },
    theme: {
        extend: {
            colors: {
                pageBg: '#fff',
                lightest: '#FFEFD6',
                lighter: '#FFC958',
                light: '#FFBD59',
                darkBase: '#000000',
                darkHighlight: '#997135',
                button: '#51A488',
                buttonHover: '#3D7B66',
                peacockBlueDark: '#0B0B83',
                peacockBlue: '#1258F7',
                peacockBlueLight: '#03DDDE',
                peacockBrown: '#BB963D',
                peacockGreenLight: '#C1F05F',
                peacockGreenDark: '#38AB1F',
            },
            fontFamily: {
                heading: ['Amatic SC', 'sans-serif'],
                body: ['Roboto', 'sans-serif'],
            },
        },
    },
    variants: {},
    plugins: [require('@tailwindcss/forms')],
};
