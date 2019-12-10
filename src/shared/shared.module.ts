import { Module } from '@nestjs/common';

import { EntityValidationPipe } from './entityValidationPipe';

@Module({
  providers: [
    EntityValidationPipe
  ],
})
export class SharedModule { }
