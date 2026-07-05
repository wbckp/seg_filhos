import { IProfileRepository } from '../interfaces/IProfileRepository';
import { Profile } from '../entities/Profile';
import { prisma } from '../../../infrastructure/database/prisma';

export class ProfileRepository implements IProfileRepository {
  async findById(id: string): Promise<Profile | null> {
    const profile = await prisma.profile.findUnique({ where: { id } });
    if (!profile) return null;
    return new Profile(
      profile.id,
      profile.name,
      profile.role as 'ADMIN' | 'PARENT',
      profile.photoUrl,
      profile.createdAt,
      profile.updatedAt,
    );
  }

  async create(profile: Profile): Promise<Profile> {
    const created = await prisma.profile.create({
      data: {
        id: profile.id,
        name: profile.name,
        role: profile.role,
        photoUrl: profile.photoUrl,
      },
    });
    return new Profile(
      created.id,
      created.name,
      created.role as 'ADMIN' | 'PARENT',
      created.photoUrl,
      created.createdAt,
      created.updatedAt,
    );
  }

  async update(id: string, data: Partial<Profile>): Promise<Profile> {
    const updated = await prisma.profile.update({
      where: { id },
      data: {
        name: data.name,
        photoUrl: data.photoUrl,
      },
    });
    return new Profile(
      updated.id,
      updated.name,
      updated.role as 'ADMIN' | 'PARENT',
      updated.photoUrl,
      updated.createdAt,
      updated.updatedAt,
    );
  }
}
