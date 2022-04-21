class ExtensionInjector {
    constructor() {
        this.addScript("dist/extension.js");
    }

    addScript(src: string) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = chrome.runtime.getURL(src);
        (document.body || document.head || document.documentElement).appendChild(script);
    }
}

new ExtensionInjector();
