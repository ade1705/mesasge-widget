import FirebaseStore from "./firebase-store";

class StoreFactory {
    make = (storeType) => {
        switch (storeType) {
            case 'firebase' : return new FirebaseStore();
            default:
                throw new Error("unable to find store")
        }
    }
}

export default StoreFactory;
