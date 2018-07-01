"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@rxdi/core");
const ipfs_1 = require("@gapi/ipfs");
const orbitdb_injection_1 = require("./orbitdb-injection");
const orbitDb = require("orbit-db");
let OrbitDbPlugin = class OrbitDbPlugin {
    constructor(ipfs, exitHandlerService) {
        this.ipfs = ipfs;
        this.exitHandlerService = exitHandlerService;
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            yield core_1.Container.set(orbitdb_injection_1.OrbitDb, new orbitDb(this.ipfs));
            const odbContainer = core_1.Container.get(orbitdb_injection_1.OrbitDb);
            this.exitHandlerService.errorHandler.subscribe(e => {
                odbContainer.stop();
                odbContainer.disconnect();
            });
        });
    }
};
OrbitDbPlugin = __decorate([
    core_1.Plugin(),
    __param(0, core_1.Inject(ipfs_1.IPFS)),
    __metadata("design:paramtypes", [Object, core_1.ExitHandlerService])
], OrbitDbPlugin);
exports.OrbitDbPlugin = OrbitDbPlugin;
