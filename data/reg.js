	/*
	 * 假如待选变量：  ID,NUM,TOTAL，AVL TEST
	 * 正确的公式例子：ID*NUM+(TOTAL/AVL)*0.5 
	 * 错误的公式例子：ID**|0.5
	 */
 
	function fn(string, obj){// TODO: 如何处理=？
		// 剔除空白符
		string = string.replace(/\s/g, '');
		
		// 错误情况，空字符串
		if("" === string){
			return false;
		}
		
		// 错误情况，运算符连续
		if( /[\+\-\*\/]{2,}/.test(string) ){
			return false;
		}
		
		// 空括号
		if(/\(\)/.test(string)){
			return false;
		}
		
		// 错误情况，括号不配对
		var stack = [];
		for(var i = 0, item; i < string.length; i++){
			item = string.charAt(i);
			if('(' === item){
				stack.push('(');
			}else if(')' === item){
				if(stack.length > 0){
					stack.pop();
				}else{
					return false;
				}
			}
		}
		if(0 !== stack.length){
			return false;
		}
	   
		// 错误情况，(后面是运算符 
		if(/\([\+\-\*\/]/.test(string)){
			return false;
		}
		
		// 错误情况，)前面是运算符
		if(/[\+\-\*\/]\)/.test(string)){
			return false;
		}
		
		// 错误情况，(前面不是运算符
		if(/[^\+\-\*\/]\(/.test(string)){
			return false;
		}
		
		// 错误情况，)后面不是运算符
		if(/\)[^\+\-\*\/]/.test(string)){
			return false;
		}
		
		// 错误情况，变量没有来自“待选公式变量”
		var tmpStr = string.replace(/[\(\)\+\-\*\/]{1,}/g, '`');
		var array = tmpStr.split('`');
		for(var i = 0, item; i < array.length; i++){
			item = array[i];
			if( /[A-Z]/i.test(item) && 'undefined' === typeof(obj[item]) ){
				return false;
			}
		}
		
		return true;
	}
    
    // 测试
	var fields = {
		'ID': 1,
		'TOTAL': 1,
		'AVL' : 1,
		'NUM' : 1
	};
    // 提交到服务器端的字符串不应该包含空白符，或者应该禁止用户输入空白符
	console.log( fn('ID*NUM+(TOTAL/AVL)*0.5', fields) );