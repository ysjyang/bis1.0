<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=8">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>系统登录</title>
<link rel="stylesheet" type="text/css" href="../css/login.css">
<script type="text/javascript" src="/js/jquery.js"></script>
<script type="text/javascript" src="/js/common.js"></script>
<script type="text/javascript">
    //显示输错密码的错误信息
    function loginCheck(){
    	var message = '<%=request.getAttribute("message") %>';
    	//因为null和undefined在js里面都是可以当做FALSE来用的
    	if(message!="null"){
	    	alert(message);
    	}
    }
    //用户名密码的校验
    function checkUser(){
   		var username = document.getElementById("username").value;
  		var password = document.getElementById("password").value;
   		if(username == ""  ){
     		alert("用户名不能为空");
     		return false;
   		}
   		if(password == ""  ){
    		alert("密码不能为空");
     		return false;
   		}
   		ajax('/bis/loginCheck.ajax','username='+username+'&password='+password,function(rt){
   			var path;
	   		if(rt.loginSuccess == "true"){
	   			//后期此路径改为.do
	   			path = "/bis/loginCheck/toPage.do";
	   			window.location.href = path;
	   		}else if(rt.loginSuccess == "truetest"){
	   			path = "/bis/loginCheck/toPagetest.do";
	   			window.location.href = path;
	   		}else{
	   			//alert("用户或密码错误，请重新输入！");
	   			$("#loginlabel").text("用户或密码错误，请重新输入！");
	   			$("#password").val("");
	   		}
   		});
   		
	}
	
	function returnFun(){
		if(event.keyCode == 13){ 
	 		checkUser(); 
	 	} 
	}
</script>
</head>
  
<body oncontextmenu="return false" onselectstart="return false" ondragstart="return false" oncopy=document.selection.empty() onselect=document.selection.empty()>
<div class="loginDiv">
  <div class="loginContent" id="backroundimgdiv">
    <!--Bg-head-->
    <div class="Bg-head"></div>
    <!--loginBox-->
    <div class="loginBox" id="logintablediv">
      <label class="loginlabel" id="loginlabel"></label>
      <div class="logintable" id="logintable">
        <h2>用户登录</h2>
        <ul>
          <li><span class="nameBox">用户名：</span><input type="text" name="username" id="username"/></li>
          <li><span class="pwdBox">密码：</span><input type="password" name="password" id="password" onkeydown="returnFun()"/></li>
        </ul>
        <ul>
          <li><button onclick="checkUser()">登录</button></li>
        </ul>
      </div>
    </div>
    <!--Bg-foot-->
    <div class="Bg-foot"></div>
  </div>
</div>
</body>
</html>
