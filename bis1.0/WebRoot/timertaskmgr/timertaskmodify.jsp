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
<title>定时任务编辑</title>
<!-- 设置IE默认文本模式，为最高版本 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<link type="text/css" rel="stylesheet"
	href="../css/businessTypeConfig.css" />
<link type="text/css" rel="stylesheet" href="../css/poppup.css" />
<script src="../js/jquery.js"></script>
<script src="../js/common.js"></script>
<script src="../timertaskmgr/timertaskmodify.js"></script>
</head>
<%
    request.setCharacterEncoding("utf-8");
    String code = request.getParameter("code");
    String name = request.getParameter("name");
%>
<body>
	<div class="bule_style">
		<form>
			<div class="sysEditBox mar10">
				<div class="editlist">
					<ul>
						<li><label>任务编码：</label><input type="text" value="<%=code%>"
							id="taskcode" name="code" /></li>
						<li><label>任务名称：</label><input type="text" value="<%=name%>"
							id="taskname" name="name" /></li>
						<li><label>任务类型：</label><select id="typeslt" name="type">
								<option value="1">1、安排在指定的时间执行指定的任务（此任务只执行一次）</option>
								<option value="2">2、安排指定的任务在指定的时间开始进行重复的固定延迟执行</option>
								<option value="3">3、安排在指定延迟后执行指定的任务。（此任务只执行一次）</option>
								<option value="4">4、安排指定的任务从指定的延迟后开始进行重复的固定延迟执行</option>
								<option value="5">5、安排指定的任务在指定的时间开始进行重复的固定速率执行</option>
								<option value="6">6、安排指定的任务在指定的延迟后开始进行重复的固定速率执行</option>
								<option value="7">7、每月的某个时间执行一次（精确到分钟）</option>
								<option value="8">8、每周的某个时间执行一次（精确到分钟）</option>
								<option value="9">9、每天的某个时间执行一次（精确到分钟）</option>
								<option value="10">10、每小时的某个时间执行一次（精确到分钟）</option>
						</select>
						</li>
					</ul>
				</div>
				<div class="editlist" id="timeset1">
					<ul>
						<li id="starttimediv"><label>开始时间：</label><input type="text"
							id="starttime" name="starttime" /><span id="starttime.info"></span>
							<!--<span>时间格式为 ：yyyy-MM-dd HH:mm:ss 如：2017-02-28 18:03:22</span>-->
						</li>
						<li id="delaytimediv"><label>延时开始时间：</label><input
							type="text" id="delaytime" name="delaytime" />毫秒</li>
						<span id="delay.info"></span>
						<li id="perioddiv"><label>执行间隔时间：</label><input type="text"
							id="period" name="period" />毫秒</li>
						<span id="period.info"></span>
					</ul>
				</div>
				<div class="editlist" id="timeset2">
					<ul>
						<li id="monthdiv">
							<label>输入日期：</label>
							<input type="text" name="day" id="day" />日
							<span id="month.info"></span></li>
						<li id="weekdiv"><label>选择星期：</label> <!--<input type="text" name="week"/>  -->
							<select name="week">
								<option value="1">周一</option>
								<option value="2">周二</option>
								<option value="3">周三</option>
								<option value="4">周四</option>
								<option value="5">周五</option>
								<option value="6">周六</option>
								<option value="7">周日</option>
						</select> <span id="week.info"></span>
						</li>
						<li id="timediv">
							<label>输入时间：</label>
							<input type="text" name="hour" id="hourinput" />:&nbsp;<input type="text" name="minute" id="minuteinput"/>:&nbsp;<input type="text" name="second" id="secondinput"/>
							<span id="second.info"></span>
						</li>
					</ul>
				</div>
			</div>
			<p class="sureBtn clearMar10">
				<button type="submit" id="savebt">保存</button>
			</p>
		</form>
	</div>
</body>
</html>
