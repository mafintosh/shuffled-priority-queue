var set = require('unordered-set')

module.exports = SPQ

function SPQ (opts) {
  if (!(this instanceof SPQ)) return new SPQ(opts)
  this.priorities = []
  this.equals = (opts && opts.equals) || null
}

SPQ.prototype.first = function () {
  for (var i = 0; i < this.priorities.length; i++) {
    var q = this.priorities[i]
    if (q.length) return shuffle(q, 0)
  }
  return null
}

SPQ.prototype.last = function () {
  for (var i = this.priorities.length - 1; i >= 0; i--) {
    var q = this.priorities[i]
    if (q.length) return shuffle(q, 0)
  }
  return null
}

SPQ.prototype.prev = function (prev) {
  if (!prev) return this.last()
  return next(this.priorities, prev, -1)
}

SPQ.prototype.next = function (prev) {
  if (!prev) return this.first()
  return next(this.priorities, prev, 1)
}

SPQ.prototype.shift = function () {
  return this.remove(this.first())
}

SPQ.prototype.pop = function () {
  return this.remove(this.last())
}

SPQ.prototype.add = function (val) {
  var prio = val.priority || 0
  while (prio >= this.priorities.length) this.priorities.push([])
  set.add(this.priorities[prio], val)
  return val
}

SPQ.prototype.remove = function (val) {
  if (!val) return null
  val = this.find(val)
  if (!val) return null
  return set.remove(this.priorities[val.priority || 0], val)
}

SPQ.prototype.find = function (val) {
  if (val._index !== undefined) return val

  var prio = val.priority || 0
  var qs = this.priorities
  if (prio >= qs.length) return null

  var q = qs[prio]

  for (var i = 0; i < q.length; i++) {
    if (this.equals(q[i], val)) return q[i]
  }

  return null
}

function shuffle (q, i) {
  var ran = i + Math.floor(Math.random() * (q.length - i))
  set.swap(q, q[ran], q[i])
  return q[i]
}

function next (queues, prev, inc) {
  var i = prev.priority || 0
  var j = (prev._index || 0) + 1

  while (true) {
    if (i < 0 || i >= queues.length) return null
    var q = queues[i]

    if (j >= q.length) {
      i += inc
      j = 0
      continue
    }

    return shuffle(q, j)
  }
}
