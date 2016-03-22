export class GlobalFunctions {
    preventEventBubbling(event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
    };
}