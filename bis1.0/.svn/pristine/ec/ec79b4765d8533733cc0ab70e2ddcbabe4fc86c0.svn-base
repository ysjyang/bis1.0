var ajCache; // ajax
var userdata; // recordset
var columCache; // colum

$(function() {
	ajCache = [ {
		"cacheName" : "请求配置缓存"
	}, {
		"cacheName" : "用户名密码缓存"
	}, {
		"cacheName" : "错误编码缓存"
	}, {
		"cacheName" : "业务类型缓存"
	}, {
		"cacheName" : "业务类型配置缓存"
	}, {
		"cacheName" : "系统表缓存"
	}, {
		"cacheName" : "验证码缓存"
	}, {
		"cacheName" : "系统配置缓存"
	}, {
		"cacheName" : "IP地址缓存"
	}];
	columCache = [ 'cacheName' ];
	userdata = new Ext.lt.recordset({
		columns : columCache
	});
	userdata.addData(ajCache);
	dtTasks = new Ext.lt.datatable35(userdata);
	dtTasks.setCols([ dtTasks.columns.seq, {
		name : 'cacheName',
		alias : '缓存名称'
	}, {
		alias : '操作',
		fn : function(i, j, rs, value) {
			return '<a href="javascript:;" onclick="f'+i+'();">刷新缓存</a>';
		}
	} ]);

	// 设置别名
	dtTasks.setClassName('dttheme_inner');
	dtTasks.draw(maindiv); // 画表
	dtTasks.setAllHeadWidth(true); // 允许调整列宽
});

// 刷新请求配置缓存
function f0() {
	var rt = synajax('/bis/refreshCache.ajax', 'cacheType=requestConfig');
	alert(rt.msg);
}
//刷新用户名密码缓存
function f1() {
	var rt = synajax('/bis/refreshCache.ajax', 'cacheType=nameAndPwd');
	alert(rt.msg);
}

//刷新错误编码缓存
function f2() {
	var rt = synajax('/bis/refreshCache.ajax', 'cacheType=errCode');
	alert(rt.msg);
}
// 刷新业务类型缓存
function f3() {
	var rt = synajax('/bis/refreshCache.ajax', 'cacheType=busType');
	alert(rt.msg);
}

// 刷新业务类型配置缓存
function f4() {
	var rt = synajax('/bis/refreshCache.ajax', 'cacheType=busTypeCfg');
	alert(rt.msg);
}
// 刷新系统表缓存
function f5() {
	var rt = synajax('/bis/refreshCache.ajax', 'cacheType=tableCol');
	alert(rt.msg);
}
// 刷新验证码缓存
function f6() {
	var rt = synajax('/bis/refreshCache.ajax', 'cacheType=verCode');
	alert(rt.msg);
}
// 刷新系统配置缓存
function f7() {
	var rt = synajax('/bis/refreshCache.ajax', 'cacheType=systemset');
	alert(rt.msg);
}
// 刷新IP地址缓存
function f8() {
	var rt = synajax('/bis/refreshCache.ajax', 'cacheType=ipAddress');
	alert(rt.msg);
}