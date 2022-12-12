import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AdviserService } from './adviser.service';
import { NewAdviserDto } from './dto/new-adviser.dto';

@Controller('api/adviser')
export class AdviserController {

    constructor(private readonly adviserService: AdviserService) {}

    @Get()
    getAll() {
        return this.adviserService.getAll();
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post('nuevo')
    create(@Body() dto: NewAdviserDto) {
        return this.adviserService.create(dto);
    }
}
