<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>日志管理</title>
<link rel="stylesheet" type="text/css" href="../ltext/datatabletheme.css" />
<link rel="stylesheet" type="text/css" href="../ltext/datatabletheme35.css" />
<link rel="stylesheet" type="text/css" href="../ltext/calendar/calendar.css" />
<link rel="stylesheet" type="text/css" href="../css/businessTypeConfig.css" />
<link rel="stylesheet" type="text/css" href="../css/poppup.css" />
<script src="/ltext/ltext_core.js"></script>
<script src="/ltext/datatable3.0.js"></script>
<script type="text/javascript" src="../js/jquery.js"></script>
<script type="text/javascript" src="../js/common.js"></script>
<script type="text/javascript" src="../ltext/ltext_core.js"></script>
<script type="text/javascript" src="../ltext/calendar.js"></script>
<script type="text/javascript" src="../logManager/logManager.js"></script>
<script>
  onload=function(){
     windowH=$(window).height();
	 windowW=$(window).width();
	
	 $(".syspage").css({"width":windowW-22+"px"})
  }
</script>
</head>
<body>
<div class="bule_style"> 
  <!-- 头图片 -->
  <div class="sysHead">
    <div class="sys_logo"><a href="#">银行接口服务</a><span>日志管理</span></div>
    <div class="sys_close"></div>
  </div>
  <!-- 页面主体 -->
  <div class="sysMain"> 
    <!-- 查询条件或按钮 -->
    <div class="sysBtnBox">
      <ul class="ULLeft">
        <li>
          <select id="selectitem">
            <option>报文日志</option>
            <option>错误报文日志</option>
            <option>业务日志</option>
            <option>错误业务日志</option>
          </select>
        </li>
        <li> 
          <label>时间从</label>
          <input id="begintime" type="text"  onclick="showCalendar(this, '%Y-%m-%d', null, true)" />
          <label>到</label>
          <input id="endtime" type="text"  onclick="showCalendar(this, '%Y-%m-%d', null, true)" />
        </li>
       </ul>
       <ul class="ULRight">
        <li>
          <button onclick="queryData()">查询</button>
        </li>
        <li>
          <button onclick="deleteData()">删除</button>
        </li>
      </ul>
    </div>
    <!-- 表格区-->
    <div id="tableevent" class="sysTableBox" style="height: 500px"></div>
    <!-- page --> 
    <div class="syspage" id="sysPage">
      <div class="pagebox">
                       共<input type="text" id="sumdate" readOnly="true"/>条记录&nbsp;&nbsp;&nbsp;
        <a href="javascript:;" onclick="headPage();" class="firstBtn" title="第一页"></a>
        <a href="javascript:;" onclick="prevPage();" class="lastBtn" title="上一页"></a>
        第<a id="currpage"></a>页/共<a id="totalpage"></a>页
        <a href="javascript:;" onclick="nextPage();" class="nextBtn" title="下一页"></a> 
        <a href="javascript:;" onclick="tailPage();" class="endBtn" title="最后一页"></a>
        跳转到第<input type="text" id="jumpTo" onblur="jumpTo();"/>页
        每页显示<input type="text" id="pagesize" onblur="modifySize();"/>条记录
      </div>
    </div>
    <!-- page -->
  </div>
</div>
</body>
</html>