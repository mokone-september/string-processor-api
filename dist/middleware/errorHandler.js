"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, _req, res, _next) {
    console.error('Unhandled Error:', err.stack);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
}
exports.default = errorHandler;
