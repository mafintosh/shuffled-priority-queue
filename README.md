# shuffled-priority-queue

A priority queue that shuffles elements with the same priority.

```
npm install shuffled-priority-queue
```

## Usage

``` js
var spq = require('shuffled-priority-queue')
var queue = spq()

queue.add({
  priority: 0,
  value: 'hello'
})

queue.add({
  priority: 0,
  value: 'world'
})

queue.add({
  priority: 1,
  value: 'welt'
})

queue.add({
  priority: 2,
  value: 'verden'
})

console.log(queue.pop()) // returns {value: 'verden'}
console.log(queue.pop()) // returns {value: 'welt'}
console.log(queue.pop()) // returns {value: 'hello'} or {value: 'world'}
console.log(queue.pop()) // returns {value: 'hello'} or {value: 'world'}
console.log(queue.pop()) // returns null (empty queue)
```

## API

#### `var queue = spq()`

Create a new queue.

#### `value = queue.add(value)`

Add a new value to the queue. The value is returned for convenience
If you set `value.priority` to a number, it'll be added to the queue at that priority.

#### `queue.remove(value)`

Remove a value from the queue.

#### `value = queue.pop()`

Pop the value with the highest priority off the queue.
If multiple values have the same priority a random one is popped.

#### `value = queue.last()`

Same as `pop()` but does not mutate the queue.

#### `value = queue.shift()`

Same as `pop()` but returns a value with the lowest priority.

#### `value = queue.first()`

Same as `shift()` but does not mutate the queue.

#### `value = queue.next([prevValue])`

Iterate the queue from lowest priority to highest.

``` js
var prevValue = null

while (prevValue = queue.next(prevValue)) {
  console.log('value:', prevValue)
}
```

#### `value = queue.prev([prevValue])`

Iterate the queue from highest priority to lowest.

``` js
var prevValue = null

while (prevValue = queue.prev(prevValue)) {
  console.log('value:', prevValue)
}
```

## License

MIT
