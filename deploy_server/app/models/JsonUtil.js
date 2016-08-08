
  /**
  *
  * json转字符串
  */
  exports.stringToJson = function(data){
    return JSON.parse(data);
  };

  /**
  *字符串转json
  */
  exports.jsonToString = function(data){
    return JSON.stringify(data);
  };

 /**
 *map转化为对象（map所有键都是字符串，可以将其转换为对象）
 */
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

  /**
  *map转换为json
  */
  exports.mapToJson = function(map) {
    return JSON.stringify(exports.mapToKeyValueArray(map));
  }

  /**
  *对象转换为Map
  */
  exports.objToMap = function(obj){
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
      strMap.set(k,obj[k]);
    }
    return strMap;
  }

  /**
  *json转换为map
  */
  exports.jsonToMap = function(jsonStr){
    return  exports.objToMap(JSON.parse(jsonStr));
  }
