'use strict'

module.exports = function() {
  
  return function post(message){
	console.error('[31m%s[0m',message);
	process.exit(1);
  };

}()