/**
 * @Title: CacheLoaderServlet.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-11  钟毅
 */
 

package gov.mof.fasp2.bis.servlet;

import gov.mof.fasp2.bis.timer.BisTimer;

import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

/**
 * @ClassName: CacheLoaderServlet
 * @Description: Description of this class
 * @author <a href="mailto:zhongyi@szlongtu.com">钟毅</a>2016-5-11 07:33:10
 */

public class TimerTaskServlet extends HttpServlet{
    public final void init() throws ServletException 
    {
        System.out.println("定时任务启动...");
        try {
            BisTimer.startAllTimerTask();
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("定时器启动异常："+e.getMessage());
        }
        
    }
}
