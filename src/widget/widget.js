import {button} from "./widget-content";
import './widget.scss'
import Quill from 'quill/dist/quill.js';
import Enquiry from "../send/enquiry";

class WidgetRenderer {
    customer = {};
    modalLoader = null;
    unAuthenticatedBlock = null;
    sendButton = null;
    enquiryMaker; subject; editor; authenticatedBlock; customer;

    constructor(customer, authenticator, enquiryMaker) {
        this.authenticator = authenticator;
        this.enquiryMaker = enquiryMaker;
        this.customer = customer;
    }

    showModal = (modalContent, modal) => {
        modalContent.style.display = "block";
        modal.style.display = "flex";
    }

    hideModal = (modalContent, modal) => {
        modalContent.style.display = "none";
        modal.style.display = "none";
    }

    modalLoaderStart = (modalLoader, block) => {
        modalLoader.style.display = "block";
        block.style.opacity = "0.1";
    }

    modalLoaderEnd = (modalLoader, block) => {
        modalLoader.style.display = "none";
        block.style.opacity = "1";
    }

    authenticateUser = () => {
        const authenticateButton = document.querySelector('[data-id="authenticateUser"]');
        authenticateButton.disabled = true;
        const email = document.querySelector('[data-id="email"]');
        email.addEventListener('input',  (value) => {
            authenticateButton.disabled = !(value.currentTarget.value.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ));
        });
        authenticateButton.addEventListener('click',  () => {
            authenticateButton.disabled = true;
            this.modalLoaderStart(this.modalLoader, this.unAuthenticatedBlock);
            this.authenticator.authenticate(
                email,
                authenticateButton,
                this.handleSuccess,
                this.handleError,
            ).then(() => {
                this.modalLoaderEnd(this.modalLoader, this.unAuthenticatedBlock);
                authenticateButton.disabled = false;
            });
        });
    }

    handleSuccess = (emailElement, authenticateButton) => {
        const emailSentBlock = document.querySelector('[data-id="email-sent"]');
        emailSentBlock.style.display = "block";
        const emailNotSentBlock = document.querySelector('[data-id="email-not-sent"]');
        emailNotSentBlock.style.display = "none";
        emailElement.value = "";
    }

    handleError = (authenticateButton) => {
        const emailSentErrorBlock = document.querySelector('[data-id="email-sent-error"]');
        emailSentErrorBlock.style.display = "block";
    }
    checkIfAuthenticated = () => {
        const authenticated = window.localStorage.getItem('isAuthenticated') ?? false;
        this.authenticatedBlock.style.display = "none";
        this.sendButton.style.display = "none";
        if (authenticated) {
            this.unAuthenticatedBlock.style.display = "none";
            this.authenticatedBlock.style.display = "block";
            this.sendButton.style.display = "flex";
        }
    }
    handleSendButtonClick = () => {
        return async () => {
            this.modalLoaderStart(this.modalLoader, this.authenticatedBlock);
            try {
                await this.enquiryMaker.make((new Enquiry())
                    .setSubject(this.subject.value)
                    .setEmail(window.localStorage.getItem('emailForSignIn') ?? '')
                    .setMessage(this.editor.root.innerHTML));
                const enquiryReceived = document.querySelector('[data-id="enquiry-received"]');
                enquiryReceived.style.display = "block";
                this.authenticatedBlock.style.display = "none";
                const successMessage = document.querySelector('[data-id="enquiry-recieved-success-message"] div');
                successMessage.innerHTML = this.customer.getSuccessfulSendMessage();
                this.sendButton.style.display = "none";
            } catch (e) {
                console.log(e)
            } finally {
                this.modalLoaderEnd(this.modalLoader, this.authenticatedBlock);
            }
        }
    }

    render = () => {
        setTimeout(() => {
            this.editor = new Quill('.widget #editorjs', {
                theme: 'snow',
            });
            this.modalLoader = document.querySelector('[data-id="modal-loader"]');
            this.unAuthenticatedBlock = document.querySelector('[data-id="not-authenticated"]');
            this.authenticatedBlock = document.querySelector('[data-id="authenticated"]');
            this.sendButton = document.querySelector('[data-id="send-button"]');
            this.modalLoader.style.display = "none";
            this.sendButton.addEventListener('click',  this.handleSendButtonClick());
            this.setUpSubject();
            this.checkIfAuthenticated();
        }, 1000);
        const body = document.getElementsByTagName('body')[0];
        body.insertAdjacentHTML('beforeend', button);
        const smiley = document.querySelector('[data-id="smiley"]');
        const closeButton = document.querySelector('[data-id="close-button"]');
        const notificationIconInner = document.querySelector('[data-id="notification-icon-inner"]');
        const modalContent = document.querySelector('[data-id="modal-content"]');
        const modal = document.querySelector('[data-id="modal"]');
        const notificationIcon = document.querySelector('[data-id="notification-icon"]');
        notificationIcon.classList.add("hover");
        this.authenticateUser();
        smiley.addEventListener('click',  () => {
            smiley.style.display = "none";
            notificationIcon.classList.remove("hover");
            this.showModal(modalContent, modal);
        })
        closeButton.addEventListener('click',  () => {
            smiley.style.display = "block";
            notificationIconInner.style.display = "none";
            notificationIcon.style.display = "none";
            setTimeout((() => {
                notificationIconInner.style.display = "block";
                notificationIcon.style.display = "block";
            }), 1000);
            setTimeout((() => {
                notificationIcon.classList.add("hover");
            }), 1050);
            this.hideModal(modalContent, modal)
        })
    }

    setUpSubject() {
        this.subject = document.querySelector('[data-id="subject"]');
        let subjectCount = document.querySelector('[data-id="subjectCount"]');
        this.subject.value = this.customer.getSubject();
        subjectCount.textContent = this.subject.value.length;
        this.subject.addEventListener('input', function () {
            subjectCount.textContent = this.value.length;
        });
    }
}

export default WidgetRenderer;
