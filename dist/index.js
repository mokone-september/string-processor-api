"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const zod_1 = require("zod");
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Zod schema for request validation
const processStringSchema = zod_1.z.object({
    data: zod_1.z.string(),
});
// Health check
app.get('/', (_req, res) => res.send('API Ready'));
// Main endpoint
app.post('/process-string', (req, res, next) => {
    try {
        const parseResult = processStringSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ error: 'Send { "data": "string" }' });
        }
        const { data } = parseResult.data;
        const result = {
            original: data,
            word: data.trim().split('').sort()
        };
        res.json(result);
    }
    catch (err) {
        next(err);
    }
});
// Error handling middleware
app.use(errorHandler_1.default);
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
