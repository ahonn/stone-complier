import Token from './Token';

class StrToken extends Token {
  private str: string

  constructor(line: number, str: string) {
    super(line)
    this.str = str
  }

  isString() {
    return true
  }

  getText() {
    return this.str
  }
}

export default StrToken