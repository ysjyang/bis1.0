var aj;
var rc;
var dt;

$(function() {
	aj = synajax('/bis/changePwdView.ajax');
	rc = new Ext.lt.recordset();
	rc.addData(aj);
	dt = new Ext.lt.datatable35(rc);
	dt.setCols([
			dt.columns.seq,
			{
				name : 'code',
				alias : '用户名'
			},
			{
				name : 'name',
				alias : '姓名'
			},
			{
				name : 'usertype',
				alias : '用户类型',
				fn : function(i, j, rs, value) {
					if (value == '1') {
						return "系统用户";
					}
					if (value == '2') {
						return "业务用户";
					}
				}
			},
			{
				name : 'province',
				alias : '区划'
			},
			{
				alias : '操作',
				fn : function(i, j, rs, value) {
					if (rs.usertype == 1) {
						return [ '<a href="javascript:;" onclick="resetPwd(',
								"'", rs.code, "'", ');">重置密码</a>','&nbsp;&nbsp;&nbsp;&nbsp;',
								'<a href="javascript:;" onclick="changePwd(',
								"'", rs.code, "'", ');">修改密码</a>'].join('');
					}else{
						return [ '<a href="javascript:;" onclick="resetPwd(', "'",
						         rs.code, "'", ');">重置密码</a>' ].join('');
					}
				}
			} ]);

	dt.setClassName('dttheme_inner');
	dt.draw(maindiv);
});


// 重置密码
function resetPwd(code) {
	var rt = synajax('/bis/resetpwd.ajax', 'code=' + code);
	// 重置成功消息提示
	alert(rt.msg);
}
// 修改密码
function changePwd(code){
	openNewModalWindow("/bis/changePwd.do?code="+code,550,300,"修改密码",function(){});
}