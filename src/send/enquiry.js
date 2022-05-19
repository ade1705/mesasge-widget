class Enquiry {
    email; subject; message;

    setEmail = (email) => {
        this.email = email;
        return this;
    }

    setSubject = (subject) => {
        this.subject = subject;
        return this;
    }

    setMessage = (message) => {
        this.message = message;
        return this;
    }

    toJson = () => JSON.stringify({ email: this.email, subject: this.subject, message: this.message })
}

export default Enquiry;
