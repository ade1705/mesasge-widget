import {button} from "./widget-content";
import './widget.scss'

class WidgetRenderer {
    hideModalIfClickOutsideModal = (modalContent, e, modal) => {
        console.log('still here');
        if (!modalContent.contains(e.target)) {
            this.hideModal(modalContent, modal);
        }
    }

    showModal = (modalContent, modal) => {
        modalContent.style.display = "block";
        modal.style.display = "flex";
    }

    hideModal = (modalContent, modal) => {
        modalContent.style.display = "none";
        modal.style.display = "none";
    }

    render = () => {
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
