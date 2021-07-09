import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, getConnectionOptions } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory: async () => (
      Object.assign(await getConnectionOptions(process.env.NODE_ENV === "production" ? "prod" : "dev"))
    )
  })],
  exports: [TypeOrmModule],
})
export class DatabaseModule {
  constructor(private connection: Connection) {
    if (connection.isConnected) console.log('Connected Successfully!');
  }
}
