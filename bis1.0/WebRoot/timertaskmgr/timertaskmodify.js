var code;
var opValue; //任务类型
var flag={"type1":false,"type2":false,"type3":false,"type4":false,"type5":false,"type6":false,"type7":false,"type8":false,"type9":false,"type10":false};
$(function(){
	//设置任务编码和任务名称输入框属性
	$("#taskcode").attr({"readonly":true,"size":40});
	$("#taskname").attr({"readonly":true,"size":40});
	
	//加载初始化时间设置界面
    opValue=$("#typeslt").val();
	loadTimeSetting(opValue);
	
	//任务类型下拉列表change事件
	$("#typeslt").change(function(){
		opValue=$("#typeslt").val();
		loadTimeSetting(opValue);
	});
	
	$("#starttime\\.info").html("时间格式为：yyyyMMddHHmmss，如：20161212160505");
	//开始时间格式校验
	$("#starttime").blur(function(){
		//var pattern=/^(?:(?:(?:(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(\/|-)(?:0?2\1(?:29)))|(?:(?:(?:1[6-9]|[2-9]\d)?\d{2})(\/|-)(?:(?:(?:0?[13578]|1[02])\2(?:31))|(?:(?:0?[1,3-9]|1[0-2])\2(29|30))|(?:(?:0?[1-9])|(?:1[0-2]))\2(?:0?[1-9]|1\d|2[0-8])))))\s(?:([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d)$/m;
		var txtstarttime = $("#starttime").val();
		var pattern=/^([0-9]){14}$/;
		$("#starttime\\.info").html("");
		if(!pattern.test(txtstarttime)){
			$("#starttime\\.info").html("开始时间格式不正确！");
			flag.type1=false;
			return;
		}else{
			$("#starttime\\.info").html("时间格式为：yyyyMMddHHmmss，如：20161212160505");
			flag.type1=true;
		}
	});
	// /^(([01]?[0-9])|(2[0-3])):[0-5]?[0-9]$/
	//日期校验
	$("#dayinput").blur(function(){
		var txtstarttime = $("#dayinput").val();
		var pattern=/^([0-9]){2}$/;
		$("#month\\.info").html("");
		if(!pattern.test(txtstarttime)){
			$("#month\\.info").html("格式不正确！");
			return;
		}else{
		}
	});
	//小时校验
	$("#hourinput").blur(function(){
		var txtstarttime = $("#hourinput").val();
		var pattern=/^([0-9]){2}$/;
		$("#hour\\.info").html("");
		if(!pattern.test(txtstarttime)){
			$("#hour\\.info").html("格式不正确！");
			return;
		}else{
		}
	});
	//分钟校验
	$("#minuteinput").blur(function(){
		var txtstarttime = $("#minuteinput").val();
		var pattern=/^([0-9]){2}$/;
		$("#minute\\.info").html("");
		if(!pattern.test(txtstarttime)){
			$("#minute\\.info").html("格式不正确！");
			return;
		}else{
		}
	});
	//秒校验
	$("#secondinput").blur(function(){
		var txtstarttime = $("#secondinput").val();
		var pattern=/^([0-9]){2}$/;
		$("#second\\.info").html("");
		if(!pattern.test(txtstarttime)){
			$("#second\\.info").html("格式不正确！");
			return;
		}else{
		}
	});
	
	//表单保存 数据校验
	$('form').submit(function() {
		if(opValue==1 && !flag.type1){
			alert("清检查表单数据");
			return false;
		}
		if(opValue==10){
			if($("#minuteinput").val()=="" || $("#secondinput").val()==""){
				alert("清检查表单数据");
				return false;
			}
		}
		var rt = synajax('/bis/timertaskmodify.ajax',$(this).serialize());
		if(rt=='success'){
			alert("保存成功");
		}else{
			alert("保存出错");
		}
	});
});

//根据所选任务类型，显示相对应的时间设置界面
function loadTimeSetting(opValue){

	if(opValue==1){
		$("#timeset1").show();
		$("#timeset2").hide();
		$("#starttimediv").show();
		$("#delaytimediv").hide();
		$("#perioddiv").hide();
	}
	if(opValue==2){
		$("#timeset1").show();
		$("#timeset2").hide();
		$("#starttimediv").show();
		$("#delaytimediv").hide();
		$("#perioddiv").show();
	}
	if(opValue==3){
		$("#timeset1").show();
		$("#timeset2").hide();
		$("#starttimediv").hide();
		$("#delaytimediv").show();
		$("#perioddiv").hide();
	}
	if(opValue==4){
		$("#timeset1").show();
		$("#timeset2").hide();
		$("#starttimediv").hide();
		$("#delaytimediv").show();
		$("#perioddiv").show();
	}
	if(opValue==5){
		$("#timeset1").show();
		$("#timeset2").hide();
		$("#starttimediv").show();
		$("#delaytimediv").hide();
		$("#perioddiv").show();
	}
	if(opValue==6){
		$("#timeset1").show();
		$("#timeset2").hide();
		$("#starttimediv").hide();
		$("#delaytimediv").show();
		$("#perioddiv").show();
	}
	if(opValue==7){
		$("#timeset1").hide();
		$("#timeset2").show();
		
		$("#monthdiv").show();
		$("#weekdiv").hide();
		$("#hourinput").show();
		$("#minuteinput").show();
		$("#secondinput").show();
	}
	if(opValue==8){
		$("#timeset1").hide();
		$("#timeset2").show();
		
		$("#monthdiv").hide();
		$("#weekdiv").show();
		$("#hourinput").show();
		$("#minuteinput").show();
		$("#secondinput").show();
	}
	if(opValue==9){
		$("#timeset1").hide();
		$("#timeset2").show();

		$("#monthdiv").hide();
		$("#weekdiv").hide();
		$("#hourinput").show();
		$("#hourinput").attr({"readonly":false});
		$("#minuteinput").show();
		$("#secondinput").show();
	}
	if(opValue==10){
		$("#timeset1").hide();
		$("#timeset2").show();

		$("#monthdiv").hide();
		$("#weekdiv").hide();
		$("#hourinput").show();
		$("#hourinput").attr({"readonly":true});
		$("#minuteinput").show();
		$("#secondinput").show();
	}
}



