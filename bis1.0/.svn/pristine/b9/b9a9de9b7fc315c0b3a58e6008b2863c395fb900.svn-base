package gov.mof.fasp2.bis.timer;
import gov.mof.fasp2.bis.common.CommonDAO;
import gov.mof.fasp2.bis.factory.ServiceFactory;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

import javax.servlet.ServletException;

/**
 * @Title: BisTimer.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-20  钟毅
 */

/**
 * @ClassName: BisTimer
 * @Description: Description of this class
 * @author <a href="mailto:zhongyi@szlongtu.com">钟毅</a>于 2016-5-20 上午09:17:47
 */

public class BisTimer {
    
    private static final Timer timer = new Timer();
    private static final Map timermap = new HashMap();
    
    public static SimpleDateFormat sdf14 = new SimpleDateFormat("yyyyMMddHHmmss");//14位字符串长度的date格式化
    
    public static void startAllTimerTask() throws Exception{
        List l = BisTimer.getAllTimerTaskConfig();
        Map timerTaskConfig = null;
        for(int i=0;i<l.size();i++){
            timerTaskConfig =(Map)l.get(i);
            BisTimer.startTimerTask(timerTaskConfig);
        }
    }
    
    /**
     * 运行一次任务
     * @param timertaskcode
     * @throws Exception
     * @throws
     */
    public static void runTimerTask(String timertaskcode) throws Exception{
        Map timerTaskConfig = getTimerTaskConfig(timertaskcode);
        String timertaskclass = (String)timerTaskConfig.get("timertaskclass");
        TimerTask task = BisTimer.getTimerTaskObject(timertaskclass);
        task.run();
    }
    
    public static synchronized void stopTimerTask(String timertaskcode) throws Exception{
        if(timermap.containsKey(timertaskcode)){
            TimerTask task= (TimerTask)timermap.get(timertaskcode);
            task.cancel();
            timer.purge();
            timermap.remove(timertaskcode);
        }
    }
    public static synchronized void startTimerTask(String timertaskcode) throws Exception{
        if(!timermap.containsKey(timertaskcode)){
            Map timerTaskConfig = BisTimer.getTimerTaskConfig(timertaskcode);
            BisTimer.startTimerTask(timerTaskConfig);
        }
    }
    
    /**
     * 开始定时任务
     * @param timertaskcode
     * @return turn 成功，false 已运行。
     * @throws Exception
     * @throws
     */
    public static synchronized boolean startTimerTask(Map timerTaskConfig) throws Exception{
        
        String timertaskcode = (String)timerTaskConfig.get("timertaskcode");
        if(timermap.containsKey(timertaskcode)){//定时器已经运行。
            return false;
        }
        String timertaskclass = (String)timerTaskConfig.get("timertaskclass");
        final int timertasktype = ((Number) timerTaskConfig.get("timertasktype")).intValue();
        final String dateparameter = (String)timerTaskConfig.get("dateparameter");
        long delayparameter = ((Number) timerTaskConfig.get("delayparameter")).longValue();//延时时间
        long periodparameter = ((Number) timerTaskConfig.get("periodparameter")).longValue();//间隔时间
        
        final TimerTask task = BisTimer.getTimerTaskObject(timertaskclass);
        if(timertasktype==1){
            Date time = sdf14.parse(dateparameter);
            timermap.put(timertaskcode, task);
            timer.schedule(task, time);
        }else if(timertasktype==2){
            Date time = sdf14.parse(dateparameter);
            timermap.put(timertaskcode, task);
            timer.schedule(task, time, periodparameter);
        }else if(timertasktype==3){
            timermap.put(timertaskcode, task);
            timer.schedule(task, delayparameter);
        }else if(timertasktype==4){
            timermap.put(timertaskcode, task);
            timer.schedule(task, delayparameter, periodparameter);
        }else if(timertasktype==5){
            timermap.put(timertaskcode, task);
            Date time = sdf14.parse(dateparameter);
            timer.scheduleAtFixedRate(task, time, periodparameter);
        }else if(timertasktype==6){
            timermap.put(timertaskcode, task);
            timer.scheduleAtFixedRate(task, delayparameter, periodparameter);
        }else if(timertasktype==7){//每月    精确到1小时
            TimerTask tt = new TimerTask(){
                public void run() {
                    try {
                        if(isRunTimerTask(dateparameter,timertasktype)){
                            task.run();
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }};
            timermap.put(timertaskcode, tt);
            timer.schedule(tt, 1000, 3600000);
        }else if(timertasktype==8){//每周    精确到1小时
            TimerTask tt = new TimerTask(){
                public void run() {
                    try {
                        if(isRunTimerTask(dateparameter,timertasktype)){
                            task.run();
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }};
            timermap.put(timertaskcode, tt);
            timer.schedule(tt, 1000, 3600000);
        }else if(timertasktype==9){//每天   精确到1小时
            TimerTask tt = new TimerTask(){
                public void run() {
                    try {
                        if(isRunTimerTask(dateparameter,timertasktype)){
                            task.run();
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }};
            timermap.put(timertaskcode, tt);
            timer.schedule(tt, 1000, 3600000);
        }else if(timertasktype==10){//每小时  精确到1分钟
            TimerTask tt = new TimerTask(){
                public void run() {
                    try {
                        if(isRunTimerTask(dateparameter,timertasktype)){
                            task.run();
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }};
            timermap.put(timertaskcode, tt);
            timer.schedule(tt, 1000, 60000);
        }
        return true;
    }
    /**
     * 
     * @param dateparameter
     * @param period
     * @param timertasktype 
     * @return
     * @throws Exception
     * @throws
     */
    private static boolean isRunTimerTask(String dateparameter,int timertasktype) throws Exception{
        Calendar date = Calendar.getInstance();
        Date time = sdf14.parse(dateparameter);
        date.setTime(time);
        int dw1 = date.get(Calendar.DAY_OF_WEEK);
        int day1 = date.get(Calendar.DAY_OF_MONTH);
        int hour1 = date.get(Calendar.HOUR_OF_DAY);
        int minute1 = date.get(Calendar.MINUTE);
        
        Calendar rightNow = Calendar.getInstance();
        int dw2 = rightNow.get(Calendar.DAY_OF_WEEK);
        int day2 = rightNow.get(Calendar.DAY_OF_MONTH);
        int hour2 = rightNow.get(Calendar.HOUR_OF_DAY);
        int minute2 = rightNow.get(Calendar.MINUTE);
        
        if(timertasktype==7){ //每月 精确到1小时
            if(day1==day2&&hour1==hour2){
                return true;
            }
        }else if(timertasktype==8){ //每周 精确到1小时
            if(dw1==dw2&&hour1==hour2){
                return true;
            } 
        }else if(timertasktype==9){ //每天 精确到1小时
            if(hour1==hour2){ //
                return true;
            } 
        }else if(timertasktype==10){ //每小时  精确到1分钟
            if(minute1==minute2){
                return true;
            }
        }
//        System.out.println("=timertasktype="+timertasktype+" minute1="+minute1+" minute2="+minute2);
        return false;
    }
    
    private static TimerTask getTimerTaskObject(String timertaskclass) throws Exception{
        TimerTask tt = null;
        Class c = null;
        c = Class.forName(timertaskclass);
        tt = (TimerTask)c.newInstance();
        return tt;
    }
    
    private static Map getTimerTaskConfig(String timertaskcode){
        Map m = null;
        CommonDAO dao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
        List l = dao.queryForList("select * from bis_t_timertask t where t.status=1 and t.timertaskcode='"+timertaskcode+"'");
        m = (Map)l.get(0);
        return m;
    }
    
    private static List getAllTimerTaskConfig(){
        List l = null;
        CommonDAO dao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
        l = dao.queryForList("select * from bis_t_timertask t where t.status=1");
        return l;
    }

}
