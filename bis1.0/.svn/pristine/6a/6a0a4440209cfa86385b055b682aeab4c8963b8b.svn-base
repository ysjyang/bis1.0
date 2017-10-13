<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%
    String date = request.getParameter("date");
%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="../css/businessTypeConfig.css" />
<link rel="stylesheet" type="text/css" href="../css/poppup.css" />
<script type="text/javascript" src="../js/jquery.js"></script>
<script type="text/javascript">
     function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        }
    $(function(){
        var date = getUrlParam("date");
      //var date = "<%=date%>";
        alert(window.parent.logdatas);
        $("#textarea1").val(window.parent.logdatas);
    });
</script>
</head>
<body>
    <textarea id="textarea1" style="height: 290px;width:490px"style="overflow-y:auto"></textarea>
</div>
</body>
</html>