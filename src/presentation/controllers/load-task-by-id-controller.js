const HttpResponse = require('../helpers/http-response')
const { MissingParamError } = require('../../utils/errors')

module.exports = class LoadTaskByIdController {
  constructor({ loadTaskByIdUseCase } = {}) {
    this.loadTaskByIdUseCase = loadTaskByIdUseCase
  }

  async handle(httpRequest) {
    try {
      const { id } = httpRequest.params
      if (!id) {
        return HttpResponse.badRequest(new MissingParamError('id'))
      }

      const task = await this.loadTaskByIdUseCase.load(id)

      return HttpResponse.ok({ task: task.task })
    } catch (error) {
      console.log(error)
      return HttpResponse.serverError()
    }
  }
}