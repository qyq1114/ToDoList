//添加新的事项
function showDoin(){		
	var txt = document.getElementById('txtArea').value;
	var now = new Date();
	var year = document.getElementById("year").value;
	var month = document.getElementById("month").value;
	var day = document.getElementById("day").value;
	var hour = document.getElementById("hour").value;
	var wishTime = new Date(year, month-1, day, hour);
		console.log(now);

	console.log(wishTime);
	if(now.getFullYear()==wishTime.getFullYear()){
		if(now.getMonth()<wishTime.getMonth()){
			//正常
			wishTime = wishTime.toLocaleString();
			var data = saveData(txt,wishTime);
			qinyq(data);
		}else if(now.getMonth()==wishTime.getMonth()){
			if(now.getDate()==wishTime.getDate()){
				if(now.getHours()<=wishTime.getHours()){
					//正常
					wishTime = wishTime.toLocaleString();
					var data = saveData(txt,wishTime);
					qinyq(data);
				}else{
					alert("数据输入不符合要求，请重新输入！");
				}
			}else if(now.getDate()<wishTime.getDate()){
				//正常
				wishTime = wishTime.toLocaleString();
				var data = saveData(txt,wishTime);
				qinyq(data);
			}else{
				alert("数据输入不符合要求，请重新输入！");
			}
		}else{
			alert("数据输入不符合要求，请重新输入！");
		}
	}else if(now.getFullYear()<wishTime.getFullYear()){
		//正常
		wishTime = wishTime.toLocaleString();
		var data = saveData(txt,wishTime);
		qinyq(data);
	}else{
		alert("数据输入不符合要求，请重新输入！");
	}
}
//为了简化代码补充的
function qinyq(data){
	var node=document.createElement("LI");
	node.innerHTML="<input type='checkbox' class='check' id='"+ (data[data.length-1].id) +"'>"+
						'<label for='+(data[data.length-1].id)+' onclick="chosen('+(data[data.length-1].id)+')"></label>'+
						'<span id="p-'+(data[data.length-1].id)+'" onclick="edit('+(data[data.length-1].id)+')">'+(data[data.length-1].txtData)+'</span>'+
						'<input class="ipt" id="e-'+(data[data.length-1].id)+'" onblur="qyq('+(data[data.length-1].id)+')">'+
						'<span class="cancel" id=del'+(data[data.length-1].id)+' onclick="delDta('+(data[data.length-1].id)+');">-</span>'+
						'<div class="time">期望完成时间：'+(data[data.length-1].wishTime)+'</div>';
	document.getElementById("doin").appendChild(node);
	changeNum();
	document.getElementById('txtArea').value = "";
}
//列表数量变化
function changeNum(){	
	var countDoin = document.getElementById('doin').children.length || 0 ;
	document.getElementById('num1').innerHTML = countDoin;
	var countDone = document.getElementById('done').children.length || 0 ;
	document.getElementById('num2').innerHTML = countDone;
}
//把数据保存到localstorage
function saveData(txt,wishTime){			
	loadId();
	var obj = {
		"txtData":txt,
		"flag":false,
		"id":localStorage.getItem("numSav"),
		"wishTime":wishTime
	}
	var dta = loadDta();
	// console.log(dta);
	dta.push(obj);
	// console.log(dta);
	localStorage["todotxt"]=JSON.stringify(dta);
	// console.log(localStorage["todotxt"]);
	return dta;
}
//从localstorage中读取数据，返回对象数组
function loadDta(){				
	var dtaList = localStorage.getItem("todotxt");
	if(dtaList){
		return JSON.parse(localStorage["todotxt"]);
	}else{
		return [];
	}
}
//每增加一个项目，调用一次，使得id唯一
function loadId(){				
	var numsav =localStorage.getItem("numSav");
	if(numsav){
		localStorage.setItem("numSav",(numsav-0+1).toString());
	}else{
		localStorage.setItem("numSav","0");
	}
}
//删除数据
function delDta(id){		
	var data = loadDta();
	for(var i=0;i<data.length;i++){
		if(data[i].id==id){
			var delNode = document.getElementById(id).parentNode;
			if(data[i].flag){
				document.getElementById('done').removeChild(delNode);
			}else{
				document.getElementById('doin').removeChild(delNode);
			}
			data.splice(i,1);
			break;
		}
	}
	localStorage["todotxt"]=JSON.stringify(data);
	changeNum();
}
//选中与取消选中
function chosen(id){	
	var data = loadDta();
	var delNode = document.getElementById(id).parentNode;
	for(var i=0;i<data.length;i++){
		if(data[i].id==id){
			if(data[i].flag){
				data[i].flag = false;
				localStorage["todotxt"]=JSON.stringify(data);
				document.getElementById('done').removeChild(delNode);
				changeList(id);
			}else{
				data[i].flag = true;
				localStorage["todotxt"]=JSON.stringify(data);
				document.getElementById('doin').removeChild(delNode);
				changeList(id);
			}
			break;
		}
	}
	changeNum();
}
//选中或取消选中改变列表
function changeList(id){	
	var data = loadDta();
	var node=document.createElement("LI");
	for(var i=0;i<data.length;i++){
		if(data[i].id==id){
			if(data[i].flag){
				node.innerHTML="<input type='checkbox' class='check' id='"+ (data[i].id) +"' checked='checked'>"+
							'<label for='+(data[i].id)+' onclick="chosen('+(data[i].id)+')"></label>'+
							'<span id="p-'+(data[i].id)+'" onclick="edit('+(data[i].id)+')">'+(data[i].txtData)+'</span>'+
							'<input class="ipt" id="e-'+(data[i].id)+'" onblur="qyq('+(data[i].id)+')">'+
							'<span class="cancel" id=del'+(data[i].id)+' onclick="delDta('+(data[i].id)+');">-</span>'+
							'<div class="time">期望完成时间：'+(data[i].wishTime)+'</div>';
				document.getElementById("done").appendChild(node);
			}else{
				node.innerHTML="<input type='checkbox' class='check' id='"+ (data[i].id) +"'>"+
							'<label for='+(data[i].id)+' onclick="chosen('+(data[i].id)+')"></label>'+
							'<span id="p-'+(data[i].id)+'" onclick="edit('+(data[i].id)+')">'+(data[i].txtData)+'</span>'+
							'<input class="ipt" id="e-'+(data[i].id)+'" onblur="qyq('+(data[i].id)+')">'+
							'<span class="cancel" id=del'+(data[i].id)+' onclick="delDta('+(data[i].id)+');">-</span>'+
							'<div class="time">期望完成时间：'+(data[i].wishTime)+'</div>';
				document.getElementById("doin").appendChild(node);
			}
			break;
		}
	}
	isOverdue();
}
//点击项目进行编辑事件
function edit(id){			
 	var preEdit = document.getElementById("p-"+id);
 	preEdit.style.display="none";
 	var temp = preEdit.innerHTML;
 	var editInput = document.getElementById("e-"+id);
 	editInput.style.display= "inline";
 	editInput.value = temp;
 	editInput.focus();
}
//失去焦点事件
function qyq(id){		
	var inputNode = document.getElementById("e-"+id);
	var val = inputNode.value;
	inputNode.style.display = "none";
	var data = loadDta();
	for(var i = 0;i<data.length;i++){
		if(data[i].id == id){
			data[i].txtData = val;
			localStorage["todotxt"]=JSON.stringify(data);
			break;
		}
	}
	var spanNode = document.getElementById("p-"+id);
	spanNode.style.display ="inline";
	spanNode.innerHTML =val; 
}
//是否逾期
function isOverdue(){
	var now =new Date().toLocaleString();
	var data = loadDta();
	for(var i=0;i<data.length;i++){
		if(!data[i].flag){
			if(data[i].wishTime<now){
				document.getElementById(data[i].id).parentNode.style.color = "red";
			}
		}
	}
}