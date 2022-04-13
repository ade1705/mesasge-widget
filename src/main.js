import WidgetRenderer from "./widget/widget";

const supportedAPI = ['init', 'message'];

const display = () => console.log('diserplay');

const start = (window) => {
    const renderer = new WidgetRenderer();
    renderer.render();
}

start();
