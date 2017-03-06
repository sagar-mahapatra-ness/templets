var D3JSbegin = require('./D3JSbegin');
module.exports = (function(){
	var modulename = "d3 module new";
	return {
       getModuleName:function(){
         return modulename;
       },
       init:function(){
       	$('#app').text("");
       	D3JSbegin.init('#app')
       }   
	}
})();