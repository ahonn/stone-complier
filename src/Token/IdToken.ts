import Token from './Token';

class IdToken extends Token {
  private text: string

  constructor(line: number, text: string) {
    super(line)
    this.text = text
  }

  isIdentifier() { 
    return true 
  }

  getText() {
    return this.text
  }
}

export default IdToken