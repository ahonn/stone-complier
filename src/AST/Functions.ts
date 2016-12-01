import BlockStmnt from './BlockStmnt'
import ParameterList from './ParameterList'
import Environment from '../Env/Environment'
import NestedEnv from '../Env/NestedEnv'

class Functions {
  protected parameters: ParameterList
  protected body: BlockStmnt
  protected env: Environment

  constructor(parameters: ParameterList, body: BlockStmnt, env: Environment) {
    this.parameters = parameters
    this.body = body
    this.env = env
  }

  getParameters(): ParameterList {
    return this.parameters
  }

  getBody(): BlockStmnt {
    return this.body
  }

  makeEnv(): Environment {
    return new NestedEnv(this.env)
  }

  hashCode(): number {
    let str = ""
    for (let prop in this) {
      str += this[prop]
    }
    let hash = 0, length = str.length
    for (let i = 0; i < length; ++i) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i)
      hash = hash & hash
    }
    return hash
  }

  toString(): string {
    return "<fun: " +  this.hashCode() + ">"
  }
}

export default Functions