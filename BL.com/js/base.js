
var myDate = new Object()

//1、某一年某月多少天
myDate.fn1 = function(yer,mon){
	
	var d = new Date(''+yer+'/1/1')
	var Monthtime1 = d.setMonth(mon);//月份从 0 开始，前一个月
	var Monthtime2 = d.setMonth(mon-1);//后一个月
	var res = Monthtime1-Monthtime2;//相减
	return res/1000/60/60/24  //毫秒 >>> 天
	
}

//2、获取当前格式化时间
function getDate(){
	
	var d = new Date();//  内置对象Date，默认目前时间
	var year = d.getFullYear();  //获取时间
	var month = d.getMonth()+1
	var day = d.getDate();
	var res = year+'/'+month+'/'+day
	return res
	
}

			
//3、标签，id，class，
function getName(name) {
	var nName = name.substring(1);
	switch(name[0]) {
		case '#':
			return document.getElementById(nName)
			break;
		case '.':
			return document.getElementsByClassName(nName)
			break;
		default:
			return document.getElementsByTagName(name)
	}
}

//4、模拟之前getAttribute()	获得属性名下的属性值			
function mtAttribute(DOM,name){	
	
	for(var i = 0;i < DOM.attributes.length;i++){
		
		if(DOM.attributes[i].nodeName == name){
			
			alert(DOM.attributes[i].nodeValue)
			
		}		
	}
}
//5、DOM二级事件删除
function removeEvent(DOM,evt,fn){
	
	if(DOM.removeEventListener){
		
		DOM.removeEventListener(evt,fn,false);
		
	}else{
		
		DOM.detachEvent('on'+evt,fn)
		
	}	
}
//6、DOM二级事件绑定
function addEvent(DOM,evt,fn){
	
	if(DOM.addEventListener){
		
		DOM.addEventListener(evt,fn,false);
		
	}else{
		
		DOM.attachEvent('on'+evt,fn)
		
	}	
}

//7、添加cookie
function setCookie(name,value,day){
	
	if(day){
		
		var d = new Date();

		d.setDate(d.getDate()+day);
		
		document.cookie = name+'='+value+';expires='+d
		
	}else{
		
		document.cookie = name+'='+value;
		
	}
}

function removeCookie(name){//删除cookie
	
	setCookie(name,'1',-1)	
}

//8、通过name取出cookie值
function getCookie(name){
	
	var arr = document.cookie.split('; ');
	//console.log(arr);
	for(var i = 0;i < arr.length;i++){
		
		var arr2 = arr[i].split('=');
		
		console.log(arr2);
		
		if(arr2[0] == name){
			//console.log(arr2[1])
			return arr2[1]
			
		}
	}
	return '' //当name不存在 返回值 空
}

//9、ajax的封装
function ajax_get(url,fn){
	
	var ajax = new XMLHttpRequest();
	
	ajax.open("GET",url,true);
	
	ajax.send(null);
	
	ajax.onreadystatechange = function(){
		
		if (ajax.readyState == 4 && ajax.status == 200){
			//数据请求成功
			fn(ajax.responseText)
			 //回调函数  >>>> 确保数据获取完成，再去执行函数
		}		
	}
}
//10、offset BUG 解决方法
function getStyle(DOM,name){
	
	if(DOM.currentStyle){
		
		return DOM.currentStyle[name]
		
	}else{
		
		return getComputedStyle(DOM,false)[name]
	}
	
}
//11、单属性运动框架
function move1(DOM, attr, target) {

	clearInterval(DOM.timer)

	DOM.timer = setInterval(function() {

		var cur = parseInt(getStyle(DOM, attr));

		var speed = (target - cur) / 10;

		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		if(cur == target) {

			clearInterval(DOM.timer)
		} else {

			DOM.style[attr] = cur + speed +'px';
		}

	}, 30)
}
//12、多属性运动框架、、
function move2(DOM, json) {

	clearInterval(DOM.timer);

	DOM.timer = setInterval(function() {

		for(var attr in json) {

			if(attr == 'opacity') {

				var speed = (json[attr] - getStyle(DOM, attr) * 100) / 10;
				
					speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
					
				if(json[attr] == getStyle(DOM,attr)*100){
					
					clearInterval(DOM.timer)
					
				}else{
					
					DOM.style.opacity = (getStyle(DOM,attr)*100 + speed)/100;
					
					DOM.style.filter = 'alpha(opacity:'+ getStyle(DOM,attr)*100 + speed +')'
					
				}
					

			} else {

				var speed = (json[attr] - parseInt(getStyle(DOM, attr))) / 10;
				
					speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
					
				if(json[attr] == parseInt(getStyle(DOM,attr))){
					
					clearInterval(DOM.timer);
					
				}else{
					
					DOM.style[attr] = parseInt(getStyle(DOM,attr)) + speed + 'px';
					
				}
				
			}

		}

	}, 30)
}
