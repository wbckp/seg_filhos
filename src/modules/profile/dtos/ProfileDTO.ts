export interface UpdateProfileDTO {
  name?: string;
  photoUrl?: string;
}

export interface ProfileResponseDTO {
  id: string;
  name: string;
  photoUrl: string | null;
  role: string;
}
