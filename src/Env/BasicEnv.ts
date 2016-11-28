import Environment from './Environment'

class BasicEnv extends Environment {
  protected values: Map<string, Object>

  constructor() {
    super()
    this.values = new Map<string, Object>()
  }

  put(name: string, value: Object): void {
    this.values.set(name, value)
  }

  get(name: string): Object {
    return this.values.get(name)
  }
}

export default BasicEnv