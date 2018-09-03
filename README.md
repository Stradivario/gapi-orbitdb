# @Gapi OrbitDb decentralized database Module (Beta)

##### More information about OrbitDb can be found here [OrbitDb](https://github.com/orbitdb/orbit-db)
##### For questions/issues you can write ticket [here](http://gitlab.youvolio.com/gapi/gapi-orbitdb/issues)
##### This module is intended to be used with [GAPI](https://github.com/Stradivario/gapi)

## Installation and basic examples:
##### To install this Gapi module, run:

```bash
$ npm install @gapi/orbitdb --save
```

## Beta Decentralized module using @rxdi infrastructure

##### To install @orbitdb from ipfs network install globally @rxdi/core `npm i @rxdi/core`
Check it inside ipfs network: [QmdjvDUmJaXB5FqD2P2zhJ1AavCRbTPYTFEaai1MQRivi9](http://ipfs.io/ipfs/QmdjvDUmJaXB5FqD2P2zhJ1AavCRbTPYTFEaai1MQRivi9)

```bash
$ rxdi i QmdjvDUmJaXB5FqD2P2zhJ1AavCRbTPYTFEaai1MQRivi9
```

Important: 
- You can use this module without @gapi just @orbitdb when importing
- Decentralized module includes property packages: [] if it depends on some "centralized" source
- rxdi install will trigger npm install after finish if there are any packages: [] inside array so you don't have to install
- In this case we will install @gapi/ipfs@1.2.55 and orbit-db@0.19.8 since it is the working version nothing less nothing more! ;)

```json
{
    "name": "@orbitdb",
    "typings": "QmcPwkW8sU77yc78rvbmRyKikMm4gieseqRLN71dwdExFu",
    "module": "QmUEqSRJvn44ThooeizVT8Tp7moW188hX4sBDgV3hN2khc",
    "packages": [
        {
            "name": "orbit-db",
            "version": "0.19.8"
        },
        {
            "name": "@gapi/ipfs",
            "version": "1.2.55"
        },
        {
            "name": "@rxdi/core",
            "version": "0.0.246"
        }
    ]
}
```

## Consuming @gapi/orbitdb

Important: if you install from decentralized source via `rxdi i` command you don't need to install @gapi/ipfs module!

##### To work everything as expected we need to install [@gapi/ipfs](https://github.com/Stradivario/gapi-ipfs) module because OrbitDB is working with ipfs protocol to install it type:

```bash
npm i @gapi/ipfs
```
##### Important part is that Ipfs module should be resolved before OrbitDb module to work properly

##### Then import your module above OrbitDbModule the following way:

##### Import inside AppModule or CoreModule

```typescript

import { Module } from '@rxdi/core';
import { IpfsModule } from '@gapi/ipfs';
import { OrbitDbModule } from '@gapi/orbitdb';

@Module({
    imports: [
        IpfsModule.forRoot({
            start: true,
            config: {
                Addresses: {
                    API: '/ip4/127.0.0.1/tcp/5002',
                    Announce: [],
                    Gateway: '/ip4/127.0.0.1/tcp/8081',
                    NoAnnounce: [],
                    Swarm: [
                        '/ip4/0.0.0.0/tcp/4002',
                        '/ip6/::/tcp/4002'
                    ]
                },
            },
            logging: true,
        }),
        OrbitDbModule
    ]
})
export class CoreModule { }

```

##### Interact with orbitdb

note: keep in mind that this is beta testing and contribution is appreciated ! :)

```typescript

import { Inject, Service } from '@rxdi/core';
import { IPFS_NODE_READY } from '@gapi/ipfs';
import { OrbitDb } from '@gapi/orbitdb';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export class User {
    id: number;
    name: string;
    email: string;
};

@Service()
export class OrbitService {
    constructor(
        @Inject(OrbitDb) private orbitdb: OrbitDb,
    ) {
        this.ipfsNodeReady
            .switchMap(
                () => Observable.fromPromise(this.orbitTest())
            )
            .subscribe();
    }

    async orbitTest() {
        // In later version gapi will resolve Async Factories and will not be needed
        const db = await this.orbitdb.log<User>('hello');
        await db.load();

        // Listen for updates from peers
        db.events.on('replicated', (address) => {
            console.log(db.iterator({ limit: -1 }).collect());
        });

        // Add an entry

        const hash = await db.add({ id: 1, name: 'Kristiyan Tachev', email: 'kristiqn.tachev@gmail.com' });
        console.log(hash);

        // Query
        const result = db.iterator({ limit: -1 }).collect();

        console.log(result[result.length - 1].payload.value.id);
        // 1

        console.log(result[result.length - 1].payload.value.name);
        // Kristiyan Tachev

        console.log(result[result.length - 1].payload.value.email);
        // kristiqn.tachev@gmail.com
        return await Promise.resolve();
    }

}

```

TODO: Better documentation...

Enjoy ! :)
