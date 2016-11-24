import Token from './Token';

class IdToken extends Token {
  private text: string

  constructor(line: number, text: string) {
    super(line)
    this.text = text
  }

  isIdentifier(): boolean { 
    return true 
  }

  getText(): string {
    return this.text
  }
}

export default IdToken