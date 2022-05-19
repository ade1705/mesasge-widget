class EnquiryService {
    store;

    constructor(storeFactory) {
        this.store = storeFactory.make('firebase');
    }

    make = async (enquiry) => {
        return this.store.save(enquiry);
    }
}

export default EnquiryService;
