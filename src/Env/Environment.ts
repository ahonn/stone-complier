abstract class Environment {
  abstract put(name: string, value: Object): void
  abstract get(name: string): Object
  abstract putNew(name: string, value: Object): void
  abstract where(name: string): Environment
  abstract setOuter(e: Environment): void
}

export default Environment