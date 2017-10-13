/**
 * @Title: BisUtil.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-11  钟毅
 */
 

package gov.mof.fasp2.bis.util;

import gov.mof.fasp2.bis.json.JSONArray;
import gov.mof.fasp2.bis.json.JSONException;
import gov.mof.fasp2.bis.json.JSONObject;
import gov.mof.fasp2.bis.json.JSONUtil;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @ClassName: BisUtil
 * @Description: Description of this class
 * @author <a href="mailto:zhongyi@szlongtu.com">钟毅</a> 2016-5-11 12:03:38
 */

public class BisUtil {
    
    public static SimpleDateFormat sdf23 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss SSS");//23位字符串长度的date格式化
    public static SimpleDateFormat sdf19 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//19位字符串长度的date格式化
    public static SimpleDateFormat sdf17 = new SimpleDateFormat("yyyyMMddHHmmssSSS");//17位字符串长度的date格式化
    public static SimpleDateFormat sdf10 = new SimpleDateFormat("yyyy-MM-dd");//10位字符串长度的date格式化
    public static SimpleDateFormat sdf8 = new SimpleDateFormat("yyyyMMdd");//8位字符串长度的date格式化
    
    public static Map jsonToMap(String json,Map template) throws JSONException
    {
        return (Map)JSONUtil.JSONToObject(json,template);
    }
    public static List jsonToList(String json,Map template) throws JSONException
    {
        return (List)JSONUtil.JSONToObject(json,template);
    }
    public static Object jsonToObject(String json,Map template) throws JSONException
    {
        return JSONUtil.JSONToObject(json,template);
    }
    public static Map jsonToMap(String json) throws JSONException
    {
        return (Map)JSONUtil.JSONToObject(json);
    }
    public static List jsonToList(String json) throws JSONException
    {
        return (List)JSONUtil.JSONToObject(json);
    }
    public static Object jsonToObject(String json) throws JSONException
    {
        return JSONUtil.JSONToObject(json);
    }
    
    public static String objectToJson(Object obj)
    {
        if(obj!=null)
        {
            if(obj instanceof Map){
                JSONObject jo = new JSONObject((Map)obj);
                return jo.toString();
            }else if(obj instanceof Collection){
                JSONArray jo = new JSONArray((Collection)obj);
                return jo.toString();
            }
        }
        return null;
    }
    
    public static void ajaxPrint(String info,HttpServletResponse response) throws Exception
    {
        response.setContentType( "text/html;charset=utf-8 ");
        response.getWriter().print(info);
        response.getWriter().flush();
    }
    
    /**
     * 克隆HashMap 
     * 该方法只针对 字符串 数字 时间 三种对象克隆，其他对象克隆为NULL
     * @param clonehm
     * @return
     */
    public static HashMap cloneHashMap(HashMap clonehm)
    {
        if(clonehm==null)return null;
        HashMap hm = new HashMap();
        Iterator iterator = clonehm.keySet().iterator();
        Object key = null;
        Object value = null;
        while(iterator.hasNext())
        {
            key = iterator.next();
            value = clonehm.get(key);
            if(value==null)
            {
                hm.put(key, null);
            }
            else if(value instanceof String)
            {
                hm.put(key, new String((String)value));
            }
            else if(value instanceof Number)
            {
                if(value instanceof BigDecimal)
                {
                    hm.put(key, new BigDecimal(((BigDecimal)value).doubleValue()));
                }
                else if(value instanceof Integer)
                {
                    hm.put(key, new Integer(((Number)value).intValue()));
                }
                else if(value instanceof Double)
                {
                    hm.put(key, new Double(((Number)value).doubleValue()));
                }
                else if(value instanceof Long)
                {
                    hm.put(key, new Long(((Number)value).longValue()));
                }
                else if(value instanceof Float)
                {
                    hm.put(key, new Float(((Number)value).floatValue()));
                }
                else if(value instanceof Short)
                {
                    hm.put(key, new Short(((Number)value).shortValue()));
                }
                else
                {
                    hm.put(key, new Integer(0));
                }
            }
            else if(value instanceof Date)
            {
                hm.put(key, new Date(((Date)value).getTime()));
            }
            else
            {
                hm.put(key, null);
            }
        }
        
        return hm;
    }
    
    /** 
     *  
     * @param year 
     *            int 年份 
     * @param month 
     *            int 月份 
     *  
     * @return int 某年某月的最后一天 
     */  
    public static int getLastDayOfMonth(int year, int month) {  
         month--;
        Calendar cal = Calendar.getInstance();  
        cal.set(Calendar.YEAR, year);  
        cal.set(Calendar.MONTH, month);  
        // 某年某月的最后一aish天  
        return cal.getActualMaximum(Calendar.DATE);  
    } 
    
    public static String objToStringOrNull(Object obj)
    {
        if(obj==null)return null;
        return obj.toString();
    }
    
    public static String objToString(Object obj)
    {
        if(obj==null)return "";
        return obj.toString();
    }
    
    public static int strToInt(String strnum)
    {
        if(strnum==null)return 0;
        else return Integer.parseInt(strnum);
    }
    /**
     * yyyy-MM-dd HH:mm:ss SSS
     * @param date
     * @return
     */
    public static String getDate23(Date date)
    {
        return sdf23.format(date);
    }
    /**
     * yyyyMMddHHmmssSSS
     * @param date
     * @return
     */
    public static String getDate17(Date date){
        return sdf17.format(date);
    }
    /**
     * yyyy-MM-dd HH:mm:ss
     * @param date
     * @return
     */
    public static String getDate19(Date date){
        return sdf19.format(date);
    }
    public static String getCreateTime(){
        return BisUtil.getDate17(new Date());
    }
    /**
     * yyyyMMdd
     * @param date
     * @return
     */
    public static String getDate8(Date date){
        return sdf8.format(date);
    }
    /**
     * yyyyMMdd
     * @return
     */
    public static String getCreateDate(){
        return BisUtil.getDate8(new Date());
    }
    /**
     * yyyy-MM-dd
     * @param datestr8
     * @return
     */
    public static String getCreateDate10(String datestr8){
        String s1 = datestr8.substring(0, 4);
        String s2 = datestr8.substring(4, 6);
        return s1+"-"+s2+"-"+datestr8.substring(6, 8);
    }
    /**
     * yyyy-MM-dd HH:mm:ss
     * @param datetimestr17
     * @return
     */
    public static String getCreateTime19(String datetimestr17){
        String s1 = datetimestr17.substring(0, 4);
        String s2 = datetimestr17.substring(4, 6);
        String s3 = datetimestr17.substring(6, 8);
        String s4 = datetimestr17.substring(8, 10);
        String s5 = datetimestr17.substring(10, 12);
        String s6 = datetimestr17.substring(12, 14);
        return s1+"-"+s2+"-"+s3+" "+s4+":"+s5+":"+s6;
    }
    /**
     * forward到指定位置
     * @param url
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    public static void forward(HttpServletRequest request,HttpServletResponse response,String url) throws ServletException, IOException{
        System.out.println(url);
        request.getRequestDispatcher(url).forward(request, response);
    }
    
    public static String getUUID(){
        UUID uuid = UUID.randomUUID();
        return uuid.toString().replaceAll("-", "");
    }
    
    public static Map listToMap(List list,String key){
        Map rt = new HashMap();
        Map m = null;
        int length = list.size();
        for(int i=0;i<length;i++){
            m = (Map)list.get(i);
            rt.put(m.get(key), m);
        }
        return rt;
    }
    
    
    public static boolean isNULLStr(Object strobj){
        if(strobj==null||"".equals(strobj)){
            return true;
        }
        return false;
    }
    
    public static String exceptionToString(Throwable e){
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw, true);
        e.printStackTrace(pw);
        pw.flush();
        sw.flush();
        return sw.toString();
    }
    public static String exceptionToString(Throwable e,int num){
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw, true);
        e.printStackTrace(pw); 
        pw.flush();
        sw.flush();
        String str = sw.toString().replaceAll("\r|\n", " ");
        if(str.length()>num+1){
            str=str.substring(0,num);
        }
        return ":"+str;
    }
}
