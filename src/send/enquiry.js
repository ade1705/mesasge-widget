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

    build = () => ({
        email: this.email,
        subject: this.subject,
        message: this.message,
        createdTimeStamp: Math.round(new Date().getTime()/1000),
        isProcessed: false,
    })

    toJson = () => JSON.stringify(this.build())
}

export default Enquiry;
