import { Module } from '@rxdi/core';
import { OrbitDbPlugin } from './orbitdb.plugin';

@Module({
    plugins: [OrbitDbPlugin]
})
export class OribtDbModule {}

export * from './orbitdb-injection';
export * from './orbitdb.plugin';
