import Container from '../../../library/container.ts';
import ProjectRepository from '../repository/project.ts';
import { IProject } from '../types.ts';
import ObjectId, { ObjectType } from '../../../library/object-id.ts';
import { BsonId, ProjectSchema } from '../../../types.ts';

export default class ProjectController {
	public repository: ProjectRepository<ProjectSchema>;

	constructor(container: Container<IProject>) {
		this.repository = new ProjectRepository(
			container.get('db'),
		);
	}

	public generateId() {
		return ObjectId.generate(ObjectType.PROJECT);
	}

	public async create(
		params: Omit<
			ProjectSchema,
			'_id' | 'dateTimeCreated' | 'members' | 'columns'
		>,
	) {
		const id = this.generateId().oid;
		await this.repository.insertOne({
			...params,
			_id: id,
			members: [],
			columns: [],
			dateTimeCreated: new Date(),
		});
		return id;
	}

	public async update(...args: Parameters<typeof this.repository.updateOne>) {
		await this.repository.updateOne(args[0], { $set: args[1] });
		return true;
	}

	public async addColumn(
		project: BsonId,
		column: BsonId,
	) {
		await this.repository.updateOne({
			_id: project,
		}, { $push: { columns: { $each: [column] } } });
		return true;
	}

	public async addMember(
		project: BsonId,
		member: BsonId,
	) {
		await this.repository.updateOne({
			_id: project,
		}, { $push: { members: { $each: [member] } } });
		return true;
	}

	public async delete(id: BsonId) {
		await this.repository.deleteOne(id);
		return true;
	}

	public async findOne(
		filter: Parameters<typeof this.repository.findOne>[0],
	) {
		return this.repository.findOne(filter);
	}

	public async find(
		filter: Parameters<typeof this.repository.find>[0],
	) {
		return this.repository.find(filter).toArray();
	}
}
