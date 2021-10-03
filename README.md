# 【環境設定】npm-scriptsでPostCSSを導入する
PostCSSを導入したことがなかったので、忘備録としてスターターセットを残してみます。

## PostCSSを導入した背景
転職活動に向けてポートフォリオ作成をしたいと思い、現在のアセットで進めようと考えていましたが、もっと使いやすい構成にしたいと考えたため「PostCSS」をはじめてみようと思いました。

今までの開発環境では、Gulpを用いてSCSSのコンパイル圧縮やHTMLの構文チェックなどのシンプルな仕様でした。大規模な開発など関わることもないのが理由です。
現在のSCSSのディレクトリ構成だと仕様変更の積み重ねによってカスケードが多重化され、CSSファイルからその状態を把握することが難しくなっていました。FLOCCS順守しても不要なフォルダが増加するなど悪循環になってしまうからです。
現状の構成を組み直すのは時間と手間がかかるため、根本的にCSS設計を見直すことにしました。

タスクランナーはGulpを使っていましたが、WEB DEVELOPER Roadmap 2021では、npm-scriptsが推奨されていることを知り、乗り換えることにしました。

## 設計

CSS設計は「ITCSS」を導入することにしました。ITCSSは、CSS Wizardy の Harry Roberts氏が提唱したCSSの詳細度を管理する設計思想です。ITCSSのレイヤーは、必要に応じて追加・削除することも許容されます。

## コンポーネントの命名規則
所属する各レイヤーの接頭辞を付与したBEMを使用します。

### ITCSSのディレクトリ構成

````md
├── Base
│   └── _base.pcss
├── Components
│   ├── _accordion.pcss
│   ├── _alert.pcss
│   ├── _breadcrumb.pcss
│   ├── _button.pcss
│   └── _tab.pcss
├── Generic
│   ├── _author.pcss
│   └── _reset.pcss
├── Layouts
│   ├── _grid.pcss
│   └── _wrapper.pcss
├── Model
│   └── _pagination.pcss
├── Objects
├── Pages
├── Settings
│   ├── _color.pcss
│   └── _global.pcss
├── Site
│   ├── _drawer.pcss
│   ├── _footer.nav.pcss
│   ├── _footer.pcss
│   ├── _header.pcss
│   └── _sidebar.pcss
├── Tools
│   └── _mixin.pcss
├── Trumps
│   └── _utility.pcss
├── Vendor
└── style.pcss
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
    },
}
````

### エクステンションのインストール
1. PostCSS Language Support
2. language-postcss


### package.jsonの生成
`npm init -y`

### 必要なモジュールをインストールする
````zsh
npm install postcss postcss-cli postcss-mixins postcss-import-ext-glob postcss-cssnext postcss-import postcss-simple-vars postcss-nested postcss-extend postcss-calc postcss-reporter postcss-color-function postcss-sorting autoprefixer postcss-sort-media-queries cssnano @babel/cli @babel/core @babel/preset-env browser-sync cpx mkdirp npm-run-all onchange rimraf watch --save-dev
````

### npm scriptsを構成する

#### package.json
配置: プロジェクトルート
````json
{
  "name": "env-2021001_npm-scripts",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "memo/mkdir": "ディレクトリを削除して新しくディレクトリを作る",
    "dist:clean:js": "rimraf ./assets/dist/js/ && mkdirp ./assets/dist/js/",
    "dist:clean:img": "rimraf ./assets/dist/images/ && mkdirp ./assets/dist/images/",
    "memo/cpx": "構造を維持してファイルをコピー",
    "dev:Html:cpx": "cpx './assets/src/**/*.html' './assets/dist/'",
    "Html": "npm-run-all dev:Html:*",
    "dev:css:postcss": "postcss -c ./postcss.config.js ./assets/src/css/style.pcss -o ./assets/dist/css/style.css",
    "css": "npm-run-all -s dev:css:*",
    "dev:js:cpx": "cpx './assets/src/js/*.js' './assets/dist/js/'",
    "js": "npm run dist:clean:js && npm-run-all -s dev:js:*",
    "dev:img:cpx": "cpx './assets/src/images/*.{jpg,jpeg,png,gif,svg,webp,mp4}' './assets/dist/images'",
    "img": "npm run dist:clean:img && npm-run-all -s dev:img:*",
    "memo/watch": "サーバーを起動しHTMLを表示",
    "watch:server": "browser-sync start -s ./assets/dist/ -f 'src, **/*.html'",
    "watch:html": "watch 'npm run Html' ./assets/src/",
    "watch:css": "watch 'npm run css' ./assets/src/css/",
    "watch:js": "watch 'npm run js' ./assets/src/js/",
    "watch:img": "onchange ./assets/src/images/ -e '**/*.DS_Store' -- npm run images",
    "watch": "npm-run-all -p watch:*",
    "test": "echo \"--TEST MESSAGE-- Hello NPM World!\""
  },
  "keywords": [],
  "author": "Juncihi Takabatake",
  "license": "ISC",
  "devDependencies": {
    "@babel/cli": "^7.15.7",
    "@babel/core": "^7.15.5",
    "@babel/preset-env": "^7.15.6",
    "autoprefixer": "^10.3.6",
    "browser-sync": "^2.27.5",
    "cpx": "^1.5.0",
    "cssnano": "^5.0.8",
    "mkdirp": "^1.0.4",
    "npm-run-all": "^4.1.5",
    "onchange": "^7.1.0",
    "postcss": "^8.3.8",
    "postcss-calc": "^8.0.0",
    "postcss-cli": "^9.0.1",
    "postcss-color-function": "^4.1.0",
    "postcss-cssnext": "^3.1.1",
    "postcss-custom-media": "^8.0.0",
    "postcss-extend": "^1.0.5",
    "postcss-import": "^14.0.2",
    "postcss-import-ext-glob": "^2.0.1",
    "postcss-map-get": "^0.3.0",
    "postcss-mixins": "^8.1.0",
    "postcss-nested": "^5.0.6",
    "postcss-reporter": "^7.0.3",
    "postcss-simple-vars": "^6.0.3",
    "postcss-sort-media-queries": "^4.1.0",
    "postcss-sorting": "^6.0.0",
    "properties-order": "^1.0.0",
    "rimraf": "^3.0.2",
    "watch": "^1.0.2"
  }
}
````

#### postcss.config.js
配置: プロジェクトルート

````javascript
module.exports = (ctx) => ({
    plugins: {
        "postcss-import-ext-glob": {},
        "postcss-import": {},
        "postcss-cssnext": {},
        "postcss-mixins": {},
        "postcss-map-get": {},
        "postcss-simple-vars": {
            silent: true,
        },
        "postcss-nested": {},
        "postcss-extend": {},
        "postcss-calc": {},
        "postcss-reporter": {},
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
        
        "autoprefixer": {},
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
````

#### Browsersyncのconfigファイルを生成する
`npx browser-sync init`
配置: プロジェクトルート
bs-config.jsが生成される。

#### autoprefixerのconfigファイルを生成する
.browserslistrc
````js
last 2 versions
not IE 11
````
ルートに配置後は、コマンドで確認可能。
`npx browserslist`

#### npm run
``npm run watch``

## 参考

- 公式 "基本的な使い方は公式から確認"
[公式](https://github.com/postcss/postcss)
[postcss-cli](https://github.com/postcss/postcss-cli)

- 最低限必要なパッケージ
[postcss-preset-env](https://preset-env.cssdb.org/)
[Sassを捨ててPostCSSに移行したのでそのときの工程メモ](https://qiita.com/nabeliwo/items/0aeea21e95f3fbab3955)

- PostCSS導入にあたっての参考
[PostCSS 実践](https://qiita.com/yuki0410_/items/b54a2d3efe93eb786a46?utm_content=buffer21971&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer)
[PostCSSを使ってみる](https://cly7796.net/blog/other/try-using-postcss/)
[PostCSSでCSSファイルを分割する](https://cly7796.net/blog/css/split-css-file-with-postcss/)
[PostCSSの使い方（Sassから移行）](https://barikanblog.com/postcss-from-sass/#toc-1)
[How to Use PostCSS as a Configurable Alternative to Sass](https://www.sitepoint.com/postcss-sass-configurable-alternative/)

- その他
[PostCSSとは何か](https://sssslide.com/speakerdeck.com/jmblog/postcss-tohahe-ka)
[VSCode で `.css` ファイルを PostCSS として読み込ませる](https://qiita.com/Statham/items/d7ac1cf8ff123caa5fb2)
[language-postcss](https://marketplace.visualstudio.com/items?itemName=cpylua.language-postcss)
[Tech Wiki](https://tech-wiki.online/jp/postcss.html#how-is-it-different-than-sass)
