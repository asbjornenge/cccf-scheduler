var cdiff  = require('cccf-diff')
var spread = require('./spread')
var utils  = require('./utils')

function spreadem(nodes, wanted, current, opts) {
  opts = opts || {}
  current = current || []
  if (utils.isObject(current)) { opts = current; current = [] }
  var diff = diffy(nodes, wanted, current, opts)
  return spread(nodes, current, diff)
}

function binpackem(hosts, containers, current, opts) {
  throw new Error('Implementation missing. Sry...')
}

function unify(containers, opts) {
  return utils.unifyContainers(containers, opts.ignore)
}

function diffy(hosts, containers, current, opts) {
  var unified_current = unify(current, opts)
  var unified_containers = unify(containers, opts)
  var unified_diff = cdiff(unified_current, unified_containers)
  return utils.hostifyDiff(current, unified_diff)
}

module.exports = {
  spread: spreadem,
  binpack: binpackem
}
