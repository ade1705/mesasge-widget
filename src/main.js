import WidgetRenderer from "./widget/widget";
import Authenticator from "./authenticator";
import EnquiryService from "./send/enquiry-service";
import StoreFactory from "./send/stores/store-factory";
import { customer } from "./customer/customer";

const start = () => {
    const renderer = new WidgetRenderer(
        customer,
        new Authenticator(customer),
        new EnquiryService(new StoreFactory())
    );
    renderer.render();
}

start();
