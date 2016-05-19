;(function(){
	var degArray=[0,330,300,270,240,210,180,150,120,90,60,30];
	var Z=200;
	var H=108;
	var row = 2;
	var clock = [0,0];
	var data=[
	[{label:0,value:0},{label:1,value:1},{label:2,value:2},{label:3,value:3},{label:4,value:4},{label:5,value:5},{label:6,value:6},{label:7,value:7},{label:8,value:8},{label:9,value:9},{label:10,value:10},{label:11,value:11}],
	[{label:0,value:0},{label:1,value:1}]
	]
	var target="#target";
	
	window.phoneSelect = {
		init:function(){
			$(target).empty();
			$(target).append('<div class="phoneSelect">'+
				  '<div class="line" id="line1"></div>'+
				  '<div class="line" id="line2"></div>'+
				  '<div class="frame">'+
				  '</div>'+
				'</div>');
			this.reflash();
		},
		reflash:function(num){
			function run(i){
						for(var x=0 ; x<degArray.length ; x++){
							var showOp=Math.abs(0.5-(((degArray[x]+(clock[i]*30))%360)/360||1));
							if(showOp==0.5){
								showOp=1;
							}else if(showOp<0.2){
								showOp=0;
							}else{
								showOp=showOp*0.8;
							}
							$(target).find("[roll='"+i+"'] .point").eq(x).css({
								"transition-timing-function": "cubic-bezier(0.1, 0.57, 0.1, 1)",
					            "transition-duration": "1000ms",
					            "transform":"rotateX("+(degArray[x]+(clock[i]*30))+"deg) translateZ("+Z+"px)",
					            "height":H+"px",
					            "line-height":H+"px",
					            "opacity":showOp
							})
							$(target).find("[roll='"+i+"']").unbind("swipeup").bind("swipeup",function(){
								clock[i]++;
								run(i);
							});
							$(target).find("[roll='"+i+"']").unbind("swipedown").bind("swipedown",function(){
								clock[i]--;
								run(i);
							});
						}
					}
			if(typeof(num)!="Number"){
				for (var i=0 ; i<row ;i++){
					var newRoll=$('<div class="roll" roll="'+i+'"></div>').appendTo($(target).find(".frame"));
					newRoll.css("width",(1/row*100)+"%");
					for(var y=0;y<12;y++){
						var str="";
						if(data[i]&&data[i][y]&&typeof(data[i][y].label)){
							str=data[i][y].label;
						}
						var val="";
						if(data[i]&&data[i][y]&&typeof(data[i][y].value)){
							val=data[i][y].value;
						}
						var newPoint=$('<div class="point" point="'+y+'" value="'+val+'">'+str+'</div>').appendTo(newRoll);
					}
					run(i)
				}
				$(target).find(".frame").append('<div class="clear"></div>');
			}else{
				clock[num]=0;
				$(target).find("[roll='"+num+"'] .point").each(function(){
					var pointNumber = Number($(this).attr("point"));
					var str="";
						if(data[num]&&data[num][pointNumber]&&typeof(data[num][pointNumber].label)){
							str=data[num][pointNumber].label;
						}
						var val="";
						if(data[num]&&data[num][pointNumber]&&typeof(data[num][pointNumber].value)){
							val=data[num][pointNumber].value;
						}
				});
				run(num);
			}		
		}
	}
})();
