<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>业务数据分页展示</title>
<!-- 设置IE默认文本模式，为最高版本 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<link rel="stylesheet" type="text/css" href="/css/businessTypeConfig.css" />
<link rel="stylesheet" type="text/css" href="/ltext/datatabletheme.css" />
<link rel="stylesheet" type="text/css" href="/ltext/datatabletheme35.css" />
<link rel="stylesheet" type="text/css" href="/ltext/calendar/calendar.css" />
<script src="/ltext/ltext_core.js"></script>
<script src="/ltext/datatable3.0.js"></script>
<script src="/js/jquery.js"></script>
<script src="/js/common.js"></script>
<script src="/ltext/ltext_core.js"></script>
<script src="/ltext/calendar.js"></script>
<script src="/bustypequery/bustypequery.js"></script>
</head>
<body>
<div class="bule_style">
  <div class="sysHead">
    <div class="sys_logo"><a href="#">银行接口服务</a><span>业务数据查询</span></div>
    <div class="sys_close"></div>
  </div>
  <div class="sysMain" id="sysMain"> 
    <!-- search -->
    <div class="sysBtnBox">
      <ul class="ULLeft">
        <li>
          <label>财政区划：</label>
          <input type="text" id="proinput" readonly="readonly"/>
          <input type="hidden" id="procode"/>       	
       	</li>
        <li>
          <label>业务类型：</label>
          <select id="bustype"></select>
        </li>
        <li>
          <label>年度：</label>
          <select id="year"></select>
        </li>
        <li>
          <label>开始日期：</label>
          <input id="begindate" type="text"  onclick="showCalendar(this, '%Y-%m-%d', false, true)"/>
          <label>结束日期：</label>
          <input id="enddate" type="text"  onclick="showCalendar(this, '%Y-%m-%d', false, true)"/>
        </li>
      </ul>
      <ul class="ULRight">
        <li>
          <button onclick="queryPageData();">查询</button>
        </li>
      </ul>
    </div>
	<div class="sysTreeBox">
	   <div class="sysTree" id="treediv"></div>
	 </div>
    <div class="sys_content">
      <!-- list_table-->
      <div class="sysTableBox" id="maintabledata"></div>
      <!-- page -->
      <div class="syspage">
        <div class="pagebox">
         <a href="javascript:;" onclick="headPage();" class="firstBtn" title="第一页"></a> 
         <a href="javascript:;" onclick="prevPage();" class="lastBtn" title="上一页"></a>
         	共<input type="text" id="totalrecord" readonly="readonly"/>条记录 
                       第<a id="currpage"></a>页/共<a id="totalpage"></a>页 <a href="javascript:;" onclick="nextPage();" class="nextBtn" title="下一页"></a> <a href="javascript:;" onclick="tailPage();" class="endBtn" title="最后一页"></a> 跳转到第
          <input type="text" id="jumpTo" onblur="jumpTo();"/>
          页
          每页显示
          <input type="text" id="pagesize" onblur="modifySize();"/>
          条记录 </div>
      </div>
      <!-- list_table -->
      <div class="sysTableBox" id="subtabledata"></div>
    </div>
  </div>
</div>
</body>
</html>
