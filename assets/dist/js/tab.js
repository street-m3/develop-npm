'use strict';

window.addEventListener('load', () => {
    new Tab();
});

class Tab {
    constructor() {
        const o = {
            container: "tab-component",
            tab_list: "tab-component__list",
            tab_item: "tab-component__item",
            tabs: "tab-component__item--button",
            tab_panels_block: "tab-component-panels",
            tabpanels: "tab-component-panel",
            tab_content: "tab-component__content"
        };
        this.tabs = document.querySelectorAll(`.${o.tabs}`);
        this.tabpanels = document.querySelectorAll(`.${o.tabpanels}`);
        this.addDeviceEvent = this._addEventMatchDevice();
        this._settingAttributes();
        this._addEventListeners();
    }

    _addEventListeners() {
        this.tabs.forEach((element) => {
            element.addEventListener(this.addDeviceEvent, (e) => {
                const attr = element.getAttribute("aria-controls");
                e.preventDefault();
                this._toggleTab(attr);
            });
        });
    }

    _toggleTab(id) {
        this.tabs.forEach((tab) => {
            if (tab.getAttribute("aria-controls") == id) {
                tab.setAttribute("aria-selected", "true");
            } else {
                tab.setAttribute("aria-selected", "false");
            }
        });
        this.tabpanels.forEach((panel) => {
            if (panel.getAttribute("id") == id) {
                panel.setAttribute("aria-hidden", "false");
            } else {
                panel.setAttribute("aria-hidden", "true");
            }
        });
    }

    _settingAttributes() {
        const randomId = "tabpanel";
        this.tabs.forEach((tab, index) => {
            tab.setAttribute("aria-controls", `${randomId}-${index}`);
        });
        this.tabpanels.forEach((panel, index) => {
            panel.setAttribute("id", `${randomId}-${index}`);
        });
    }

    _addEventMatchDevice() {
        return window.ontouchstart ? "touchstart" : "click";
    }
}