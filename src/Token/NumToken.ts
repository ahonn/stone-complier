import Token from './Token';

class NumToken extends Token {
  private value: number

  constructor(line: number, value: number) {
    super(line)
    this.value = value
  }

  isNumber(): boolean {
    return true
  }

  getText(): string {
    return this.value.toString()
  }

  getNumber(): number {
    return this.value
  }
}

export default NumToken
