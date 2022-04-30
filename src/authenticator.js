import {initializeApp} from "firebase/app";
import {getAuth, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink} from "firebase/auth";
import firebaseConfig from "./firebase-config";

class Authenticator {
    auth = null;
    customer = {};

    constructor(window) {
        this.customer = this.getCustomer(window);
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        this.auth = auth;
        if (isSignInWithEmailLink(auth, window.location.href)) {
            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                email = window.prompt('Please provide your email for confirmation');
            }
            signInWithEmailLink(auth, email, window.location.href)
                .then((result) => {
                    window.localStorage.removeItem('emailForSignIn');
                    console.log(result.user);
                })
                .catch((error) => {
                    console.error({ error });
                });
        }
    }

    authenticate = (email, authenticateButton, handleSuccess, handleError) => {
        const actionCodeSettings = {
            url: this.customer.domain,
            handleCodeInApp: true,
        };

        sendSignInLinkToEmail(this.auth, email.value, actionCodeSettings)
            .then((response) => {
                window.localStorage.setItem('emailForSignIn', email.value);
                handleSuccess(email, authenticateButton);
            })
            .catch((error) => {
                console.error({ error });
                handleError(authenticateButton);
            });
    }

    getCustomer = (window) => {
        try {
            let globalObject = window[window['talk2me_widget']];
            return globalObject.q[0][1].customer;
        } catch (e) {
            console.error({ e });
        }
    }
}

export default Authenticator;
