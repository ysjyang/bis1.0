/**
 * @Title: ChangePwdViewAction.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-16  胡川
 */
 

package gov.mof.fasp2.bis.ipconfig;

import gov.mof.fasp2.bis.cache.SysCache;
import gov.mof.fasp2.bis.cache.VerifyCodeCache;
import gov.mof.fasp2.bis.common.IAction;
import gov.mof.fasp2.bis.util.BisUtil;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @ClassName: ChangePwdViewAction
 * @Description: Description of this class
 * @author <a href="mailto:huchuan@szlongtu.com">胡川</a>于 2016-5-16 上午10:10:35
 */

public class UpdateIPAction implements IAction {

    @Override
    public boolean doAction(HttpServletRequest request, HttpServletResponse response, String servletpath, boolean isajax)
            throws Exception {
        if (isajax) {
            // 获取需要刷新的缓存类型
            String cacheType = request.getParameter("cacheType");
            //如果刷新成功，存放成功提示消息
            Map<String, String> m = new HashMap<String, String>();
            if ("requestConfig".equals(cacheType)) {
                SysCache.refreshRequestConfigCache();
                m.put("msg", "请求配置缓存刷新成功！");
                BisUtil.ajaxPrint(BisUtil.objectToJson(m), response);
            }
            if ("busType".equals(cacheType)) {
                SysCache.refreshBustypeCache();
                m.put("msg", "业务类型缓存刷新成功！");
                BisUtil.ajaxPrint(BisUtil.objectToJson(m), response);
            }
            if ("nameAndPwd".equals(cacheType)) {
                SysCache.refreshUserNameCache();
                m.put("msg", "用户名密码缓存刷新成功！");
                BisUtil.ajaxPrint(BisUtil.objectToJson(m), response);
            }
            if ("errCode".equals(cacheType)) {
                SysCache.refreshErrorNoCache();
                m.put("msg", "错误编码缓存刷新成功！");
                BisUtil.ajaxPrint(BisUtil.objectToJson(m), response);
            }
            if ("busTypeCfg".equals(cacheType)) {
                SysCache.refreshBustypeConfigCache();
                m.put("msg", "业务类型配置缓存刷新成功！");
                BisUtil.ajaxPrint(BisUtil.objectToJson(m), response);
            }
            if ("tableCol".equals(cacheType)) {
                SysCache.refreshTableColumnsCache();
                m.put("msg", "系统表缓存刷新成功！");
                BisUtil.ajaxPrint(BisUtil.objectToJson(m), response);
            }
            if ("verCode".equals(cacheType)) {
                VerifyCodeCache.refreshVerifyCodeCache();
                m.put("msg", "验证码缓存刷新成功！");
                BisUtil.ajaxPrint(BisUtil.objectToJson(m), response);
            }
            if ("systemset".equals(cacheType)) {
            	SysCache.refreshSystemsetCache();
                m.put("msg", "系统配置缓存刷新成功！");
                BisUtil.ajaxPrint(BisUtil.objectToJson(m), response);
            }
            if ("ipAddress".equals(cacheType)) {
            	SysCache.refreshIPCache();
                m.put("msg", "IP地址缓存刷新成功！");
                BisUtil.ajaxPrint(BisUtil.objectToJson(m), response);
            }
        }
        return true;
    }

}
