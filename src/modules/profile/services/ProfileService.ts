import { IProfileRepository } from '../interfaces/IProfileRepository';
import { Profile } from '../entities/Profile';
import { AppError } from '../../../shared/errors/AppError';
import { UpdateProfileDTO, ProfileResponseDTO } from '../dtos/ProfileDTO';

export class ProfileService {
  constructor(private profileRepository: IProfileRepository) {}

  async getProfile(userId: string): Promise<ProfileResponseDTO> {
    let profile = await this.profileRepository.findById(userId);

    if (!profile) {
      // Auto-create profile on first access if auth token is valid
      // Supabase already validated the token, so we can assume the user exists in auth.users
      profile = await this.profileRepository.create(
        new Profile(userId, 'New User', 'PARENT')
      );
    }

    return {
      id: profile.id,
      name: profile.name,
      photoUrl: profile.photoUrl || null,
      role: profile.role,
    };
  }

  async updateProfile(userId: string, data: UpdateProfileDTO): Promise<ProfileResponseDTO> {
    const profile = await this.profileRepository.findById(userId);
    if (!profile) {
      throw new AppError('Profile not found', 404);
    }

    const updated = await this.profileRepository.update(userId, data);

    return {
      id: updated.id,
      name: updated.name,
      photoUrl: updated.photoUrl || null,
      role: updated.role,
    };
  }
}
