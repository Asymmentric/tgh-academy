"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
function router(app) {
    app.get('/', (req, res) => {
        res.send({ status: 'OK', msg: 'Working' });
    });
}
exports.router = router;
