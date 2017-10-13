$(function(){	
	//保存
	$("#saving").click(function(){
		var ip=document.getElementById("ip").value;
		var port=document.getElementById("port").value;
		if(ip==null || ip==""|| ip=="请输入数字类型的IP"|| port==null || port==""|| port=="请输入数字类型的端口"){
			alert("请输入内容");
			return;
		}
		var rt = synajax('/bis/serviceaddress.ajax','ip='+ip+'&port='+port);
		if(rt=="success")
			alert("保存成功");
	});
});
