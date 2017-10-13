var aj;
var rc;
var dt;

$(function() {
	aj = synajax('/bis/ipconfig.ajax');
	rc = new Ext.lt.recordset();
	rc.addData(aj);
	dt = new Ext.lt.datatable35(rc);
	dt.setCols([
			dt.columns.seq,
			{
				name : 'guid',
				alias : 'guid'
			},
			{
				name : 'syscode',
				alias : '系统编码'
			},
			{
				name : 'name',
				alias : '系统名称'
			},
			{
				name : 'ip',
				alias : 'IP地址'
			},
			{
				name : 'loginname',
				alias : '登录账号'
			},
			{
				alias : '操作',
				fn : function(i, j, rs, value) {
						return [ '<a href="javascript:;" onclick="del(', "'",
						         rs.guid, "'", ');">删除</a>' ].join('');
				}
			} ]);

	dt.setClassName('dttheme_inner');
	dt.draw(maindiv);
});


// 删除
function del(guid) {
	var rt = synajax('/bis/resetpwd.ajax', 'operationtype=del&guid='+guid);
	// 删除成功消息提示
	alert(rt.msg);
}
// 修改密码
function changePwd(code){
	openNewModalWindow("/bis/changePwd.do?code="+code,550,300,"修改密码",function(){});
}