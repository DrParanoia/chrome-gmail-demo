import CallbackContainer from "../class/callback-container";

import type {Gmail} from '../@types/gmail'

export default class PageChangeWatcher extends CallbackContainer {
    private readonly gmailJs: Gmail;

    private readonly pageChangeActions: string[] = [
        'oestp'
    ];

    constructor(gmailJs: Gmail) {
        super();

        this.gmailJs = gmailJs;

        this.bindEvents();
    }

    bindEvents() {
        this.gmailJs.observe.after('http_event', (params: any, xhr: XMLHttpRequest) => {
            let action = decodeURIComponent(params.url.act);

            if (this.pageChangeActions.includes(action)) {
                this.callCallbacks(action);
            }
        });

        addEventListener('hashchange', event => {
            this.callCallbacks('hashchange');
        });
    }
}
