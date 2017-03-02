(function(){
	var door_top = document.getElementsByClassName("door_top")[0];
	var door_bottom = document.getElementsByClassName("door_bottom")[0];

	door_top.classList.add("move_top");
	door_bottom.classList.add("move_bottom");

	var content = document.getElementsByClassName("content")[0];
	
	door_top.addEventListener("webkitAnimationEnd",function(){
		content.style.visibility = "visible";
		start();
	});
}());

function start(){

		//获取窗口的高度
		var winh = Math.min(document.body.clientHeight,document.documentElement.clientHeight);

		var aleft = document.querySelectorAll(".aleft");
		var aright = document.querySelectorAll(".aright");

		var time = 0;
		var time_2 = 0;

		//滚动事件
		window.onscroll = function(){
			effect();
		}

		// collect : 所有效果div(集合)
		// effect : 效果class(字符串)
		function load(collect,effect){
			for(var i = 0; i < collect.length; i++){
				var now = collect[i];
				var top = now.getBoundingClientRect().top;
				if(top > 0 && top < winh){

					now.style.animationDelay = time + "s";
					now.classList.add("animated",effect);
					time += 0.2;
				}else{
					time = 0;
				}
			}
		}
		function load_t(collect,effect){
			for(var i = 0; i < collect.length; i++){
				var now = collect[i];
				var top = now.getBoundingClientRect().top;
				if(top > 0 && top < winh){

					now.style.animationDelay = time_2 + "s";
					now.classList.add("animated",effect);
					time_2 += 0.2;
				}else{
					time_2 = 0;
				}
			}
		}
		
		function effect(){
			load(aleft,"fadeInLeft");
			load_t(aright,"fadeInRight");

		}
		
		effect();
	};