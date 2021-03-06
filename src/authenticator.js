import {initializeApp} from "firebase/app";
import {getAuth, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink} from "firebase/auth";
import firebaseConfig from "./firebase-config";

class Authenticator {
    auth = null;
    customer = {};

    constructor(customer) {
        this.customer = customer;
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        this.auth = auth;
        if (isSignInWithEmailLink(auth, window.location.href)) {
            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                email = window.prompt('Please provide your email for confirmation');
            }
            signInWithEmailLink(auth, email, window.location.href)
                .then(() => {
                    window.localStorage.setItem('isAuthenticated', true);
                })
                .catch((error) => {
                    console.error({ error });
                    //ToDO: unable to authenticate for some reason, should show an error
                });
        }
    }

    authenticate = (email, authenticateButton, handleSuccess, handleError) => {
        const actionCodeSettings = {
            url: this.customer.getDomain(),
            handleCodeInApp: true,
        };

        return sendSignInLinkToEmail(this.auth, email.value, actionCodeSettings)
            .then(() => {
                window.localStorage.setItem('emailForSignIn', email.value);
                handleSuccess(email, authenticateButton);
            })
            .catch((error) => {
                console.error({ error });
                handleError(authenticateButton);
            }).finally(() => {
            return new Promise(function(resolve) {
                resolve();
            });
        });
    }
}

export default Authenticator;
