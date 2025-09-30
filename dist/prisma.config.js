"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// prisma.config.ts (in project root)
const internals_1 = require("@prisma/internals"); // If using internals; otherwise, skip
exports.default = (0, internals_1.defineConfig)({
    // Optional: Explicit paths (overrides package.json)
    schema: './prisma/schema.prisma',
    // Seed command (run via npx prisma db seed)
    seed: 'ts-node prisma/seed.ts',
});
