var spq = require('./')
var tape = require('tape')

tape('different prios', function (t) {
  var queue = spq()

  var a = queue.add({
    hello: 'world',
    priority: 0
  })

  var b = queue.add({
    hej: 'verden',
    priority: 1
  })

  t.same(queue.pop(), b)
  t.same(queue.pop(), a)
  t.same(queue.pop(), null)
  t.end()
})

tape('same prios', function (t) {
  var queue = spq()

  var a = queue.add({
    hello: 'world',
    priority: 0
  })

  var b = queue.add({
    hello: 'verden',
    priority: 0
  })

  var c = queue.add({
    hej: 'verden',
    priority: 1
  })

  t.same(queue.pop(), c)

  var top = queue.pop()
  t.ok(top === a || top === b)

  top = queue.pop()
  t.ok(top === a || top === b)

  t.same(queue.pop(), null)
  t.end()
})

tape('prev', function (t) {
  var queue = spq()

  var a = queue.add({
    hello: 'world',
    priority: 0
  })

  var b = queue.add({
    hello: 'verden',
    priority: 0
  })

  var c = queue.add({
    hej: 'verden',
    priority: 1
  })

  t.same(queue.prev(), c)

  var top = queue.prev(c)
  t.ok(top === a || top === b)

  var old = top
  top = queue.prev(top)
  t.ok(old !== top)
  t.ok(top === a || top === b)

  t.same(queue.prev(top), null)
  t.end()
})

tape('next', function (t) {
  var queue = spq()

  var a = queue.add({
    hello: 'world',
    priority: 0
  })

  var b = queue.add({
    hello: 'verden',
    priority: 0
  })

  var c = queue.add({
    hej: 'verden',
    priority: 1
  })

  var top = queue.next()
  t.ok(top === a || top === b)

  var old = top
  top = queue.next(top)
  t.ok(old !== top)
  t.ok(top === a || top === b)

  top = queue.next(top)
  t.same(top, c)

  t.same(queue.next(top), null)
  t.end()
})

tape('equals', function (t) {
  var queue = spq({
    equals: function (a, b) {
      return a.hello === b.hello
    }
  })

  queue.add({
    hello: 'world'
  })

  t.same(queue.first().hello, 'world')

  queue.remove({
    hello: 'world'
  })

  t.same(queue.first(), null)
  t.end()
})
