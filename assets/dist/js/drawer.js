window.addEventListener('load', () => {
    new Drawer(992);
});

class Drawer {

    /**
     * @constructor ドロワーメニュー
     * @param {Number} breakpoints 
     */
    constructor(breakpoints) {
        const o = {
            openVisibleSet: "data-focus-visible", //body && Overlay
            triggerButton: "mod-drawer__button",
            toggleOverlay: "mod-drawer__overlay",
            openMenuNavlist: "mod-drawer-navMenu",
            headerNavlist: "mod-header__navlist",
        };

        /**
         * * @type {object} ドロワー開閉を識別するdata属性
         * * @type {object} ドロワーナビゲーションボタン
         * * @type {object} メニューが開かれている時の背景を設定
         * * @type {object} ドロワーメニューリスト
         * * @type {object} ヘッダーメニューリスト
         * * @type {number} ブレークポイントの値をインスタンスに設定 [ドロワーの非表示領域]
         */

        this.openVisibleSet = document.querySelectorAll(`[${o.openVisibleSet}]`);
        this.triggerButton = document.querySelector(`.${o.triggerButton}`);
        this.toggleOverlay = document.querySelector(`.${o.toggleOverlay}`);
        this.openMenuNavlist = document.querySelector(`.${o.openMenuNavlist}`);
        this.headerNavlist = document.querySelector(`.${o.headerNavlist}`);

        this.breakpoints = breakpoints;
        this.deviceConfig = window.matchMedia(`(min-width:${this.breakpoints}px)`).matches;

        this.touchEventListener = this.touchEventDetection(); //タッチイベントの分岐

        this.init();
    }

    init() {
        this.clickEventListeners(this.triggerButton, this.touchEventListener);
        this.clickEventListeners(this.toggleOverlay, this.touchEventListener);
        this.deviceConfigSetAttribute();
    }

    // ボタンとオーバーレイがクリックされたらscriptを走らせる
    clickEventListeners(multipleSelect, handler) {
        multipleSelect.addEventListener(handler, (e) => {
            e.preventDefault();
            this.defaultSetAttributes();
            this.openMenuFocusVisibleToggle();
        });
    }

    // ボタンがtrueならメニューはaria-hiddenをfalseにする
    defaultSetAttributes() {
        const isOpend = 'true';
        const isExpanded = this.triggerButton.getAttribute('aria-expanded') === isOpend;
        this.triggerButton.setAttribute('aria-expanded', !isExpanded);
        this.openMenuNavlist.setAttribute('aria-hidden', isExpanded);
    }

    // trueでオーバーレイを表示、ウインドウの固定
    openMenuFocusVisibleToggle() {
        this.openVisibleSet.forEach((element) => {
            if (element.getAttribute('data-focus-visible') === 'true') {
                element.dataset.focusVisible = 'false';
                document.body.style.overflow = '';
            } else {
                element.dataset.focusVisible = 'true';
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // PC表示の時はドロワーメニューを読み上げない
    deviceConfigSetAttribute() {
        const ishidden = 'true';
        this.deviceConfig ? this.headerNavlist.setAttribute('aria-hidden', !ishidden) : this.headerNavlist.setAttribute('aria-hidden', ishidden);
    }

    // PC: click, Tab&SP: touchstartを適用
    touchEventDetection() {
        return window.ontouchstart ? 'touchstart' : 'click';
    }
}