import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from './entities/admin.entity';
import { Model } from 'mongoose';
import { Role } from 'src/utils/roles.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<AdminDocument>,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createAdminDto.password,
      saltRounds,
    );

    const admin: AdminDocument = new this.adminModel({
      ...createAdminDto,
      password: hashedPassword,
      role: Role.Admin,
    });
    return admin.save();
  }

  findAll() {
    return this.adminModel.find();
  }

  findOne(id: string) {
    return this.adminModel.findById(id);
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const currentAdmin = await this.adminModel.findById(id);
    if (!currentAdmin) {
      return null;
    }
    if (updateAdminDto.password) {
      const saltRounds = 10;
      updateAdminDto.password = await bcrypt.hash(
        updateAdminDto.password,
        saltRounds,
      );
    }

    Object.assign(currentAdmin, updateAdminDto);

    return currentAdmin.save();
  }

  remove(id: string) {
    return this.adminModel.findByIdAndDelete(id);
  }
}
