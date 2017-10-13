/**
 * @Title: IAction.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-11  钟毅
 */
 

package gov.mof.fasp2.bis.common;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @ClassName: IAction
 * @Description: Description of this class
 * @author <a href="mailto:zhongyi@szlongtu.com">钟毅</a> 2016-5-11 05:54:34
 */

public interface IAction {
    
    public boolean doAction(HttpServletRequest request,
            HttpServletResponse response,String servletpath,boolean isajax) throws Exception;

}
