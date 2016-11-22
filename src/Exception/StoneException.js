class StoneException extends Error {
  constructor(message) {
    super()
    this.message = message || "Unknow Error"
    this.name = "StoneException"
  }
}

module.exports = StoneException