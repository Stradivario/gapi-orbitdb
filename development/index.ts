import { GapiModuleWithServices, GapiModule } from '@gapi/core';
import { IPFS } from '@gapi/ipfs';
import * as orbitDb from 'orbit-db';
import { OrbitDb } from './gapi-orbitdb-injection';

@GapiModule({
    services: [
        {
            provide: OrbitDb,
            deps: [IPFS],
            useFactory: (ipfs: IPFS, IPFS) => {
                return new Promise((r) => ipfs.on('ready', async () => r(new orbitDb(ipfs))));
            }
        }
    ]
})
export class GapiOribtDbModule {}

export * from './gapi-orbitdb-injection';
