import WidgetRenderer from "./widget/widget";
import Authenticator from "./authenticator";
import EnquiryService from "./send/enquiry-service";
import StoreFactory from "./send/stores/store-factory";

const start = (window) => {
    const renderer = new WidgetRenderer(window, new Authenticator(window), new EnquiryService(new StoreFactory()));
    renderer.render();
}

start(window);
