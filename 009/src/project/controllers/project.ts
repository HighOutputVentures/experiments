import Container from '../../library/container.ts';
import ProjectRepository from '../repository/project.ts';
import { IProject } from '../types.ts';
import ObjectId, { ObjectType } from '../../library/object-id.ts';
import { BsonId, ProjectSchema } from '../../types.ts';

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
		params: Omit<ProjectSchema, '_id' | 'dateTimeCreated' | 'members'>,
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
		await this.repository.updateOne(...args);
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

	public async retrieveProjects(
		filter: Parameters<typeof this.repository.find>[0],
	) {
		return this.repository.find(filter).toArray();
	}
}
