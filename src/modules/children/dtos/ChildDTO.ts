export interface CreateChildDTO {
  name: string;
  birthDate: Date;
  photoUrl?: string;
}

export interface UpdateChildDTO {
  name?: string;
  birthDate?: Date;
  photoUrl?: string;
}

export interface ChildResponseDTO {
  id: string;
  parentId: string;
  name: string;
  birthDate: Date;
  photoUrl: string | null;
  createdAt?: Date;
}
