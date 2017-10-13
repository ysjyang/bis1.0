<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>业务数据分页展示</title>
<!-- 设置IE默认文本模式，为最高版本 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<link rel="stylesheet" type="text/css"
	href="/css/businessTypeConfig.css" />
<link rel="stylesheet" type="text/css" href="/ltext/datatabletheme.css" />
<link rel="stylesheet" type="text/css"
	href="/ltext/datatabletheme35.css" />
<link rel="stylesheet" type="text/css"
	href="/ltext/calendar/calendar.css" />
<script src="/ltext/ltext_core.js"></script>
<script src="/ltext/datatable3.0.js"></script>
<script src="/js/jquery.js"></script>
<script src="/js/common.js"></script>
<script src="/ltext/ltext_core.js"></script>
<script src="/ltext/calendar.js"></script>
<script src="/test/test.js"></script>
</head>
<body>
	<div class="bule_style">
		<div class="sysHead">
			<div class="sys_logo">
				<a href="#">银行接口服务</a><span>测试</span>
			</div>
			<div class="sys_close"></div>
		</div>
		<div class="sysMain" id="sysMain">
			<!-- search -->
			<div class="sysBtnBox">
				<ul class="ULLeft">
					<li><label>数据财政区划：</label> <input type="text" id="proinput"
						readonly="readonly" /> <input type="hidden" id="procode" /></li>
					<li><label>数据年度：</label> <select id="year"></select></li>
					<li><label>业务数据对应的银行编码：</label> <input id="bankcode"
						type="text" value="001" /></li>
				</ul>
				<ul class="ULLeft">
					<li><label>业务类型：</label> <select id="bustype"></select></li>
				</ul>
				<ul  id ="start" class="ULLeft">
					<li><label>开始日期：</label> <input id="begindate" type="text"
						onclick="showCalendar(this, '%Y-%m-%d', false, true)" /> <label>结束日期：</label>
						<input id="enddate" type="text"
						onclick="showCalendar(this, '%Y-%m-%d', false, true)" /></li>
				</ul>
				<ul class="ULRight">
					<li>
						<button onclick="exe();">执行</button></li>
					<li>
						<button onclick="queryPageData();">查询</button></li>
				</ul>
				<ul class="ULLeft">
					<li id="read"><label>读取所用接口：</label> <select id="readtype">
							<option value="read1">1、读取没有回执</option>
							<option value="read2">2、读取有回执</option>
							<option value="read3">3、读取已读取未回执</option>
					</select></li>
					<li id="li_busdatatype"><label>数据源类型：</label>
					<select id="busdatatype">
							<option value="01">01 直接支付</option>
							<option value="02">02 授权支付</option>
							<option value="03">03 公务卡</option>
					</select>
					</li>
					<li id="elements"><label>基础数据：</label> <select id="ele">
							<option value="zfgllx">1、支付管理类型</option>
							<option value="bank">2、银行</option>
							<option value="bankaccount">3、银行账户</option>
							<option value="bankaccounttype">4、账户类型</option>
							<option value="fundtype">5、资金性质</option>
							<option value="paytype">6、支付方式</option>
							<option value="setmode">7、结算方式</option>
							<option value="bgttype">8、预算类型</option>
							<option value="paykind">9、支出类型</option>
							<option value="agencyexp">10、项目分类</option>
							<option value="program">11、项目</option>
							<option value="expfunc">12、支出功能分类</option>
							<option value="expeco">13、支出经济分类</option>
							<option value="agency">14、预算单位</option>
					</select></li>
					<li id="li"><label>基础数据顺序码：</label> <input id="seq" type="text"
						value="0" /></li>

				</ul>
				<ul class="ULRight">
					<li id="resetli">
						<button onclick="reset();">读取状态和回执状态重置</button></li>
					<li>
						<button onclick="del();">清空</button></li>
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
						<a href="javascript:;" onclick="headPage();" class="firstBtn"
							title="第一页"></a> <a href="javascript:;" onclick="prevPage();"
							class="lastBtn" title="上一页"></a> 共<input type="text"
							id="totalrecord" readonly="readonly" />条记录 第<a id="currpage"></a>页/共<a
							id="totalpage"></a>页 <a href="javascript:;" onclick="nextPage();"
							class="nextBtn" title="下一页"></a> <a href="javascript:;"
							onclick="tailPage();" class="endBtn" title="最后一页"></a> 跳转到第 <input
							type="text" id="jumpTo" onblur="jumpTo();" /> 页 每页显示 <input
							type="text" id="pagesize" onblur="modifySize();" /> 条记录
					</div>
				</div>
				<!-- list_table -->
				<div class="sysTableBox" id="subtabledata"></div>
			</div>
		</div>
	</div>
</body>
</html>
