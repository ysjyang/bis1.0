/**
 * @Title: ChangePwdViewAction.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-16  胡川
 */
 

package gov.mof.fasp2.bis.usermanage.changepwd;

import gov.mof.fasp2.bis.common.IAction;
import gov.mof.fasp2.bis.util.BisUtil;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @ClassName: ChangePwdViewAction
 * @Description: Description of this class
 * @author <a href="mailto:huchuan@szlongtu.com">胡川</a>于 2016-5-16 上午10:10:35
 */

public class ChangePwdViewAction implements IAction {

    @Override
    public boolean doAction(HttpServletRequest request, HttpServletResponse response, String servletpath, boolean isajax)
            throws Exception {
        if(isajax){
            ChangePwdDAO dao = new ChangePwdDAO();
            List<Map> l = dao.findAllUser();
            BisUtil.ajaxPrint(BisUtil.objectToJson(l), response);
        }
        return true;
    }

}
