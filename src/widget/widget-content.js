const octicons = require("@primer/octicons")
const smileyIcon = `<div class="smiley-box">
    <svg class="smiley" data-id="smiley" width="100" height="100" viewBox="0 0 100 100">
        <polygon fill="#295be6"
            points="0,10 0,42 10,42 5,56 25,42 56,42 56,0" />
        <path class="mouth" d="M18,28 Q30,38 42,28" />
        <circle class="notification_icon" data-id="notification-icon"  cx="56" cy="16" fill="red" />
        <circle class="notification_icon_inner" data-id="notification-icon-inner" cx="56" cy="16" r="2" fill="#ffffff"/>
    </svg>
</div>`;

const loader = `<div>
    <svg class="smiley" width="70" height="70" viewBox="0 0 70 70">
        <polygon fill="#295be6"
            points="0,10 0,42 10,42 5,56 25,42 56,42 56,0" />
        <path class="mouth" d="M18,28 Q30,38 42,28" />
        <circle r="10" cx="56" cy="16" fill="red">
            <animate attributeName="r" begin="0s" dur="1s" repeatCount="indefinite" from="5" to="12"/>
        </circle>
        <circle class="notification_icon_inner" cx="56" cy="16" r="2" fill="#ffffff"/>
    </svg>
</div>`;

const email = window.localStorage.getItem('emailForSignIn') ?? '';

const button = `<div class="widget">
<div class="modal" data-id="modal">
    <div class="modal-content" data-id="modal-content">
        <div class="modal-header">
            <span class="icon">${octicons["horizontal-rule"].toSVG()}</span>
            <span class="icon"> ${octicons["arrow-both"].toSVG({ "class": "rotate-45" })}</span>
            <span class="icon" data-id="close-button"> ${octicons.x.toSVG()}</span>
        </div>
        <div class="modal-body">
            <div id="modal-loader" data-id="modal-loader">
                ${loader}
            </div>
            <div class="height-325" data-id="enquiry-received" style="display: none">
                <div>
                    <div class="padding-top-15">
                        <svg class="smiley" width="70" height="70" viewBox="0 0 70 70">
                            <polygon fill="#295be6"
                                points="0,10 0,42 10,42 5,56 25,42 56,42 56,0" />
                            <path class="mouth" d="M18,28 Q30,38 42,28" />
                            <circle r="10" cx="56" cy="16" fill="red" />
                            <circle class="notification_icon_inner" cx="56" cy="16" r="2" fill="#ffffff"/>
                        </svg>
                    </div>
                </div>
                <div data-id="enquiry-recieved-success-message">
                    <div class="margin-top-15">
                        <h3>Thanks.</h3> We have recieved your email and will get back to you as soon as we can. <br /><br />Thank you, <br />Talkio
                    </div>
                </div>      
            </div>
            <div class="height-325" data-id="not-authenticated">
                <div>
                    <div class="padding-top-15">
                        <svg class="smiley" width="70" height="70" viewBox="0 0 70 70">
                            <polygon fill="#295be6"
                                points="0,10 0,42 10,42 5,56 25,42 56,42 56,0" />
                            <path class="mouth" d="M18,28 Q30,38 42,28" />
                            <circle r="10" cx="56" cy="16" fill="red" />
                            <circle class="notification_icon_inner" cx="56" cy="16" r="2" fill="#ffffff"/>
                        </svg>
                    </div>
                </div>
                <div data-id="email-sent-error" style="display: none">
                    <span>*Unable to send login email, please try again.</span>
                </div>
                <div data-id="email-not-sent">
                    <div class="margin-top-15">
                        <h3>Hi there, welcome to talkio.</h3> To contact us, please enter your email address to start, we will send a link to your email for you to login.
                    </div>
                    <div class="border-bottom padding-bottom-15 padding-top-15">
                        <input type="text" maxlength="50" placeholder="Enter email...." class="text-input" data-id="email">
                    </div>
                    <button type="button" class="align-items-center margin-top-15 send-button" data-id="authenticateUser">
                        <span>Get Started</span>
                        <span class="send-icon">${octicons["paper-airplane"].toSVG({ "class": "fill-white" })}</span>
                    </button>
                </div>
                <div data-id="email-sent" style="display: none">
                    <div class="margin-top-15">
                        <h3>Email Sent.</h3> The login email has been sent to your email, please also check your spam messages if you cannot find it.
                    </div>
                </div>      
            </div>
            <div class="height-325" data-id="authenticated">
                <div class="align-items-center border-bottom padding-bottom-15">
                    <span>From: </span>
                    <img class="avatar" width="24" src="https://faces-img.xcdn.link/image-lorem-face-2286.jpg" data-src="https://faces-img.xcdn.link/thumb-lorem-face-5433_thumb.jpg">
                    <span class="from-email">${email}</span>
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
                <span> Powered by <u><b>talkio</b></u></span>
            </div>
            <button type="button" class="align-items-center send-button" data-id="send-button">
                <span>Send now</span>
                <span class="send-icon">${octicons["paper-airplane"].toSVG({ "class": "fill-white" })}</span>
            </button>
        </div>
    </div>
</div>
${smileyIcon}
`
export {button, smileyIcon}
