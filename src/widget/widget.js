import {button} from "./widget-content";
import './widget.scss'

class WidgetRenderer {
    render = () => {
        const body = document.getElementsByTagName('body')[0];
        body.insertAdjacentHTML('beforeend', button);
    }
}

export default WidgetRenderer;
