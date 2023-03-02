export class PMVisualizer {
  addedKeys = [];
  createdObject = {};
  response = {};
  
  addKey = (key) => this.addedKeys.push(key);
  splitKey = (key) => key.split('.');

  getContent = (response, spaces = 2) => {
    this.response = response;
    const KEYS = this.addedKeys.map(this.splitKey);
    KEYS.forEach((e) => this.createKey(e));

    return `<pre>${JSON.stringify(mapContent(), null, spaces)}</pre>`
  }

  getKeyType = (key) => {
    switch(typeof key) {
      case 'string':
        return '';
      case 'number':
        return 0;
      case 'object':
        return {};
      default: 
        return null;
    }
  }

  getKeyArrayModifiers = (keyArray) => {
     const FIRST_KEY = keyArray[0];
      let isArray = false;
      let arrayNum = 0;
      if(FIRST_KEY.includes('[')) {
          isArray = true;
          arrayNum = FIRST_KEY.split('[')[1].split(']')[0]
      }
  
    const THE_KEY = FIRST_KEY.split('[')[0]
  
    return { THE_KEY, isArray, arrayNum }
  }

  createKey = (keyArray, current = this.createdObject, currentResponse = this.response) => {
    const {THE_KEY, isArray, arrayNum} = this.getKeyArrayModifiers(keyArray);

    let currentKey = current[THE_KEY];
    let responseKey = currentResponse[THE_KEY];
  
    if(!current.hasOwnProperty(THE_KEY)) {
      if(isArray) {
         current[THE_KEY] = [];
          responseKey.forEach((e, i) => current[THE_KEY][i] = this.getKeyType(e));
       }
      else {
        current[THE_KEY] = this.getKeyType(responseKey);
      }
    }

    if(keyArray.length - 1 === 0) {
        if(isArray) {
            current[THE_KEY][arrayNum] = currentResponse[THE_KEY][arrayNum];
        }
        else{
          
                    current[THE_KEY] = currentResponse[THE_KEY];
        }
        return
    }
    else {
        current[THE_KEY] = current[THE_KEY] || this.getKeyType(responseKey)
        this.createKey(keyArray.slice(1), isArray ? current[THE_KEY][arrayNum] : current[THE_KEY], isArray ? currentResponse[THE_KEY][arrayNum] : currentResponse[THE_KEY])
    }
}
}

this.PMVisualizer = new PMVisualizer();
