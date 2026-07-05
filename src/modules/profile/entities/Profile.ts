export class Profile {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly role: 'ADMIN' | 'PARENT',
    public readonly photoUrl?: string | null,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}
