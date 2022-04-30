import WidgetRenderer from "./widget/widget";
import Authenticator from "./authenticator";

const start = (window) => {
    const renderer = new WidgetRenderer(new Authenticator(window));
    renderer.render();
}

start(window);
