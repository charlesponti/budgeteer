import template from './weight-table.html'

export default {
  restrict: 'E',
  template,
  bindings: { weights: '<' },
  controller () {
    this.edit = function () {}

    this.remove = function () {}
  }
}
