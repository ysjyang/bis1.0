/**
 * @Title: SysCache.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-11  钟毅
 */
 

package gov.mof.fasp2.bis.cache;

import gov.mof.fasp2.bis.util.BisUtil;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * @ClassName: SysCache
 * @Description: Description of this class
 * @author <a href="mailto:zhongyi@szlongtu.com">钟毅</a>于 2016-5-11 上午07:19:06
 */

public class VerifyCodeCache {
    
    
    private static Map<String, Long> verifycodecache = new HashMap<String, Long>();
    /**
     * 获取验证码.
     * @return
     * @throws
     */
    public static String getVerifyCode(){
        return getOrCheckOrClear("",(long)0,2);
    }
    /**
     *校验验证码.
     * @throws
     */
    public synchronized static boolean checkVerifyCode(String verifycode){
        return "true".equals(getOrCheckOrClear(verifycode,(long)0,1));
    }
    
   
    /**
     * 清理掉time毫秒之前的所有验证码
     * @param time
     * @throws
     */
    public synchronized static void clearVerifyCode(Long time){
        getOrCheckOrClear("",time,3);
    }
    
    
    
    private synchronized static String getOrCheckOrClear(String verifycode,Long time,int type){
        String rt = null;
        if(type==1){//校验逻辑
            rt = ""+private_checkVerifyCode(verifycode);
        }else if(type==2){//获得逻辑
            rt = private_getVerifyCode();
        }else if(type==3){//清理逻辑
            private_clearVerifyCode(time);
        }
        return rt;
    }
    /**
     * 获取验证码.
     * @return
     * @throws
     */
    private static String private_getVerifyCode(){
        String verifycode = BisUtil.getUUID();
        VerifyCodeCache.verifycodecache.put(verifycode, (new Date()).getTime());
        return verifycode;
    }
    /**
     *校验验证码.
     * @throws
     */
    private static boolean private_checkVerifyCode(String verifycode){
        if(VerifyCodeCache.verifycodecache.containsKey(verifycode)){
            VerifyCodeCache.verifycodecache.remove(verifycode);
            return true;
        }else{
            return false;
        }
    }
    /**
     * 清理掉time毫秒之前的所有验证码
     * @param time
     * @throws
     */
    private static void private_clearVerifyCode(Long time){
        Date d = new Date();
        Long nowtime = d.getTime();
        Long keytime = null;
        Map.Entry me = null;
        Iterator iterator = VerifyCodeCache.verifycodecache.entrySet().iterator();
        List keylist = new ArrayList();
        
        try {
            while(iterator.hasNext()){
                me = (Map.Entry)iterator.next();
                keytime = (Long)me.getValue();
                if(keytime+time<nowtime){
                    keylist.add(me.getKey());
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        for(int i=0;i<keylist.size();i++){
            try {
                VerifyCodeCache.verifycodecache.remove(keylist.get(i));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        System.out.println("Clean out expired verifycode "+keylist.size()+", there are "+VerifyCodeCache.verifycodecache.size()+" valid verifycode. time:"+new Date());
    }
    
    public static void refreshVerifyCodeCache(){
        VerifyCodeCache.verifycodecache = new HashMap();
    }
    
    public static void main(String[] args) {
        String code1 = VerifyCodeCache.getVerifyCode();
        String code2 = VerifyCodeCache.getVerifyCode();
        String code3 = VerifyCodeCache.getVerifyCode();
        System.out.println(code1+"+++"+code2+"+++"+code3);
        VerifyCodeCache.clearVerifyCode((long)100);
        VerifyCodeCache.refreshVerifyCodeCache();
        System.out.println(VerifyCodeCache.checkVerifyCode(code1));
        System.out.println(VerifyCodeCache.checkVerifyCode(code2));
        System.out.println(VerifyCodeCache.checkVerifyCode(code3));
        System.out.println(VerifyCodeCache.checkVerifyCode(code1));
        System.out.println(VerifyCodeCache.checkVerifyCode(code2));
        System.out.println(VerifyCodeCache.checkVerifyCode(code3));
        
        
    }
    

}
