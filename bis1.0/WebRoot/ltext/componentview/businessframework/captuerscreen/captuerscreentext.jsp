<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>My JSP 'captuerscreentext.jsp' starting page</title>
   <script type="text/javascript">
  var _ROOT_PATH_='<%=basePath%>';
  var ROOT_PATH=_ROOT_PATH_;
  </script>
  <script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/login/ltext_common_menu.js"></script>
  <script type="text/javascript" src="<%=basePath%>/js/loadOcx.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/componentview/businessframework/captuerscreen/captuerscreen.js"></script>
  </head>
  
  <body>
    <input type="button" value="��ͼ" onclick="jietu()"/>
    <input type="button" value="��ȡ��ͼ" onclick="jietu2()"/>
    <img src="" id="showimgid"/>
   
  </body>
</html>
<script type="text/javascript">
/*
 * ��ȡ��ǰ��Ļ������jpeg��ʽ��ͼƬbase64�����ַ���.
 * by jzy
 */

function jietu(){
	Ext.lt.CaptureScreen.capture();
}

function jietu2(){
	Ext.lt.CaptureScreen.showCaptureScreen('c1d14a2156b9098e6926b4ee4fd2e42e','showimgid',800,700);
}



</script>