"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const zod_1 = require("zod");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Zod schema for request validation
const requestSchema = zod_1.z.object({
    data: zod_1.z.string().min(1, 'Data must be a non-empty string')
});
// Root route
app.get('/', (_req, res) => {
    res.send('Welcome to the String Processor API. Use POST /process-string');
});
// POST /process-string
app.post('/process-string', (req, res) => {
    try {
        // Validate with Zod
        const parsed = requestSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                error: parsed.error.errors.map(err => err.message).join(', ')
            });
        }
        const { data } = parsed.data;
        const result = {
            original: data,
            word: data.split('').sort().join('')
        };
        res.json(result);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Start locally
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`✅ Server running on http://localhost:${PORT}`);
    });
}
exports.default = app;
