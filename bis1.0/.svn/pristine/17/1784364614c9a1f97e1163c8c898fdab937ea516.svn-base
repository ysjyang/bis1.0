/**
 * @Title: CacheLoaderServlet.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-11  钟毅
 */
 

package gov.mof.fasp2.bis.servlet;

import gov.mof.fasp2.bis.cache.SysCache;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

/**
 * @ClassName: CacheLoaderServlet
 * @Description: Description of this class
 * @author <a href="mailto:zhongyi@szlongtu.com">钟毅</a>2016-5-11 07:33:10
 */

public class CacheLoaderServlet extends HttpServlet{
    public final void init() throws ServletException 
    {
        System.out.println("加载ErrorNoCache...");
        SysCache.getErrorNoCache();
        System.out.println("加载RequestConfigCache...");
        SysCache.getRequestConfigCache();
        System.out.println("加载BustypeCache...");
        SysCache.getBustypeCache();
        System.out.println("加载UserNameCache...");
        SysCache.getUserNameCache();
        System.out.println("加载SystemsetCache...");
        SysCache.getSystemCache();
        System.out.println("加载IPCache...");
        SysCache.getIPCache();
        
        
    }
}
