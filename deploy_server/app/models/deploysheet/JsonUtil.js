
  exports.stringToJson = function(data){
    return JSON.parse(data);
  };

  exports.jsonToString = function(data){
    return JSON.stringify(data);
  };

 exports.mapToObj = function(strMap){
    let obj = Object.create(null);
    for (let[k,v] of strMap) {
      obj[k] = v;
    }
    return obj;
  };

  exports.mapToKeyValueArray = function(strMap){
    let array = new Array();
    for (let[k,v] of strMap) {
      let obj = Object.create(null);
      obj.key = k;
      obj.value = v;
      array.push(obj);
    }
    return array;
  }; 

  exports.mapToJson = function(map) {
    return JSON.stringify(exports.mapToKeyValueArray(map));
  }

  exports.objToMap = function(obj){
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
      strMap.set(k,obj[k]);
    }
    return strMap;
  }

  exports.jsonToMap = function(jsonStr){
    return  exports.objToMap(JSON.parse(jsonStr));
  }
