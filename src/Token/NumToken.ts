import Token from './Token';

class NumToken extends Token {
  private value: number

  constructor(line: number, value: number) {
    super(line)
    this.value = value
  }

  isNumber() {
    return true
  }

  getText() {
    return this.value.toString()
  }

  getNumber() {
    return this.value
  }
}

export default NumToken
