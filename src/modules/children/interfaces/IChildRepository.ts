import { Child } from '../entities/Child';

export interface IChildRepository {
  findById(id: string, parentId: string): Promise<Child | null>;
  findByParentId(parentId: string): Promise<Child[]>;
  create(child: Omit<Child, 'id' | 'createdAt' | 'updatedAt'>): Promise<Child>;
  update(id: string, parentId: string, data: Partial<Child>): Promise<Child>;
  delete(id: string, parentId: string): Promise<void>;
}
