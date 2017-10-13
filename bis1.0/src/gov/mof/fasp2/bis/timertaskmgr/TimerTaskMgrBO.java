/**
 * @Title: TimerTaskMgrBO.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-6-1  胡川
 */
 

package gov.mof.fasp2.bis.timertaskmgr;

import gov.mof.fasp2.bis.timer.BisTimer;

import java.util.List;

/**
 * @ClassName: TimerTaskMgrBO
 * @Description: Description of this class
 * @author <a href="mailto:huchuan@szlongtu.com">胡川</a>于 2016-6-1 下午5:17:20
 */

public class TimerTaskMgrBO {
    private TimerTaskMgrDAO timerTaskMgrDAO;
    

    public TimerTaskMgrDAO getTimerTaskMgrDAO() {
        return timerTaskMgrDAO;
    }


    public void setTimerTaskMgrDAO(TimerTaskMgrDAO timerTaskMgrDAO) {
        this.timerTaskMgrDAO = timerTaskMgrDAO;
    }


    /**
     * @return
     * @throws
     */
    public List getAllTimerTasks() {
        return timerTaskMgrDAO.findAllTimerTasks();
    }


    /**
     * @param code
     * @return
     * @throws
     */
    public String runTask(String code) {
//        try {
//            BisTimer.startTimerTask(code);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
        return "success";
    }


    /**
     * @param code
     * @return
     * @throws
     */
    public String enableTask(String code) {
        Integer status = 1;
        timerTaskMgrDAO.updateStatus(code,status);
        return "success";
    }


    /**
     * @param code
     * @return
     * @throws
     */
    public String disableTask(String code) {
        Integer status = 0;
        timerTaskMgrDAO.updateStatus(code,status);
        return "success";
    }

}
