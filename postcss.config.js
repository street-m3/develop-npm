module.exports = (ctx) => ({
    plugins: {
        "postcss-import-ext-glob": {},
        "postcss-import": {},
        "postcss-mixins": {},
        "postcss-preset-env": {
            stage: 0,
        },
        "postcss-cssnext": {},
        "postcss-simple-vars": {
            silent: true,
        },
        "postcss-nested": {},
        "postcss-mixins": {},
        "postcss-extend": {},
        "postcss-color-function": {},
        'postcss-sorting': {
            'order': [
                'custom-properties',
                'dollar-variables',
                'declarations',
                'at-rules',
                'rules'
            ],
            'properties-order': 'alphabetical',
            'unspecified-properties-position': 'bottom'
        },
        "postcss-sort-media-queries": {}, //
        "cssnano": {
            "autoprefixer": false,
            preset: [
                'default',
                {
                    discardComments: { removeAll: false },
                },
            ],
        },
    }
});