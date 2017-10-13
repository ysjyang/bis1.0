/**
 * @Title: TimerTaskModifyBO.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-6-6  胡川
 */

package gov.mof.fasp2.bis.timertaskmgr;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * @ClassName: TimerTaskModifyBO
 * @Description: Description of this class
 * @author <a href="mailto:huchuan@szlongtu.com">胡川</a>于 2016-6-6 下午4:30:13
 */

public class TimerTaskModifyBO {
    private TimerTaskModifyDAO timerTaskModifyDAO;

    public TimerTaskModifyDAO getTimerTaskModifyDAO() {
        return timerTaskModifyDAO;
    }

    public void setTimerTaskModifyDAO(TimerTaskModifyDAO timerTaskModifyDAO) {
        this.timerTaskModifyDAO = timerTaskModifyDAO;
    }

    /**.
     * 更新 任务类型为（1）的定时任务
     * @param code 任务编码
     * @param status 任务状态
     * @param type  任务类型
     * @param starttime 任务开始时间
     * @return 更新成功返回成功标识
     * @throws
     */
    public String updateTask(String code, String type, String time){
//        //计算出多少毫秒后执行任务 
//        DateFormat fmt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        Date dat = fmt.parse(starttime);
//        Long start = dat.getTime();
//        Long now = System.currentTimeMillis();
//        Long longStarttime = start - now;
        //生成备注
        if("1".equals(type)){
            
            StringBuilder sb = new StringBuilder();
            String year = time.substring(0,4);
            String month = time.substring(4, 6);
            String day = time.substring(6, 8);
            String hour = time.substring(8, 10);
            String minute = time.substring(10, 12);
            String second = time.substring(12);
            sb.append("任务执行时间为：").append(year).append("年").append(month).append("月").append(day).append("日");
            sb.append(" ").append(hour).append(":").append(minute).append(":").append(second).append(",只执行一次");
           timerTaskModifyDAO.updateTask(code,type,time,sb.toString());
        }
        if("3".equals(type)){
            
            StringBuilder sb = new StringBuilder();
            Long now = System.currentTimeMillis();
            Long starttimel = now + Long.parseLong(time); 
            Date dat = new Date(starttimel);
            
            DateFormat fmt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String starttimes = fmt.format(dat);
            sb.append("任务执行时间为：").append(starttimes).append(",只执行一次");
            timerTaskModifyDAO.updateTask(code,type,starttimel,sb.toString());
        }
        
        return "success";
    }

    /**
     * 更新任务类型为（7）(8)的定时任务
     * @param code 任务编码
     * @param status 任务状态
     * @param type 任务类型
     * @param dayOrWeek 日或周几
     * @param hour 时
     * @param minute 分
     * @param second 秒
     * @return 更新成功标识
     * @throws
     */
    public String updateTask(String code, String type, String dayOrWeek, String hour, String minute,
            String second) {
        if("7".equals(type)){
            
            //生成备注
            StringBuilder sb = new StringBuilder();
            sb.append("任务执行时间为：每月").append(dayOrWeek).append("日").append(hour).append("点");
            sb.append(minute).append("分").append(second).append("秒");
            timerTaskModifyDAO.updateTask(code,type,sb.toString());
        }
        if("8".equals(type)){
            //生成备注
            StringBuilder sb = new StringBuilder();
            sb.append("任务执行时间为：每周").append(dayOrWeek).append(" ").append(hour).append("点");
            sb.append(minute).append("分").append(second).append("秒");
            timerTaskModifyDAO.updateTask(code,type,sb.toString());
        }
        
        return "success";
    }

    /**
     * @param code
     * @param type
     * @param hour
     * @param minute
     * @param second
     * @return
     * @throws
     */
    public String updateTask(String code, String type, String hour, String minute, String second) {
        //生成备注
        StringBuilder sb = new StringBuilder();
        sb.append("任务执行时间为：每天").append(hour).append("点");
        sb.append(minute).append("分").append(second).append("秒");
        timerTaskModifyDAO.updateTask(code,type,sb.toString());
        return "success";
    }

    /**
     * @param code
     * @param type
     * @param minute
     * @param second
     * @return
     * @throws
     */
    public String updateTask(String code, String type, String parm1, String parm2) {
        if("2".equals(type)||"5".equals(type)){
            
            StringBuilder sb = new StringBuilder();
            String year = parm1.substring(0,4);
            String month = parm1.substring(4, 6);
            String day = parm1.substring(6, 8);
            String hour = parm1.substring(8, 10);
            String minute = parm1.substring(10, 12);
            String second = parm1.substring(12);
            sb.append("任务开始时间为：").append(year).append("年").append(month).append("月").append(day).append("日");
            sb.append(" ").append(hour).append(":").append(minute).append(":").append(second);
            if("2".equals(type)){
                sb.append(",等任务执行完后，每隔").append(parm2).append("毫秒将再次执行任务");
            }
            if("5".equals(type)){
                sb.append(",然后每隔").append(parm2).append("毫秒将再次执行任务");
            }
            timerTaskModifyDAO.updateTask(code,type,parm1,parm2,sb.toString());
        }
        if("4".equals(type) || "6".equals(type)){
            
            Long now = System.currentTimeMillis();
            Long starttimel = now + Long.parseLong(parm1); 
            Date dat = new Date(starttimel);
            
            DateFormat fmt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String starttimes = fmt.format(dat);
            
            StringBuilder sb = new StringBuilder();
            sb.append("任务开始时间为：").append(starttimes);
           
            if("4".equals(type)){
                sb.append(",等任务执行完后，每隔").append(parm2).append("毫秒将再次执行任务");
            }
            if("6".equals(type)){
                sb.append(",然后每隔").append(parm2).append("毫秒将再次执行任务");
            }
            
            timerTaskModifyDAO.updateTask(code,type,parm1,parm2,sb.toString());
        }
        if("10".equals(type)){
            //生成备注
            StringBuilder sb = new StringBuilder();
            sb.append("任务执行时间为：每小时").append(parm1).append("分").append(parm2).append("秒");
            
            timerTaskModifyDAO.updateTask(code,type,parm1+parm2,sb.toString());
        }
        return "success";
    }

}
