import { ExitHandlerService } from '@rxdi/core';
import { IPFS } from '@gapi/ipfs';
export declare class OrbitDbPlugin {
    private ipfs;
    private exitHandlerService;
    constructor(ipfs: IPFS, exitHandlerService: ExitHandlerService);
    register(): Promise<void>;
}
