import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ServiceService {
  constructor(private readonly prisma: PrismaService) {}

  create({
    code,
    fecha,
    georeference,
    installedEquipment,
    node,
    ot,
    retiredEquipment,
    technicalReport,
    typeOfInstallation,
    usuario,
  }: CreateServiceDto) {
    return this.prisma.service.create({
      data: {
        code,
        fecha,
        georeference,
        node,
        ot,
        technicalReport,
        usuario,
        typeOfInstallation: {
          connectOrCreate: {
            create: { name: typeOfInstallation },
            where: { name: typeOfInstallation },
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.service.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
