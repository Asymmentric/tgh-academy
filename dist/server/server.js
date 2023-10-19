"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const invalidJSONSyntaxHandler_1 = require("./utils/invalidJSONSyntaxHandler");
const routes_1 = require("./routes/routes");
class App {
    constructor() {
        this.errorHandler = new invalidJSONSyntaxHandler_1.ErrorHandlers();
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
        this.app.use('*', this.errorHandler.routeNotFoundHandler);
        this.startServer(9089);
    }
    config() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded());
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(this.errorHandler.JSONSyntaxErrorHandler);
    }
    routes() {
        (0, routes_1.router)(this.app);
    }
    startServer(port) {
        this.app.listen(port, () => {
            console.log(`Server running at ${port}`);
        });
    }
}
exports.App = App;
