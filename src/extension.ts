import $ from "jquery";
import PageChangeWatcher from "./component/page-change-watcher";
import type {Gmail, GmailDomEmail, GmailDomCompose} from './@types/gmail'

const GmailFactory = require("gmail-js");
const btnComposeTranslateTemplate = require("./template/button-compose-translate.hbs");

class Extension {
    private readonly gmailJs: Gmail;
    private readonly pageChangeWatcher: PageChangeWatcher;

    constructor() {
        this.gmailJs = new GmailFactory.Gmail($);
        this.pageChangeWatcher = new PageChangeWatcher(this.gmailJs);

        this.loadExtension();
    }

    loadExtension() {
        console.log("Extension loading...");

        this.gmailJs.observe.on("load", () => {
            this.bindEvents();
        });
    }

    bindEvents() {
        const userEmail = this.gmailJs.get.user_email();
        console.log("Hello, " + userEmail + ". This is your extension talking!");

        this.pageChangeWatcher.addCallback((action: string) => {
            console.log("Callback called!", action);
        });

        this.gmailJs.observe.on("view_email", (domEmail: GmailDomEmail) => {
            console.log("Looking at email:", domEmail);
            const emailData = this.gmailJs.new.get.email_data(domEmail);
            console.log("Email data:", emailData);
        });

        this.gmailJs.observe.on("compose", (compose: GmailDomCompose) => {
            console.log("New compose window is opened!", compose);

            this.gmailJs.tools.add_compose_button(compose, btnComposeTranslateTemplate, function() {
                console.log("Composed body is", compose.body());
            }, 'button-compose-translate');
        });
    }
}

new Extension();
