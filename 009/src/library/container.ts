export default class Container<T = Record<string, unknown>> {
	private deps: T;
	constructor(deps?: T) {
		this.deps = deps || {} as T;
	}

	public bind<V = T[keyof T]>(key: keyof T) {
		const to = (value: V) => {
			(this.deps as Record<string, unknown>)[key as string] = value;
		};

		return { to };
	}

	public get<V = T[keyof T]>(key: keyof T): V {
		return (this.deps as Record<string, unknown>)[key as string] as V;
	}

	print() {
		console.log(this.deps);
	}
}
