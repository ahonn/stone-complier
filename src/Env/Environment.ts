abstract class Environment {
  abstract put(name: string, value: Object): void
  abstract get(name: string): Object
}

export default Environment