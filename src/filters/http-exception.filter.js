"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AllExceptionsFilter = void 0;
var common_1 = require("@nestjs/common");
var AllExceptionsFilter = /** @class */ (function () {
    function AllExceptionsFilter() {
        this.logger = new common_1.Logger(AllExceptionsFilter_1.name);
    }
    AllExceptionsFilter_1 = AllExceptionsFilter;
    AllExceptionsFilter.prototype["catch"] = function (exception, host) {
        var ctx = host.switchToHttp();
        var response = ctx.getResponse();
        var request = ctx.getRequest();
        var status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        var message = exception instanceof common_1.HttpException ? exception.getResponse() : exception;
        this.logger.error("Http Status: ".concat(status, " Error Message: ").concat(JSON.stringify(message), " "));
        response.status(status).json({
            timestamp: new Date().toISOString(),
            path: request.url,
            error: message
        });
    };
    var AllExceptionsFilter_1;
    AllExceptionsFilter = AllExceptionsFilter_1 = __decorate([
        (0, common_1.Catch)()
    ], AllExceptionsFilter);
    return AllExceptionsFilter;
}());
exports.AllExceptionsFilter = AllExceptionsFilter;
