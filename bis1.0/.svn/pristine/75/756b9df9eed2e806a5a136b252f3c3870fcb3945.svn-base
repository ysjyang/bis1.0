/**
 * @Title: ChangePwdSubAction.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-13  胡川
 */
 

package gov.mof.fasp2.bis.usermanage.changepwd;

import gov.mof.fasp2.bis.common.IAction;
import gov.mof.fasp2.bis.util.MD5Util;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @ClassName: ChangePwdSubAction
 * @Description: Description of this class
 * @author <a href="mailto:huchuan@szlongtu.com">胡川</a>于 2016-5-13 下午8:17:20
 */

public class ChangePwdSubAction implements IAction{
    public boolean doAction(HttpServletRequest request, HttpServletResponse response, String servletpath, boolean isajax)
            throws Exception {
        String msg = "";
        String code = request.getParameter("code");
        String oldPwd = request.getParameter("oldPwd");
        String newPwd = request.getParameter("newPwd");
        String MD5OldPwd = MD5Util.digest(oldPwd);
        ChangePwdDAO dao= new ChangePwdDAO();
        List<Map> l = dao.findUserByCode(code);
        
        if(l.get(0).get("password").equals(MD5OldPwd)){
            dao.updatePwd(MD5Util.digest(newPwd),code);
            msg = "密码修改成功！";
        }else{
            msg = "旧密码不正确，请重新输入！";
        }
        request.setAttribute("msg", msg);
        return true;
    }
    
}
