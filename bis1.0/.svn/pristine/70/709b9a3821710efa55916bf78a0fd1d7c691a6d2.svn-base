/**
 * @Title: TimerTaskModifyDAO.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-6-6  胡川
 */
 

package gov.mof.fasp2.bis.timertaskmgr;

import gov.mof.fasp2.bis.common.CommonDAO;

import java.util.List;

/**
 * @ClassName: TimerTaskModifyDAO
 * @Description: Description of this class
 * @author <a href="mailto:huchuan@szlongtu.com">胡川</a>于 2016-6-6 下午4:30:26
 */

public class TimerTaskModifyDAO {
    private CommonDAO commonDAO;
    
    public CommonDAO getCommonDAO() {
        return commonDAO;
    }

    public void setCommonDAO(CommonDAO commonDAO) {
        this.commonDAO = commonDAO;
    }

    /**.
     * 编辑任务类型为（1）的定时任务
     * @param code 任务编码
     * @param type 任务类型
     * @param starttime 任务开始时间
     * @param sb 备注
     * @throws
     */
    public void updateTask(String code, String type, String starttime, String sb) {
        String sql = "update bis_t_timertask set timertasktype=?,dateparameter=?,remark=? where timertaskcode=?";
        commonDAO.updateData(sql, new Object[]{type,starttime,sb,code});
    }

    /**
     * 编辑任务类型为（3）的定时任务
     * @param code 任务编码
     * @param type 任务类型
     * @param starttimel 延迟时间
     * @param string 备注
     * @throws
     */
    public void updateTask(String code, String type, Long delaytime, String string) {
        String sql = "update bis_t_timertask set timertasktype=?,delayparameter=?,remark=? where timertaskcode=?";
        commonDAO.updateData(sql, new Object[]{type,delaytime,string,code});
    }

    /**
     * 编辑任务类型为（7）的定时任务
     * @param code 任务编码
     * @param type 任务类型
     * @param string 备注
     * @throws
     */
    public void updateTask(String code, String type, String string) {
        String sql = "update bis_t_timertask set timertasktype=?,remark=? where timertaskcode=?";
        commonDAO.updateData(sql, new Object[]{type,string,code});
    }
    
    /**
     * (2)(10)
     * @param code
     * @param type
     * @param parm1
     * @param parm2
     * @param string
     * @throws
     */
    public void updateTask(String code, String type, String parm1, String parm2, String string) {
        if("2".equals(type)||"5".equals(type)){
            String sql = "update bis_t_timertask set timertasktype=?,dateparameter=?,periodparameter=?,remark=? where timertaskcode=?";
            commonDAO.updateData(sql, new Object[]{type,parm1,parm2,string,code});
        }
        if("4".equals(type)||"6".equals(type)){
            String sql = "update bis_t_timertask set timertasktype=?,delayparameter=?,periodparameter=?,remark=? where timertaskcode=?";
            commonDAO.updateData(sql, new Object[]{type,parm1,parm2,string,code});
        }
    }

}
