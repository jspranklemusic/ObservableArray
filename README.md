# ObservableArray
A Typescript function to create an asynchronous, reactive array.

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
