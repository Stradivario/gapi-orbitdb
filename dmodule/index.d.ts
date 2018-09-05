declare module '@gapi/orbitdb/orbitdb-injection' {
	import { InjectionToken } from '@rxdi/core';
	export interface IpfsHashString extends String {
	}
	export interface LamportClock {
	    id: string;
	    time: number;
	}
	export interface OrbitDbIterator<T> {
	    collect(): Array<{
	        hash: IpfsHashString;
	        id: string;
	        payload: {
	            op: string;
	            key: any;
	            value: T;
	        };
	        next: Array<IpfsHashString>;
	        v: number;
	        clock: LamportClock;
	        sig: string;
	        key: string;
	    }>;
	}
	export type OrbitDBEvents = 'replicated' | 'replicate' | 'replicate.progress' | 'load' | 'load.progress' | 'ready' | 'write';
	export interface OrbitLogDatabaseInstanceEvents {
	    on(event: OrbitDBEvents, callback: (address: string) => void): void;
	    on(event: OrbitDBEvents, callback: (address: string, hash: IpfsHashString, entry: any, progress: any, have: any) => void): void;
	    on(event: OrbitDBEvents, callback: (address: string, hash: IpfsHashString, entry: any, progress: any, total: any) => void): void;
	    on(event: OrbitDBEvents, callback: (dbname: string) => void): void;
	}
	export interface OrbitLogDatabaseInstance<T> {
	    load(): void;
	    events: OrbitLogDatabaseInstanceEvents;
	    iterator(options: {
	        limit: number;
	    }): OrbitDbIterator<T>;
	    add(data: T): IpfsHashString;
	}
	export interface OrbitDb {
	    constructor(ipfs: any, directory?: string, options?: any): any;
	    counter(...args: any[]): void;
	    create(...args: any[]): void;
	    disconnect(...args: any[]): void;
	    docs(...args: any[]): void;
	    docstore(...args: any[]): void;
	    eventlog(...args: any[]): void;
	    feed(...args: any[]): void;
	    keyvalue(...args: any[]): void;
	    kvstore(...args: any[]): void;
	    log<T>(...args: any[]): OrbitLogDatabaseInstance<T>;
	    open(...args: any[]): void;
	    stop(...args: any[]): void;
	}
	export const OrbitDb: InjectionToken<OrbitDb>;

}
declare module '@gapi/orbitdb/orbitdb.plugin' {
	import { ExitHandlerService } from '@rxdi/core';
	import { IPFS } from '@gapi/ipfs';
	export class OrbitDbPlugin {
	    private ipfs;
	    private exitHandlerService;
	    constructor(ipfs: IPFS, exitHandlerService: ExitHandlerService);
	    register(): Promise<void>;
	}

}
declare module '@gapi/orbitdb' {
	export class OrbitDbModule {
	}
	export * from '@gapi/orbitdb/orbitdb-injection';
	export * from '@gapi/orbitdb/orbitdb.plugin';

}
