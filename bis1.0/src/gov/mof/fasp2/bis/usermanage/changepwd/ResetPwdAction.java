/**
 * @Title: ResetPwdAction.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-13  胡川
 */
 

package gov.mof.fasp2.bis.usermanage.changepwd;

import gov.mof.fasp2.bis.common.IAction;
import gov.mof.fasp2.bis.util.BisUtil;
import gov.mof.fasp2.bis.util.MD5Util;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @ClassName: ResetPwdAction
 * @Description: Description of this class
 * @author <a href="mailto:huchuan@szlongtu.com">胡川</a>于 2016-5-13 下午9:13:56
 */

public class ResetPwdAction implements IAction{
    @SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
    public boolean doAction(HttpServletRequest request, HttpServletResponse response, String servletpath, boolean isajax)
            throws Exception {
        if(isajax){
            Map m = new HashMap();
            String code = request.getParameter("code");
            ChangePwdDAO dao = new ChangePwdDAO();
            dao.updatePwd(MD5Util.digest("123456"), code);
            m.put("msg", "密码已重置！");
            BisUtil.ajaxPrint(BisUtil.objectToJson(m), response);
        }
        return true;
    }

}
