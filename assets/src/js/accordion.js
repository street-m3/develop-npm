window.addEventListener('load', () => {
    new Accordion('p-accordions', 'js-accordion-header');
});

class Accordion {
    constructor(container, tab) {
        this.accordionContainer = document.querySelector(`.${container}`);
        this.accordionTabs = document.querySelectorAll(`.${tab}`);
        this.accordionAddCls = 'is-open-panel';
        this.touchEventListener = this.touchEventDetection();
        this.multiSelectDefault = true;
        this.init();
    }

    init() {
        if (!this.accordionContainer) return;
        this.accordion_trigger();
    }

    accordion_trigger() {
        this.accordionTabs.forEach((item) => {
            item.addEventListener(this.touchEventListener, (e) => {
                e.preventDefault();
                this.multiSelectable(item);
                item.classList.toggle(this.accordionAddCls);
                const panelItembody = item.nextElementSibling;
                if (item.classList.contains(this.accordionAddCls)) {
                    panelItembody.style.maxHeight = panelItembody.scrollHeight + 'px';
                } else {
                    panelItembody.style.maxHeight = 0;
                }
            });
        });
    }

    multiSelectable(tabitem) {
        if (this.multiSelectDefault == true) {
            const currentlyPanel = this.accordionContainer.querySelector('.js-accordion-header.is-open-panel');
            if (currentlyPanel && currentlyPanel !== tabitem) {
                currentlyPanel.classList.remove(this.accordionAddCls);
                currentlyPanel.nextElementSibling.style.maxHeight = 0;
            }
        }
    }

    touchEventDetection() {
        return window.ontouchstart ? "touchstart" : "click";
    }
}

/**
 * <div class="p-accordion-item">
    <div class="p-accordion-header js-accordion-header">
        <button type="button" class="p-accordion-tab">
            見積は無料ですか？
            <span class="p-accordion-tabicon"></span>
        </button>
    </div>
    <div class="p-accordion-panel js-accordion-panel">
        <div class="p-accordion-content">
            無料です。金額を知りたいだけなどでも、できる限りお答えしております。
        </div>
    </div>
</div>

<style>
.p-accordion-item {
    background-color: #ffffff;
    color: #333333;
    border: 1px solid #333;
}
.p-accordion-item + .p-accordion-item {
    margin-top: 30px;
}

.p-accordion-tab {
    display: flex;
    align-items: center;
    height: 68px;
    font-size: 18px;
    font-weight: 500;
    text-align: left;
    position: relative;
    padding: 0 68px 0 30px;
    width: 100%;
    overflow: hidden;
}

.p-accordion-tab::before {
    content: 'Q';
    display: block;
    color: #D33429;
    font-size: 18px;
    font-weight: bold;
    width: 1em;
    line-height: 1;
    margin-top: -0.2em;
    margin-right: 15px;
}

.p-accordion-tabicon {
    display: inline-block;
    height: 68px;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    width: 68px;
    background-color: #49403C;
}

.p-accordion-tabicon::before,
.p-accordion-tabicon::after {
    background-color: #ffffff;
    bottom: 0;
    content: "";
    display: inline-block;
    height: 2px;
    left: 0;
    margin: auto;
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
}

.p-accordion-tabicon::after {
    transform: rotate(90deg);
    transition: transform 0.3s ease-out 0s;
}

.p-accordion-header.is-open-panel .p-accordion-tabicon::after {
    transform: rotate(180deg);
}

.p-accordion-panel {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
}

.p-accordion-content {
    padding: 30px 50px;
    background-color: #F7E6E1;
}
</style>
 */

