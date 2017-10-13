/**
 * @Title: PageAction.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-27  胡川
 */

package gov.mof.fasp2.bis.common;

import gov.mof.fasp2.bis.factory.ServiceFactory;
import gov.mof.fasp2.bis.util.BisUtil;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @ClassName: PageAction
 * @Description: Description of this class
 * @author <a href="mailto:huchuan@szlongtu.com">胡川</a>于 2016-5-27 下午8:01:54
 */

public class PageAction implements IAction {

    /**
     * .
     * <p>
     * Title: doAction
     * </p>
     * <p>
     * Description:
     * </p>
     * @param request
     * @param response
     * @param servletpath
     * @param isajax
     * @return
     * @throws Exception
     * @see gov.mof.fasp2.bis.common.IAction#doAction(javax.servlet.http.HttpServletRequest,
     *      javax.servlet.http.HttpServletResponse, java.lang.String, boolean)
     */
    @Override
    public boolean doAction(HttpServletRequest request, HttpServletResponse response, String servletpath, boolean isajax)
            throws Exception {
        if (isajax) {
            // 将前台传过来的json转换为pagequerydto对象
            PageQueryDTO pageQueryDto = new PageQueryDTO(BisUtil.jsonToMap(request.getParameter("pagedto")));
            CommonDAO dao = (CommonDAO) ServiceFactory.getBean("bis.common.CommonDAO");
            // 执行查询，然后再把dto对象传到后台
            BisUtil.ajaxPrint(BisUtil.objectToJson(dao.queryPageForList(pageQueryDto)), response);
        }
        return true;
    }

}
