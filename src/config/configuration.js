"use strict";
exports.__esModule = true;
exports["default"] = (function () { return ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432
    }
}); });
