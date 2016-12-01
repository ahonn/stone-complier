import Environment from './Environment'

class NestedEnv extends Environment {
  protected values: Map<string, Object>
  protected outer: Environment

  constructor(e: Environment = null) {
    super()
    this.values = new Map<string, Object>()
    this.outer = e
  }

  setOuter(e: Environment) {
    this.outer = e
  }

  get(name: string): Object {
    let value: Object = this.values.get(name)
    if (value == null && this.outer !== null) {
      return this.outer.get(name)
    } else {
      return value
    }
  } 

  putNew(name: string, value: Object): void {
    this.values.set(name, value)
  }

  put(name: string, value: Object): void {
    let e: Environment = this.where(name)
    if (e == null) {
      e = this
    }
    e.putNew(name, value)
  }

  where(name: string): Environment {
    if (this.values.get(name) != null) {
      return this
    } else if (this.outer == null) {
      return null
    } else {
      return this.outer.where(name)
    }
  }
}

export default NestedEnv