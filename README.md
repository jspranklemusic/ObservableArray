# ObservableArray
A Typescript function to create an asynchronous, reactive array.

## Example

`
  const normalArray = [1, 2, 3, 4]
  const reactiveArray = getObservableArray(normalArray, (curr, prev) => console.log('changed!', curr, prev))
  
  reactiveArray.push(5)
  
  // => 'changed!', [1, 2, 3, 4, 5], [1, 2, 3, 4]
`
