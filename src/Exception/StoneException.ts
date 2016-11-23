class StoneException extends Error {
  public message: string
  public name: string
  constructor(message) {
    super()
    this.message = message || "Unknow Error"
    this.name = "StoneException"
  }
}

export default StoneException