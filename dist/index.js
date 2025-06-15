"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load .env in development
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Zod schema for request validation
const requestSchema = zod_1.z.object({
    data: zod_1.z.string().min(1, 'The "data" field must be a non-empty string')
});
// Root GET route
app.get('/', (_req, res) => {
    res.send('Welcome to the String Processor API. Use POST /process-string');
});
// POST /process-string
app.post('/process-string', (req, res) => {
    const parsed = requestSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            error: parsed.error.errors.map((e) => e.message).join(', ')
        });
    }
    const { data } = parsed.data;
    // Convert string to array of characters and sort alphabetically
    const sortedArray = data.split('').sort();
    // Return the sorted array in the required format
    res.json({ word: sortedArray });
});
// Run locally
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`✅ Server running at: http://localhost:${PORT}`);
    });
}
exports.default = app;
