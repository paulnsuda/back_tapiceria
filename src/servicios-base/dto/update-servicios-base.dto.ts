import { PartialType } from '@nestjs/mapped-types';
import { CreateServiciosBaseDto } from './create-servicios-base.dto';

export class UpdateServiciosBaseDto extends PartialType(CreateServiciosBaseDto) {}
