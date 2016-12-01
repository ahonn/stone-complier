import ASTree from './ASTree'
import Token from '../Token/Token'
import Environment from '../Env/Environment'

class ASTList extends ASTree {
  protected childrens: Array<ASTree>

  constructor(list: Array<ASTree>) {
    super()
    this.childrens = list
  }

  child(i: number): ASTree {
    return this.childrens[i]
  }

  numChildren(): number {
    return this.childrens.length
  }

  children(): Array<ASTree> {
    return this.childrens
  }

  toString(): String {
    return '(' + this.childrens.join(" ") + ')'
  }

  location(): string {
    for(let t in this.childrens) {
      let s: string = this.childrens[t].location()
      if (s !== "") {
        return s
      }
    }
    return ""
  }

  eval(env: Environment, value: Object, index?: number): Object {
    throw new Error("cannot eval: " + this.toString())
  }
}

export default ASTList