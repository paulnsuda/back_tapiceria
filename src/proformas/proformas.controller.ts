import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProformasService } from './proformas.service';
import { CreateProformaDto } from './dto/create-proforma.dto';
import { UpdateProformaDto } from './dto/update-proforma.dto';

@Controller('proformas')
export class ProformasController {
  constructor(private readonly proformasService: ProformasService) {}

  @Post()
  create(@Body() createProformaDto: CreateProformaDto) {
    return this.proformasService.create(createProformaDto);
  }

  @Get()
  findAll() {
    return this.proformasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proformasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProformaDto: UpdateProformaDto) {
    return this.proformasService.update(+id, updateProformaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proformasService.remove(+id);
  }
}