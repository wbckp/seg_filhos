import { IChildRepository } from '../interfaces/IChildRepository';
import { Child } from '../entities/Child';
import { prisma } from '../../../infrastructure/database/prisma';

export class ChildRepository implements IChildRepository {
  async findById(id: string, parentId: string): Promise<Child | null> {
    const child = await prisma.child.findFirst({
      where: { id, parentId, deletedAt: null },
    });
    if (!child) return null;
    return new Child(child.id, child.parentId, child.name, child.birthDate, child.photoUrl, child.createdAt, child.updatedAt);
  }

  async findByParentId(parentId: string): Promise<Child[]> {
    const children = await prisma.child.findMany({
      where: { parentId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return children.map(
      (c: any) => new Child(c.id, c.parentId, c.name, c.birthDate, c.photoUrl, c.createdAt, c.updatedAt)
    );
  }

  async create(data: Omit<Child, 'id' | 'createdAt' | 'updatedAt'>): Promise<Child> {
    const created = await prisma.child.create({
      data: {
        parentId: data.parentId,
        name: data.name,
        birthDate: data.birthDate,
        photoUrl: data.photoUrl,
      },
    });
    return new Child(created.id, created.parentId, created.name, created.birthDate, created.photoUrl, created.createdAt, created.updatedAt);
  }

  async update(id: string, parentId: string, data: Partial<Child>): Promise<Child> {
    await prisma.child.updateMany({
      where: { id, parentId, deletedAt: null },
      data: {
        name: data.name,
        birthDate: data.birthDate,
        photoUrl: data.photoUrl,
      },
    });
    
    const updated = await this.findById(id, parentId);
    if (!updated) throw new Error('Child not found after update');
    
    return updated;
  }

  async delete(id: string, parentId: string): Promise<void> {
    await prisma.child.updateMany({
      where: { id, parentId },
      data: { deletedAt: new Date() },
    });
  }
}
