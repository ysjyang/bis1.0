/**
 * @Title: TimerTaskMgrDAO.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-6-1  胡川
 */
 

package gov.mof.fasp2.bis.timertaskmgr;

import gov.mof.fasp2.bis.common.CommonDAO;

import java.util.List;

/**
 * @ClassName: TimerTaskMgrDAO
 * @Description: Description of this class
 * @author <a href="mailto:huchuan@szlongtu.com">胡川</a>于 2016-6-1 下午5:17:29
 */

public class TimerTaskMgrDAO {
    private CommonDAO commonDao;
    
    public CommonDAO getCommonDao() {
        return commonDao;
    }

    public void setCommonDao(CommonDAO commonDao) {
        this.commonDao = commonDao;
    }

    /**
     * 查询所有的定时任务
     * @return
     * @throws
     */
    public List findAllTimerTasks() {
        String sql = "select * from bis_t_timertask";
        return commonDao.queryForList(sql);
    }

    /**
     * @param code
     * @param status
     * @throws
     */
    public void updateStatus(String code, Integer status) {
        String sql = "update bis_t_timertask set status=? where timertaskcode=?";
        commonDao.updateData(sql, new Object[]{status,code});
    }

}
