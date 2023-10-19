"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlers = void 0;
class ErrorHandlers {
    JSONSyntaxErrorHandler(error, req, res, next) {
        if (error instanceof SyntaxError && 'body' in error) {
            console.log(error);
            res.status(400).send({
                status: false,
                error: {
                    message: error.message,
                }
            });
        }
        else
            next();
    }
    routeNotFoundHandler(req, res) {
        res.status(404).send({ status: 'Not Found' });
    }
}
exports.ErrorHandlers = ErrorHandlers;
