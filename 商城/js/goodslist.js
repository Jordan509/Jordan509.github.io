//	取消搜索栏内容

(function(){

	var del = document.querySelector(".delete-search");
	var input = document.querySelector(".search-input");

	del.addEventListener("touchstart",function(){
		input.value = '';
	})

}());

(function(){
	var screen = document.getElementsByClassName("screen")[0];
	var screen_off = document.getElementsByTagName("a")[3];
	var sort = document.getElementsByClassName("sort")[0];
	var goods = document.getElementsByClassName("goods")[0];
	var content = document.getElementsByClassName("content")[0];
	var screen = document.getElementsByClassName("screen")[0];
	var winh = window.innerHeight;
	var scr = false
	var isFinish = false;


	screen_off.addEventListener("touchstart",function(){
		if(scr == false){
			scr = true
			sort.style.visibility = 'visible';
		}else{
			scr = false
			sort.style.visibility = 'hidden';
		}
		
	})
	var winh = window.innerHeight

	function appendLoading(content){
		var fragment = document.createDocumentFragment();
		var wrap = document.createElement("div");
		var img = document.createElement("img");
		var span = document.createElement("span");

		wrap.className = "loading";
		img.src = "img/icon_loading.png";
		span.innerHTML = "正在加载";

		wrap.appendChild(img);
		wrap.appendChild(span);
		fragment.appendChild(wrap);
		content.appendChild(fragment);

		return wrap;
	}
	//往content插入文档碎片
	var loading = appendLoading(content);
	var loadTop = 0;
	console.log(content)
	console.log(window)
	// 判断正在加载是否出现在屏幕
	window.addEventListener("scroll",function(){

		loadTop = loading.getBoundingClientRect().top;
		console.log(loadTop)
			
		if(loadTop < winh && !isFinish){
			ajaxLoad();

			isFinish = true;
		}
	});

	function ajaxLoad(){

		var request = new XMLHttpRequest();

		request.open("get","goods.json",true);
		
		request.onreadystatechange = function(){
			if(request.readyState == 4 && request.status == 200){
				var res = request.responseText;
				var obj = JSON.parse(res);
				var html = "";
				for(var key in obj){
					html += '<li><a href="#"><img src=" '
					+ obj[key]["img"] +' "><p>'
					+ obj[key]["describe"] 
					+'</p><span><i>￥</i>'
					+ obj[key]["price"] 
					+'</span><s>￥'
					+ obj[key]["s"] 
					+'</s></a></li>';
				}

				setTimeout(function(){
					goods.insertAdjacentHTML("beforeEnd",html);
					isFinish = false;
				},2000);
			}
			
		}
		request.send(null);
	}


}());


