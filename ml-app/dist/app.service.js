"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AppService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let AppService = AppService_1 = class AppService {
    async getScore(input) {
        try {
            const scoringEndPoint = `${AppService_1.scoringHost}`;
            const response = await axios_1.default.post(scoringEndPoint, {
                "model": "llama2",
                "prompt": "Why is the sky blue?"
            });
            return { score: response.data };
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.AppService = AppService;
AppService.scoringHost = 'http://localhost:11434/api/generate';
exports.AppService = AppService = AppService_1 = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map