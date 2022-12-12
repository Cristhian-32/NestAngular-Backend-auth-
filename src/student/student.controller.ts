import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { RoleDecorator } from 'src/decorators/role.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { RoleName } from 'src/role/role.enum';
import { StudentDto } from './dto/student.dto';
import { StudentService } from './student.service';

@Controller('api/student')
export class StudentController {

    constructor( private readonly studentService: StudentService) {}
    
    @RoleDecorator(RoleName.ADMIN, RoleName.ADVISER, RoleName.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getAll() {
        return await this.studentService.getAll();
    }

    @RoleDecorator(RoleName.ADMIN, RoleName.ADVISER, RoleName.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id:number){
        return await this.studentService.findById(id);
    }

    @RoleDecorator(RoleName.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async create(@Body() dto: StudentDto) {
        return await this.studentService.create(dto);
    }

    @RoleDecorator(RoleName.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id:number, @Body() dto:StudentDto) {
        return await this.studentService.update(id, dto);
    }

    @RoleDecorator(RoleName.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.studentService.delete(id);
    }

}