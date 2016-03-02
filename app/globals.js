var GlobalFunctions = (function () {
    function GlobalFunctions() {
    }
    GlobalFunctions.prototype.preventEventBubbling = function (event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
    };
    ;
    return GlobalFunctions;
})();
exports.GlobalFunctions = GlobalFunctions;
//# sourceMappingURL=globals.js.map