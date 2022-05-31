class Customer {
    globalObject; customerIdentifier;

    domain = "";

    subject = "Contact us";

    successfulSendMessage = "<h3>Thanks for contacting us.</h3> We have received your email and will get back to you as soon as we can. <br /><br />Thanks, <br />Talkio";

    constructor(window) {
        this.init(window);
    }

    init = (window) => {
        try {
            this.globalObject = window[window['talk2me_widget']];
            const customer = this.globalObject.q[0][1].customer
            this.domain = customer.domain;
        } catch (e) {
            console.error({ e });
        }
    }

    getSubject = () => this.subject;

    getDomain = () => this.domain;

    getSuccessfulSendMessage = () => this.successfulSendMessage;
}

const customer = new Customer(window);

export { customer };
