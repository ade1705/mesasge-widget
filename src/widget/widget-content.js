const octicons = require("@primer/octicons")

const button = `<div class="widget">
<div class="modal" data-id="modal">
    <div class="modal-content" data-id="modal-content">
        <div class="modal-header">
            <span class="icon">${octicons["horizontal-rule"].toSVG()}</span>
            <span class="icon"> ${octicons["arrow-both"].toSVG({ "class": "rotate-45" })}</span>
            <span class="icon" data-id="close-button"> ${octicons.x.toSVG()}</span>
        </div>
        <div class="modal-body">
            <div class="height-325" data-id="not-authenticated">
                <div class="border-bottom padding-bottom-15 padding-top-15">
                    <input type="text" maxlength="50" placeholder="Enter email...." class="text-input" data-id="email">
                </div>
                <button type="button" class="align-items-center margin-top-15 send-button" data-id="authenticateUser">
                    <span>Authenticate</span>
                    <span class="send-icon">${octicons["paper-airplane"].toSVG({ "class": "fill-white" })}</span>
                </button>
            </div>
            <div class="height-325" data-id="authenticated">
                <div class="align-items-center border-bottom padding-bottom-15">
                    <span>From: </span>
                    <img class="avatar" width="24" src="https://faces-img.xcdn.link/image-lorem-face-2286.jpg" data-src="https://faces-img.xcdn.link/thumb-lorem-face-5433_thumb.jpg">
                    <span class="from-email">estherkolade@gmail.com</span>
                </div>
                <div class="justify-content-between border-bottom padding-bottom-15 padding-top-15">
                    <input type="text" maxlength="50" placeholder="Enter subject...." class="text-input" data-id="subject">
                    <span class="subject-count" data-id="subjectCount">0</span>
                </div>
                <div class="padding-bottom-15 padding-top-15 height-200">
                    <div id="editorjs" ></div>
                </div>
            </div>
        </div>
        <div class="modal-footer justify-content-between">
            <div class="align-items-center">
                <span> ${octicons.zap.toSVG()} </span>
                <span> Powered by <u><b>TalkToMe</b></u></span>
            </div>
            <button type="button" class="align-items-center send-button" data-id="send-button">
                <span>Send now</span>
                <span class="send-icon">${octicons["paper-airplane"].toSVG({ "class": "fill-white" })}</span>
            </button>
        </div>
    </div>
</div>
<div class="smiley-box">
    <svg class="smiley" data-id="smiley" width="100" height="100" viewBox="0 0 100 100">
        <circle class="face" cx="32" cy="32" r="28" fill="#295be6"/>
        <path class="mouth" d="M23,40 Q33,50 43,40" />
        <circle class="notification_icon" data-id="notification-icon"  cx="56" cy="16" fill="red" />
        <circle class="notification_icon_inner" data-id="notification-icon-inner" cx="56" cy="16" r="2" fill="#ffffff"/>
    </svg>
</div>
`

export {button}
