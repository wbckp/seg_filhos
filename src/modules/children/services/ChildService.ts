import { IChildRepository } from '../interfaces/IChildRepository';
import { AppError } from '../../../shared/errors/AppError';
import { CreateChildDTO, UpdateChildDTO, ChildResponseDTO } from '../dtos/ChildDTO';

export class ChildService {
  constructor(private childRepository: IChildRepository) {}

  async listChildren(parentId: string): Promise<ChildResponseDTO[]> {
    const children = await this.childRepository.findByParentId(parentId);
    return children.map((c) => ({
      id: c.id,
      parentId: c.parentId,
      name: c.name,
      birthDate: c.birthDate,
      photoUrl: c.photoUrl || null,
      createdAt: c.createdAt,
    }));
  }

  async getChild(id: string, parentId: string): Promise<ChildResponseDTO> {
    const child = await this.childRepository.findById(id, parentId);
    if (!child) {
      throw new AppError('Child not found', 404);
    }
    return {
      id: child.id,
      parentId: child.parentId,
      name: child.name,
      birthDate: child.birthDate,
      photoUrl: child.photoUrl || null,
      createdAt: child.createdAt,
    };
  }

  async createChild(parentId: string, data: CreateChildDTO): Promise<ChildResponseDTO> {
    const created = await this.childRepository.create({
      parentId,
      name: data.name,
      birthDate: data.birthDate,
      photoUrl: data.photoUrl,
    });
    return {
      id: created.id,
      parentId: created.parentId,
      name: created.name,
      birthDate: created.birthDate,
      photoUrl: created.photoUrl || null,
      createdAt: created.createdAt,
    };
  }

  async updateChild(id: string, parentId: string, data: UpdateChildDTO): Promise<ChildResponseDTO> {
    const child = await this.childRepository.findById(id, parentId);
    if (!child) {
      throw new AppError('Child not found', 404);
    }

    const updated = await this.childRepository.update(id, parentId, data);
    return {
      id: updated.id,
      parentId: updated.parentId,
      name: updated.name,
      birthDate: updated.birthDate,
      photoUrl: updated.photoUrl || null,
      createdAt: updated.createdAt,
    };
  }

  async deleteChild(id: string, parentId: string): Promise<void> {
    const child = await this.childRepository.findById(id, parentId);
    if (!child) {
      throw new AppError('Child not found', 404);
    }
    await this.childRepository.delete(id, parentId);
  }
}
