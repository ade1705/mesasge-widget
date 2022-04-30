import {button} from "./widget-content";
import './widget.scss'
import Quill from 'quill/dist/quill.js';

class WidgetRenderer {
    customer = {};
    constructor(authenticator) {
        this.authenticator = authenticator;
    }

    showModal = (modalContent, modal) => {
        modalContent.style.display = "block";
        modal.style.display = "flex";
    }

    hideModal = (modalContent, modal) => {
        modalContent.style.display = "none";
        modal.style.display = "none";
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
            this.authenticator.authenticate(
                email,
                authenticateButton,
                this.handleSuccess,
                this.handleError,
            );
        });
    }

    handleSuccess = (emailElement, authenticateButton) => {
        console.log("handle success");
        authenticateButton.disabled = false;
        emailElement.value = "";
    }

    handleError = (authenticateButton) => {
        console.log("handle error");
        authenticateButton.disabled = false;
    }

    checkIfAuthenticated = () => {
        const authenticated = window.localStorage.getItem('isAuthenticated') ?? false;
        const authenticatedBlock = document.querySelector('[data-id="authenticated"]');
        const sendButton = document.querySelector('[data-id="send-button"]');
        authenticatedBlock.style.display = "none";
        sendButton.style.display = "none";
        const unAuthenticatedBlock = document.querySelector('[data-id="not-authenticated"]');
        if (authenticated) {
            unAuthenticatedBlock.style.display = "none";
            authenticatedBlock.style.display = "block";
            sendButton.style.display = "block";
        }
    }

    render = () => {
        setTimeout(() => {
            const editor = new Quill('.widget #editorjs', {
                theme: 'snow',
            });
            this.checkIfAuthenticated();
        }, 1000);
        const body = document.getElementsByTagName('body')[0];
        body.insertAdjacentHTML('beforeend', button);
        const subject = document.querySelector('[data-id="subject"]');
        const smiley = document.querySelector('[data-id="smiley"]');
        const closeButton = document.querySelector('[data-id="close-button"]');
        const notificationIconInner = document.querySelector('[data-id="notification-icon-inner"]');
        const modalContent = document.querySelector('[data-id="modal-content"]');
        const modal = document.querySelector('[data-id="modal"]');
        const notificationIcon = document.querySelector('[data-id="notification-icon"]');
        let subjectCount = document.querySelector('[data-id="subjectCount"]');
        notificationIcon.classList.add("hover");
        this.authenticateUser();
        subject.addEventListener('input', function () {
           subjectCount.textContent = this.value.length;
        });
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
}

export default WidgetRenderer;
