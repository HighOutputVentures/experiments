import ProjectRepository from '../repository/project.ts';
import ObjectId, { ObjectType } from '../../../library/object-id.ts';
import { BsonId, ProjectSchema } from '../../../types.ts';
import { ProjectService } from '../mod.ts';

export default class ProjectController {
	public repository: ProjectRepository<ProjectSchema>;

	constructor(container: ProjectService) {
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
			dateTimeCreated: new Date(),
		});
		return id;
	}

	public async update(...args: Parameters<typeof this.repository.updateOne>) {
		await this.repository.updateOne(args[0], { $set: args[1] });
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

	public async delete(...args: Parameters<typeof this.repository.deleteOne>) {
		await this.repository.deleteOne(...args);
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
