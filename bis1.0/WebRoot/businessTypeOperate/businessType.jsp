<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=8">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>业务类型启用/停用</title>
<link rel="stylesheet" type="text/css" href="../css/businessTypeConfig.css" />
<link rel="stylesheet" type="text/css" href="../ltext/datatabletheme.css" />
<link rel="stylesheet" type="text/css" href="../ltext/datatabletheme35.css" />
<script src="../ltext/ltext_core.js"></script>
<script src="../ltext/datatable3.0.js"></script>
<script type="text/javascript" src="../js/jquery.js"></script>
<script type="text/javascript" src="../js/common.js"></script>
<script type="text/javascript" src="../ltext/ltext_core.js"></script>
<script type="text/javascript" src="../businessTypeOperate/bussinessType.js"></script>
<script>
  onload=function(){
     windowH=$(window).height();
	 windowW=$(window).width();
	 $(".sysMain").css({"height":windowH-74+"px"});
	 $(".syspage").css({"width":$(window).width()-260-2})
  }
</script>
</head>
<body>
<div class="bule_style">
  <div class="sysHead">
    <div class="sys_logo"><a href="#">银行接口服务</a><span>业务类型启用/停用</span></div>
    <div class="sys_close"></div>
  </div>
  <div class="sysMain">
    <div class="sysBtnBox">
      <ul class="ULLeft">
        <li>
            <select id="busselect" onchange="selectBusType()">
                <option>请选择接口类型</option>
                <option>集中支付业务</option>
                <option>公务卡业务</option>
                <option>基础数据</option>
                <option>民生平台接口</option>
            </select>
        </li>
      </ul>
      <ul class="ULRight">
        <li>
          <button onclick="saveDataTable()">保存</button>
        </li>
      </ul>
    </div>
    <div class="sys_content">
      <div class="sysTreeBox">
        <div class="sysTreeTitle">财政区划</div>
        <div class="sysTree" id="treediv"></div>
      </div>
      <div class="sysTableBox" id="tableevent"></div>
      <!-- page --> 
      <div class="syspage">
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
</div>
</body>
</html>