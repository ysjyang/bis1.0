/**
 * @Title: TimerTaskMgrAction.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-6-1  胡川
 */
 

package gov.mof.fasp2.bis.timertaskmgr;

import gov.mof.fasp2.bis.common.IAction;
import gov.mof.fasp2.bis.util.BisUtil;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @ClassName: TimerTaskMgrAction
 * @Description: 定时任务管理类
 * @author <a href="mailto:huchuan@szlongtu.com">胡川</a>于 2016-6-1 下午4:50:22
 */

public class TimerTaskMgrAction implements IAction{
    private TimerTaskMgrBO timerTaskMgrBO;


    public TimerTaskMgrBO getTimerTaskMgrBO() {
        return timerTaskMgrBO;
    }


    public void setTimerTaskMgrBO(TimerTaskMgrBO timerTaskMgrBO) {
        this.timerTaskMgrBO = timerTaskMgrBO;
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
            //获取操作类型
            String type = request.getParameter("type");
            String code = request.getParameter("code");
            //查询所有任务
            if("getTask".equals(type)){
                List timertasks = timerTaskMgrBO.getAllTimerTasks();
                BisUtil.ajaxPrint(BisUtil.objectToJson(timertasks), response);
            }
            //执行任务
            if("runTask".equals(type)){
                String rt = timerTaskMgrBO.runTask(code);
                BisUtil.ajaxPrint(rt, response);
            }
            //编辑任务
            if("editTask".equals(type)){
                
            }
            //启用任务
            if("enableTask".equals(type)){
                String rt = timerTaskMgrBO.enableTask(code);
                BisUtil.ajaxPrint(rt, response);
            }
            //停用任务
            if("disableTask".equals(type)){
                String rt = timerTaskMgrBO.disableTask(code);
                BisUtil.ajaxPrint(rt, response);
            }
            
        }
        return true;
    }
    
}
