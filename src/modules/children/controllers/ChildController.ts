import { FastifyRequest, FastifyReply } from 'fastify';
import { ChildService } from '../services/ChildService';
import { createChildSchema, updateChildSchema, childIdParamSchema } from '../validators/child.validator';

export class ChildController {
  constructor(private childService: ChildService) {}

  async list(request: FastifyRequest, reply: FastifyReply) {
    const parentId = request.user.id;
    const children = await this.childService.listChildren(parentId);
    return reply.send({ success: true, message: 'Children retrieved successfully', data: children });
  }

  async get(request: FastifyRequest, reply: FastifyReply) {
    const parentId = request.user.id;
    const { id } = childIdParamSchema.parse(request.params);
    const child = await this.childService.getChild(id, parentId);
    return reply.send({ success: true, message: 'Child retrieved successfully', data: child });
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const parentId = request.user.id;
    const parsedBody = createChildSchema.parse(request.body);
    const created = await this.childService.createChild(parentId, parsedBody);
    return reply.status(201).send({ success: true, message: 'Child created successfully', data: created });
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const parentId = request.user.id;
    const { id } = childIdParamSchema.parse(request.params);
    const parsedBody = updateChildSchema.parse(request.body);
    const updated = await this.childService.updateChild(id, parentId, parsedBody);
    return reply.send({ success: true, message: 'Child updated successfully', data: updated });
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const parentId = request.user.id;
    const { id } = childIdParamSchema.parse(request.params);
    await this.childService.deleteChild(id, parentId);
    return reply.send({ success: true, message: 'Child deleted successfully', data: {} });
  }
}
