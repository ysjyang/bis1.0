var flag={"oldpassword":false,"password":false,"repassword":false};
		//旧密码验证
		$(function(){
			$("#txtOldPass").blur(function(){
				var txtOldPass=$("#txtOldPass").val();
				$("#password0\\.info").html("");
				//非空验证
				if(txtOldPass==""){
					$("#password0\\.info").html("密码不能为空");
					flag.oldpassword=false;
					return;
				}else{
					flag.oldpassword=true;
					return;
				}
			});
		}); 
		//新密码验证
		$(function(){
			$("#txtPassword").blur(function(){
				var txtpassword=$("#txtPassword").val();
				$("#password\\.info").html("");
				//非空验证
				if(txtpassword==""){
					$("#password\\.info").html("密码不能为空");
					flag.password=false;
					return;
				}
				var pattern=/^([a-zA-Z0-9]){6,20}$/;
				if(!pattern.test(txtpassword)){
					$("#password\\.info").html("格式或长度不正确");
					flag.password=false;
					return;
				}else{
					flag.password=true;
					return;
				}
			});
		});
		//新密码确认验证
		$(function(){
			$("#txtRepeatPass").blur(function(){
				var txtRepeatPass=$(this).val();
				$("#password1\\.info").html("");
				//非空验证
				if(txtRepeatPass==""){
					$("#password1\\.info").html("确认密码不能为空");
				flag.repassword=false;
				return;
				}
				//和密码比对是否一致验证
				var txtpassword=$("#txtPassword").val();
				if(txtpassword!=txtRepeatPass){
					$("#password1\\.info").html("两次密码不一致");
					flag.repassword=false;
					return;
				}else{
					$("#password1\\.info").html("正确");
					flag.repassword=true;
					return;
				}
			});
		});
		//表单提交验证
		$(function(){
			$("#f").submit(function(){
				var ok=flag.oldpassword&&flag.password&&flag.repassword;
				if(ok){
					return true;
				}else{
					alert("清检查表单数据");
					return false;
				}
			});
			
		});