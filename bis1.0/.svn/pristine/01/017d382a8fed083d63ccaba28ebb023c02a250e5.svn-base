/**
 * @Title: TimerTaskModifyAction.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-6-4  胡川
 */
 

package gov.mof.fasp2.bis.timertaskmgr;

import gov.mof.fasp2.bis.common.IAction;
import gov.mof.fasp2.bis.util.BisUtil;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @ClassName: TimerTaskModifyAction
 * @Description: Description of this class
 * @author <a href="mailto:huchuan@szlongtu.com">胡川</a>于 2016-6-4 上午11:30:28
 */

public class TimerTaskModifyAction implements IAction{
    private TimerTaskModifyBO timerTaskModifyBO;
    
    public TimerTaskModifyBO getTimerTaskModifyBO() {
        return timerTaskModifyBO;
    }

    public void setTimerTaskModifyBO(TimerTaskModifyBO timerTaskModifyBO) {
        this.timerTaskModifyBO = timerTaskModifyBO;
    }

    /**.
     * <p>Title: doAction</p>
     * <p>Description: </p>
     * @param request
     * @param response
     * @param servletpath
     * @param isajax
     * @return
     * @throws Exception
     * @see gov.mof.fasp2.bis.common.IAction#doAction(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.String, boolean)
     */
    @Override
    public boolean doAction(HttpServletRequest request, HttpServletResponse response, String servletpath, boolean isajax)
            throws Exception {
        if(isajax){
            request.setCharacterEncoding("utf-8");
            
            String code = request.getParameter("code");     //任务编码
            String type = request.getParameter("type");     //任务类型
            
            String starttime = request.getParameter("starttime");   //开始时间
            String delaytime = request.getParameter("delaytime");
            String period = request.getParameter("period");
            
            String day = request.getParameter("day");
            String week = request.getParameter("week");
            String hour = request.getParameter("hour");
            String minute = request.getParameter("minute");
            String second = request.getParameter("second");
            
            if("1".equals(type)){
                String rt = timerTaskModifyBO.updateTask(code,type,starttime);
                BisUtil.ajaxPrint(rt, response);
            }
            if("2".equals(type)){
                String rt = timerTaskModifyBO.updateTask(code,type,starttime,period);
                BisUtil.ajaxPrint(rt, response);
            }
            if("3".equals(type)){
                String rt = timerTaskModifyBO.updateTask(code,type,delaytime);
                BisUtil.ajaxPrint(rt, response);
            }
            if("4".equals(type)){
                String rt = timerTaskModifyBO.updateTask(code,type,delaytime,period);
                BisUtil.ajaxPrint(rt, response);
            }
            if("5".equals(type)){
                String rt = timerTaskModifyBO.updateTask(code,type,starttime,period);
                BisUtil.ajaxPrint(rt, response);
            }
            if("6".equals(type)){
                String rt = timerTaskModifyBO.updateTask(code,type,delaytime,period);
                BisUtil.ajaxPrint(rt, response);
            }
            if("7".equals(type)){
                String rt = timerTaskModifyBO.updateTask(code,type,day,hour,minute,second);
                BisUtil.ajaxPrint(rt, response);
            }
            if("8".equals(type)){
                String rt = timerTaskModifyBO.updateTask(code,type,week,hour,minute,second);
                BisUtil.ajaxPrint(rt, response);
            }
            if("9".equals(type)){
                String rt = timerTaskModifyBO.updateTask(code,type,hour,minute,second);
                BisUtil.ajaxPrint(rt, response);
            }
            if("10".equals(type)){
                String rt = timerTaskModifyBO.updateTask(code,type,minute,second);
                BisUtil.ajaxPrint(rt, response);
            }
        }
        return true;
    }

}
