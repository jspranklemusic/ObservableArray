function getObservableArray<T>(arr: T[], onChange: (newArr: T[], oldArr: T[]) => void): T[] {
    let timeout: any = null;
    let oldArr: T[] = [];
  
    const cloneObject = (obj)  => {
      if (obj === null || typeof obj !== "object") 
        return obj;
      const clone = Array.isArray(obj) ? [] : {};
      for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          clone[key] = cloneObject(obj[key]);
      }
      return clone;
    }
  
    const copyArray = (arrToCopy: T[]): void => {
      if (timeout) 
        return;
      oldArr = cloneObject(arrToCopy);
    }
  
    const runChangeFunction = (): void => {
      if (timeout) 
        return;
      timeout = setTimeout(() => {
        clearTimeout(timeout);
        timeout = null;
        onChange(arr, oldArr);
      });
    }
  
    const handler: ProxyHandler<T[]> = {
      get(target, prop, receiver) {
        return Reflect.get(target, prop, receiver);
      },
      set(target, prop, value, receiver) {
        if (prop === "length") 
          return Reflect.set(target, prop, value, receiver);
        copyArray(receiver);
        runChangeFunction();
        return Reflect.set(target, prop, value, receiver);
      },
      deleteProperty(target, prop) {
        copyArray(target);
        runChangeFunction();
        return Reflect.deleteProperty(target, prop);
      },
      defineProperty(target, prop, descriptor) {
        return Reflect.defineProperty(target, prop, descriptor);
      },
      setPrototypeOf(target, proto) {
        return Reflect.setPrototypeOf(target, proto);
      },
    };
  
    return new Proxy(arr, handler);
}
