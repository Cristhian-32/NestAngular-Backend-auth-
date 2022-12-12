import { Module } from '@nestjs/common';
import { AdviserService } from './adviser.service';
import { AdviserController } from './adviser.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { RoleEntity } from 'src/role/role.entity';
import { AdviserRepository } from './adviser.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity, AdviserRepository])],
  providers: [AdviserService],
  controllers: [AdviserController]
})
export class AdviserModule {}
