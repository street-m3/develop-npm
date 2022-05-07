# 【環境設定】npm-scriptsでPostCSSを導入する
PostCSSを導入したことがなかったので、忘備録としてスターターセットを残してみます。

## PostCSSを導入した背景
転職活動に向けてポートフォリオ作成をしたいと思い、現在のアセットで進めようと考えていましたが、もっと使いやすい構成にしたいと考えたため「PostCSS」をはじめてみようと思いました。
<br>
今までの開発環境では、Gulpを用いてSCSSのコンパイル圧縮やHTMLの構文チェックなどのシンプルな仕様でした。大規模な開発など関わることが無いためです。<br>
FLOCCSは有名なCSS設計手法の一つですが、詳細度を管理する目的などで新たにフォルダを追加したくなっても構造を維持するためにネストしなければいけなくなり、融通が効きません。<br>
現状の構成を組み直すのは時間と手間がかかるため、根本的にCSS設計を見直すことにしました。
<br>
<br>
タスクランナーはGulpを使っていましたが、WEB DEVELOPER Roadmap 2021では、npm-scriptsが推奨されていることを知り、乗り換えることにしました。

## 設計
CSS設計は「ITCSS」を導入することにしました。
<br>
<br>
<q>
ITCSSは、CSS Wizardy の Harry Roberts氏が提唱したCSSの詳細度を管理する設計思想です。ITCSSのレイヤーは、必要に応じて追加・削除することも許容されます。
</q>

<small>[ITCSSを採用して共同開発しやすいCSS設計をZOZOTOWNに導入した話から引用](https://techblog.zozo.com/entry/itcss-to-zozotown)</small>

## コンポーネントの命名規則
所属する各レイヤーの接頭辞を付与したBEMを使用します。

### 追記 (2022/05/07)
キャメルケースを積極的に使用したBEMを現在使用しています。
アンダースコアは1つ省略することで、可読性とコーディング速度の向上に貢献できると考えています。

### ITCSSのディレクトリ構成

````md
src
├── css
│   ├── Base
│   │   └── _base.pcss
│   ├── Components
│   │   ├── _accordion.pcss
│   │   ├── _breadcrumb.pcss
│   │   └── _component.pcss
│   ├── Generic
│   │   ├── _author.pcss
│   │   └── _reset.pcss
│   ├── Layouts
│   │   ├── _grid.pcss
│   │   └── _wrapper.pcss
│   ├── Model
│   │   └── _model.pcss
│   ├── Objects
│   │   ├── _button.pcss
│   │   └── _input.pcss
│   ├── Pages
│   │   └── top
│   ├── Settings
│   │   ├── _color.pcss
│   │   ├── _global.pcss
│   │   └── _typography.css
│   ├── Site
│   │   ├── _drawer.pcss
│   │   ├── _breadcrumb.pcss
│   │   ├── _footer.nav.pcss
│   │   ├── _footer.pcss
│   │   ├── _header.pcss
│   │   └── _sidebar.pcss
│   ├── Tools
│   │   └── _mixin.pcss
│   ├── Trumps
│   │   ├── _test.pcss
│   │   └── _utility.pcss
│   ├── Vendor
│   │   └── _slick.pcss
│   └── style.pcss
├── images
│   └── ogp.jpg
├── index.html
├── js
│   └── main.js
└── pages
````

## Flow

### VScodeをセッティングする
ファイルの拡張子を関連付ける
1. .vscodeのsetting.jsonに記述する
2. emmentの拡張機能をpcssでも有効にする

````json
{
    "files.associations": {
        "*.pcss": "postcss",
        "*.css": "postcss"
    },
    "emmet.includeLanguages": {
        "postcss": "css"
    },
    "emmet.syntaxProfiles": {
        "postcss": "css"
    }
}
````

### エクステンションのインストール
1. PostCSS Language Support
2. language-postcss


### package.jsonの生成
`npm init -y`

### 必要なモジュールをインストールする
```` bash
npm install npm-run-all onchange rimraf cpx mkdirp watch @babel/cli @babel/core @babel/preset-env browser-sync postcss postcss-cli postcss-preset-env postcss-import-ext-glob postcss-import postcss-mixins postcss-simple-vars postcss-nested postcss-extend-rule postcss-calc postcss-pxtorem postcss-reporter postcss-sorting postcss-sort-media-queries cssnano sharp-cli --save-dev
````

### npm scriptsを構成する

#### package.json
配置: プロジェクトルート


````json
{
    "name": "npm-scripts-postcss-presets",
    "version": "2.0.0",
    "scripts": {
        "clean:fontcss": "rimraf ./assets/dist/webfont/ && mkdirp ./assets/dist/webfont",
        "clean:js": "rimraf ./assets/dist/js/ && mkdirp ./assets/dist/js/",
        "clean:images": "rimraf ./assets/dist/images/ && mkdirp ./assets/dist/images/",
        "dev:html:cpx": "cpx './assets/src/*.html' './assets/dist/' && cpx './assets/src/pages/**/*.html' './assets/dist/'",
        "build:html": "npm-run-all dev:html:*",
        "dev:css:postcss": "postcss -c ./postcss.config.js ./assets/src/css/style.pcss -o ./assets/dist/css/style.css",
        "build:css": "npm-run-all -s dev:css:*",
        "dev:css:fontcss": "cpx './assets/src/css/webfont/*' './assets/dist/css/webfont/'",
        "build:js": "npm run clean:js && webpack",
        "dev:images:cpx": "cpx './assets/src/images/*.{jpg,jpeg,png,gif,svg,webp,mp4,ico}' './assets/dist/images/'",
        "sharp-webp": "sharp -i ./assets/src/images/*.jpg ./assets/src/images/**/*.png -f webp -o ./dist/images/",
        "sharp-jpg": "sharp -i ./assets/src/images/*.jpg -o ./dist/images/",
        "sharp-png": "sharp -i ./assets/src/images/*.png -o ./dist/images/",
        "dev:images:sharp": "npm run sharp-webp & npm run sharp-png & npm run sharp-jpg",
        "build:images": "npm run clean:images && npm-run-all -s dev:images:*",
        "watch:server": "browser-sync start --config \"./bs-config.js\"",
        "watch:html": "watch 'npm run build:html' ./src/",
        "watch:css": "watch 'npm run build:css' ./src/css/",
        "watch:scripts": "watch 'npm run build:js' ./src/js/",
        "watch:images": "onchange './assets/src/images/' -e '**/*.DS_Store' -- npm run build:images",
        "watch": "npm-run-all -p watch:*"
    }
}
````

#### postcss.config.js
配置: プロジェクトルート

``touch postcss.config.js``

````javascript
module.exports = {
    plugins: [
        require('postcss-import-ext-glob'),
        require('postcss-import'),
        require('postcss-mixins'),
        require('postcss-nested'),
        require('postcss-preset-env')({
            stage: 1,
            autoprefixer: {
                grid: true
            },
        }),
        require('postcss-simple-vars')({
            silent: true,
        }),
        require('postcss-extend-rule'),
        require('postcss-calc'),
        require('postcss-pxtorem')({
            rootValue: 16,
            replace: true,
            exclude: /node_modules/i,
        }),
        require('postcss-sorting')({
            'order': [
                'custom-properties',
                'dollar-variables',
                'declarations',
                'at-rules',
                'rules'
            ],
            'properties-order': 'alphabetical',
            'unspecified-properties-position': 'bottom'
        }),
        require('postcss-sort-media-queries'),
        require('cssnano')({
            "autoprefixer": false,
            preset: [
                'default', {
                    discardComments: {
                        removeAll: false,
                    },
                }
            ],
        }),
    ]
}
````

#### Browsersyncのconfigファイルを生成する
配置: プロジェクトルート


``npx browser-sync init``


bs-config.jsが生成される。

````javascript 

/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */
 module.exports = {
    "files": [
        "./assets/dist/**/*",
    ],
    "server": {
        baseDir: "./assets/dist/",
        index: "index.html",
    },
    "proxy": false,
    "port": 3000,
    "middleware": false,
    "open": false
};
````

#### browserslistrcを生成する。
AutoprefixerでCSSに必要なベンダープレフィックスを付与するかを設定できる。


``touch .browserslistrc``


配置: プロジェクトルート

```` txt
last 2 versions
not dead
not IE 11
````


ルートに配置後は、コマンドで確認可能。


``npx browserslist``


#### webpack
配置: プロジェクトルート

``touch webpack.config.js``


````js 
// const Dotenv = require('dotenv-webpack'); DotEnvが必要であれば
module.exports = {
    mode: 'development', //production or development
    entry: `./assets/src/js/main.js`,
    // plugins: [
    //     new Dotenv() //DotEnvが必要であれば
    // ],
    
    output: {
        path: `${__dirname}/dist/js`,
        filename: "main.js"
    },

    resolve: {
        extensions: ['.js', '.json', '.wasm'],
    },
};
````

#### npm run
``npm run watch``

## PostCSSを導入して感じたこと
PostCSSを導入したことによって、小規模であれば問題なく使えること、そして何より使いやすくて、無駄がない環境が作れたと思っています。
ただ、パッケージ選定にややコストがかかる印象です。そのことを考えるとSCSSも視野に入れておかなければならないと思いました。

今回参考のさせていただいたサイトにZOZOTOWNさんのテックブログがあります。
PostCSSという選択肢の幅が広がり、自分のやりたいことが広がった記事です。とても感謝しております。ありがとうございます。

## 参考
- [ITCSSを採用して共同開発しやすいCSS設計をZOZOTOWNに導入した話](https://techblog.zozo.com/entry/itcss-to-zozotown)

- [PostCSS](https://github.com/postcss/postcss)