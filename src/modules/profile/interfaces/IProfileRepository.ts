import { Profile } from '../entities/Profile';

export interface IProfileRepository {
  findById(id: string): Promise<Profile | null>;
  create(profile: Profile): Promise<Profile>;
  update(id: string, data: Partial<Profile>): Promise<Profile>;
}
