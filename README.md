# ObservableArray
A Typescript function to create an asynchronous, reactive array via the Proxy object in Javascript.

## Example

```
  const normalArray = [1, 2, 3, 4]
    
  function callBack(curr, prev) {
    console.log('changed!', curr, prev)
  }
  
  const reactiveArray = getObservableArray(normalArray, callBack)
  
  reactiveArray.push(5)
  
  // => 'changed!', [1, 2, 3, 4, 5], [1, 2, 3, 4]
```

## Notes

This method creates a copy of the array. Making any changes to the original, non-proxied array will not result in reactive changes.

## Async

All of the changes happen asynchronously, and any reactive method will run after all of the changes have finished running in the main event loop. For example:

```
const arr = getObservableArray([1,2,3,4], callBack)

arr.push(5,6,7,8,9,10)
arr.splice(1)
```

...will result in this:

```
// => 'changed!', [1], [1, 2, 3, 4]
```
