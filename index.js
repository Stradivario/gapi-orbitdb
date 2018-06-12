"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@gapi/core");
const ipfs_1 = require("@gapi/ipfs");
const orbitDb = require("orbit-db");
const gapi_orbitdb_injection_1 = require("./gapi-orbitdb-injection");
let GapiOribtDbModule = class GapiOribtDbModule {
};
GapiOribtDbModule = __decorate([
    core_1.GapiModule({
        services: [
            {
                provide: gapi_orbitdb_injection_1.OrbitDb,
                deps: [ipfs_1.IPFS],
                useFactory: (ipfs, IPFS) => {
                    return new Promise((r) => ipfs.on('ready', () => __awaiter(this, void 0, void 0, function* () { return r(new orbitDb(ipfs)); })));
                }
            }
        ]
    })
], GapiOribtDbModule);
exports.GapiOribtDbModule = GapiOribtDbModule;
__export(require("./gapi-orbitdb-injection"));
