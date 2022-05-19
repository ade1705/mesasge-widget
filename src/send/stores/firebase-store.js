import { collection, addDoc } from "firebase/firestore";
import {db} from "../../firebase";

class FirebaseStore {
    save = async (enquiry) => {
        console.log({ enquiry: enquiry.toJson() });
        try {
            const docRef = await addDoc(collection(db, "enquiries"), enquiry.build());
            console.log("Document written with ID: ", docRef.id);
            return true;
        } catch (e) {
            console.error("Error adding document: ", e);
            throw new Error("Error adding document: ", e)
        }

    }
}

export default FirebaseStore;
