import { Module } from '@nestjs/common';
import { BCryptAdapter } from './adapters';

@Module({
  providers: [BCryptAdapter],
  exports: [BCryptAdapter],
})
export class CommonModule {}
