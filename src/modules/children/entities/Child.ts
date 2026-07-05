export class Child {
  constructor(
    public readonly id: string,
    public readonly parentId: string,
    public readonly name: string,
    public readonly birthDate: Date,
    public readonly photoUrl?: string | null,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}
