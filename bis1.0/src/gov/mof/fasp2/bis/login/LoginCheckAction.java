package gov.mof.fasp2.bis.login;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import gov.mof.fasp2.bis.common.IAction;
import gov.mof.fasp2.bis.util.BisUtil;
import gov.mof.fasp2.bis.util.MD5Util;


/**
 * @ClassName: LoginAction
 * @Description: 登录验证
 * 返回true表示跳转到数据库中配置的地址，false表示不跳转
 */
public class LoginCheckAction implements IAction{
	
	private LoginCheckBO loginCheckBO;
	public static Map curuser_name = new HashMap();

	public LoginCheckBO getLoginCheckBO() {
		return loginCheckBO;
	}


	public void setLoginCheckBO(LoginCheckBO loginCheckBO) {
		this.loginCheckBO = loginCheckBO;
	}


	@Override
	public boolean doAction(HttpServletRequest request,
			HttpServletResponse response, String servletpath, boolean isajax)
			throws Exception {
		if(isajax){
            Map m = new HashMap();
            //获取用户名密码
            //request.getParameter和request.getAttribute的区别
            String username = (String) request.getParameter("username");
            String password = (String) request.getParameter("password");
    		String passwordMD5 = MD5Util.digest(password);
    		//暂时先用不加密的密码验证
    		if("test".equals(username)){
    			String guid = loginCheckBO.checkUser(username,passwordMD5);
    			String loginSuccess = "truetest";
    			if(guid != ""){
    				//验证成功后把当前用户存贮到session中
    				request.getSession().setAttribute("currentUserguid", guid);
    				//把当前用户放到map中
    				curuser_name.put("username", username);
    			}else{
    				loginSuccess = "false";
    			}
    			//返回是否登录成功
    			m.put("loginSuccess", loginSuccess);
    			BisUtil.ajaxPrint(BisUtil.objectToJson(m), response);
    		}else{
    			String guid = loginCheckBO.checkUser(username,passwordMD5);
    			String loginSuccess = "true";
    			if(guid != ""){
    				//验证成功后把当前用户存贮到session中
    				request.getSession().setAttribute("currentUserguid", guid);
    				//把当前用户放到map中
    				curuser_name.put("username", username);
    			}else{
    				loginSuccess = "false";
    			}
    			//返回是否登录成功
    			m.put("loginSuccess", loginSuccess);
    			BisUtil.ajaxPrint(BisUtil.objectToJson(m), response);
    		}
		}
		return false;
	}



}
