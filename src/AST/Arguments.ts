import ASTree from './ASTree'
import Postfix from './Postfix'
import Functions from './Functions'
import ParameterList from './ParameterList';
import Environment from '../Env/Environment'

class Arguments extends Postfix {
  constructor(c: Array<ASTree>) {
    super(c)
  }

  size(): number {
    return this.numChildren()
  }

  eval(callerEnv: Environment, value: Object): Object {
    if (!(value instanceof Functions)) {
      throw new Error("bad function")
    }
    
    let func: Functions = <Functions>value
    let params: ParameterList = func.getParameters()

    if (this.size() != params.size()) {
      throw new Error("bad number of arguments")
    }
    let newEnv: Environment = func.makeEnv()
    let num: number = 0
    for (let arg of this.children()) {
      // 在函数所在环境中获取实参的值，传递给函数内作用域环境，新增局部变量
      <ParameterList>params.eval(newEnv, arg.eval(callerEnv), num++)
    }
    return func.getBody().eval(newEnv)
  }
}

export default Arguments