import { Plugin, Inject, Container, ExitHandlerService } from '@rxdi/core';
import { IPFS } from '@gapi/ipfs';
import { OrbitDb } from './orbitdb-injection';
import * as orbitDb from 'orbit-db';

@Plugin()
export class OrbitDbPlugin {
    constructor(
        @Inject(IPFS) private ipfs: IPFS,
        private exitHandlerService: ExitHandlerService
    ) {

    }

    async register() {
        await Container.set(OrbitDb, new orbitDb(this.ipfs));
        const odbContainer: OrbitDb = Container.get(OrbitDb);
        this.exitHandlerService.errorHandler.subscribe(e => {
            odbContainer.stop(); 
            odbContainer.disconnect(); 
        });
    }
}