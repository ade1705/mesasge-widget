import WidgetRenderer from "./widget/widget";
import Authenticator from "./authenticator";
import EnquiryMaker from "./send/enquiry-maker";

const start = (window) => {
    const renderer = new WidgetRenderer(window, new Authenticator(window), new EnquiryMaker());
    renderer.render();
}

start(window);
