/**
 * @Title: SysCache.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-11  钟毅
 */
 

package gov.mof.fasp2.bis.cache;

import gov.mof.fasp2.bis.common.CommonDAO;
import gov.mof.fasp2.bis.factory.ServiceFactory;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @ClassName: SysCache
 * @Description: Description of this class
 * @author <a href="mailto:zhongyi@szlongtu.com">钟毅</a>于 2016-5-11 上午07:19:06
 */

public class SysCache {
    
    /**
     * REQUESTCONFIG 缓存key
     */
    public static final String KEY_REQUESTCONFIG = "REQUESTCONFIG";
    /**
     * BUSTYPE 缓存key
     */
    public static final String KEY_BUSTYPE = "BUSTYPE";
    /**
     * 系统表key
     */
    public static final String KEY_TABLECOLUMNS = "TABLECOLUMNS";
    
    /**
     * 用户名密码key
     */
    public static final String KEY_USERNAME_PASSWORD = "USERNAME_PASSWORD";
    /**
     * 错误编码key
     */
    public static final String KEY_ERRORNO = "ERRORNO";
    /**
     * 业务类型设置key
     */
    public static final String KEY_BUSTYPECONFIG = "BUSTYPECONFIG";
    /**
     * 财政区划对照key1
     */
    public static final String KEY_PROVINCECODE = "PROVINCECODE";
    /**
     * 财政区划对照key2
     */
    public static final String KEY_ADMDIVGBCODE = "ADMDIVGBCODE";
    /**
     * 系统配置key
     */
    public static final String KEY_SYSTEMSET = "SYSTEMSET";
    /**
     * IP地址key
     */
    public static final String KEY_IPADDRESS = "IPADDRESS";
    
    private static Map syscache = new HashMap();
    /**
     * 获取RequestConfigCache.
     * @return
     * @throws
     */
    public static Map getRequestConfigCache(){
        Map cachemap = (Map)SysCache.syscache.get(SysCache.KEY_REQUESTCONFIG);
        if(cachemap==null){
            SysCache.queryRequestConfigCache();
            cachemap = (Map)SysCache.syscache.get(SysCache.KEY_REQUESTCONFIG);
        }
        return cachemap;
    }
    /**
     * 加载RequestConfigCache.
     * @throws
     */
    public synchronized static void queryRequestConfigCache(){
        Map cachemap = (Map)SysCache.syscache.get(SysCache.KEY_REQUESTCONFIG);
        if(cachemap==null){
            CommonDAO dao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
            List l = dao.queryForList("SELECT * FROM BIS_T_REQUESTCONFIG");
            cachemap = new HashMap();
            if(l!=null&&l.size()!=0){
                Map m = null;
                for(int i=0;i<l.size();i++){
                    m = (Map)l.get(i);
                    cachemap.put(m.get("url").toString().toLowerCase(), m);
                }
            }
            SysCache.syscache.put(SysCache.KEY_REQUESTCONFIG, cachemap);
        }
    }
    
    /**
     * 获取RequestConfigCache.
     * @return
     * @throws
     */
    public static Map getBustypeCache(){
        Map cachemap = (Map)SysCache.syscache.get(SysCache.KEY_BUSTYPE);
        if(cachemap==null){
            SysCache.queryBustypeCache();
            cachemap = (Map)SysCache.syscache.get(SysCache.KEY_BUSTYPE);
        }
        return cachemap;
    }
    /**
     * 加载RequestConfigCache.
     * @throws
     */
    public synchronized static void queryBustypeCache(){
        Map cachemap = (Map)SysCache.syscache.get(SysCache.KEY_BUSTYPE);
        if(cachemap==null){
            CommonDAO dao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
            List l = dao.queryForList("SELECT * FROM BIS_T_BUSTYPE");
            cachemap = new HashMap();
            if(l!=null&&l.size()!=0){
                Map m = null;
                for(int i=0;i<l.size();i++){
                    m = (Map)l.get(i);
                    cachemap.put(m.get("code"), m);
                }
            }
            SysCache.syscache.put(SysCache.KEY_BUSTYPE, cachemap);
        }
    }
    
    /**
     * 获取TableColumns.
     * @return
     * @throws
     */
    public static List getTableColumnsCache(String tablecode){
        Map cachemap = (Map)SysCache.syscache.get(SysCache.KEY_TABLECOLUMNS);
        if(cachemap==null){
            SysCache.queryTableColumnsCache(tablecode);
            cachemap = (Map)SysCache.syscache.get(SysCache.KEY_TABLECOLUMNS);
        }
        List tablecolumns = null;
        tablecolumns = (List)cachemap.get(tablecode);
        if(tablecolumns==null){
            SysCache.queryTableColumnsCache(tablecode);
            tablecolumns = (List)cachemap.get(tablecode);
        }
        return tablecolumns;
    }
    /**
     * 加载TableColumns.
     * @throws
     */
    public synchronized static void queryTableColumnsCache(String tablecode){
        Map cachemap = (Map)SysCache.syscache.get(SysCache.KEY_TABLECOLUMNS);
        if(cachemap==null){
            cachemap = new HashMap();
        }
        Map table = null;
        table = (Map)cachemap.get(tablecode);
        if(table==null){
            CommonDAO dao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
            List l = dao.queryForList("SELECT T.TABLE_NAME,T.COLUMN_NAME,T.DATA_TYPE FROM USER_TAB_COLUMNS T WHERE T.TABLE_NAME='"+tablecode.toUpperCase()+"'");
            if(l!=null&&l.size()!=0){
                cachemap.put(tablecode, l);
            }
            SysCache.syscache.put(SysCache.KEY_TABLECOLUMNS, cachemap);
        }
    }
    
    /**
     * 获取RequestConfigCache.
     * @return
     * @throws
     */
    public static Map getUserNameCache(){
        Map cachemap = (Map)SysCache.syscache.get(SysCache.KEY_USERNAME_PASSWORD);
        if(cachemap==null){
            SysCache.queryUserNameCache();
            cachemap = (Map)SysCache.syscache.get(SysCache.KEY_USERNAME_PASSWORD);
        }
        return cachemap;
    }
    /**
     * 加载RequestConfigCache.
     * @throws
     */
    public synchronized static void queryUserNameCache(){
        Map cachemap = (Map)SysCache.syscache.get(SysCache.KEY_USERNAME_PASSWORD);
        if(cachemap==null){
            CommonDAO dao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
            List l = dao.queryForList("SELECT T.CODE,T.NAME,T.PASSWORD FROM BIS_T_USER T WHERE T.USERTYPE = 2");
            cachemap = new HashMap();
            if(l!=null&&l.size()!=0){
                Map m = null;
                for(int i=0;i<l.size();i++){
                    m = (Map)l.get(i);
                    cachemap.put(m.get("code"), m.get("password"));
                }
            }
            SysCache.syscache.put(SysCache.KEY_USERNAME_PASSWORD, cachemap);
        }
    } 
    
    /**
     * 获取RequestConfigCache.
     * @return
     * @throws
     */
    public static Map getErrorNoCache(){
        Map cachemap = (Map)SysCache.syscache.get(SysCache.KEY_ERRORNO);
        if(cachemap==null){
            SysCache.queryErrorNoCache();
            cachemap = (Map)SysCache.syscache.get(SysCache.KEY_ERRORNO);
        }
        return cachemap;
    }
    /**
     * 加载RequestConfigCache.
     * @throws
     */
    public synchronized static void queryErrorNoCache(){
        Map cachemap = (Map)SysCache.syscache.get(SysCache.KEY_ERRORNO);
        if(cachemap==null){
            CommonDAO dao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
            List l = dao.queryForList("select t.errorno,t.errormsg from bis_t_errorno t");
            cachemap = new HashMap();
            if(l!=null&&l.size()!=0){
                Map m = null;
                for(int i=0;i<l.size();i++){
                    m = (Map)l.get(i);
                    cachemap.put(m.get("errorno"), m.get("errormsg"));
                }
            }
            SysCache.syscache.put(SysCache.KEY_ERRORNO, cachemap);
        }
    }
    
    /**
     * 获取RequestConfigCache.
     * @return
     * @throws
     */
    public static Map getBustypeConfigCache(){
        Map cachemap = (Map)SysCache.syscache.get(SysCache.KEY_BUSTYPECONFIG);
        if(cachemap==null){
            SysCache.queryBustypeConfigCache();
            cachemap = (Map)SysCache.syscache.get(SysCache.KEY_BUSTYPECONFIG);
        }
        return cachemap;
    }
    /**
     * 加载RequestConfigCache.
     * @throws
     */
    public synchronized static void queryBustypeConfigCache(){
        Map cachemap = (Map)SysCache.syscache.get(SysCache.KEY_BUSTYPECONFIG);
        if(cachemap==null){
            CommonDAO dao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
            List l = dao.queryForList("SELECT t.bustype,t.province,t.isuse,nvl(t.maxdatasnum,0) maxdatasnum FROM BIS_T_BUSTYPECONFIG t");
            cachemap = new HashMap();
            if(l!=null&&l.size()!=0){
                Map m = null;
                for(int i=0;i<l.size();i++){
                    m = (Map)l.get(i);
                    cachemap.put(m.get("bustype")+"-"+m.get("province")+"-"+m.get("isuse"), m.get("maxdatasnum"));
                }
            }
            SysCache.syscache.put(SysCache.KEY_BUSTYPECONFIG, cachemap);
        }
    }
    
    /**
     * 获取RequestConfigCache.
     * @return
     * @throws
     */
    public static Map getProvinceCodeCache(){
        Map cachemap = (Map)SysCache.syscache.get(SysCache.KEY_PROVINCECODE);
        if(cachemap==null){
            SysCache.queryProvinceCodeCache();
            cachemap = (Map)SysCache.syscache.get(SysCache.KEY_PROVINCECODE);
        }
        return cachemap;
    }
    /**
     * 加载RequestConfigCache.
     * @throws
     */
    public synchronized static void queryProvinceCodeCache(){
        Map cachemap = (Map)SysCache.syscache.get(SysCache.KEY_PROVINCECODE);
        if(cachemap==null){
            CommonDAO dao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
            List l = dao.queryForList("select code，admdivgbcode from bis_t_province");
            cachemap = new HashMap();
            if(l!=null&&l.size()!=0){
                Map m = null;
                for(int i=0;i<l.size();i++){
                    m = (Map)l.get(i);
                    cachemap.put(m.get("code"), m.get("admdivgbcode"));
                }
            }
            SysCache.syscache.put(SysCache.KEY_PROVINCECODE, cachemap);
        }
    }
    
    /**
     * 获取RequestConfigCache.
     * @return
     * @throws
     */
    public static Map getAdmdivgbCodeCache(){
        Map cachemap = (Map)SysCache.syscache.get(SysCache.KEY_ADMDIVGBCODE);
        if(cachemap==null){
            SysCache.queryAdmdivgbCodeCache();
            cachemap = (Map)SysCache.syscache.get(SysCache.KEY_ADMDIVGBCODE);
        }
        return cachemap;
    }
    /**
     * 加载RequestConfigCache.
     * @throws
     */
    public synchronized static void queryAdmdivgbCodeCache(){
        Map cachemap = (Map)SysCache.syscache.get(SysCache.KEY_ADMDIVGBCODE);
        if(cachemap==null){
            CommonDAO dao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
            List l = dao.queryForList("select code，admdivgbcode from bis_t_province");
            cachemap = new HashMap();
            if(l!=null&&l.size()!=0){
                Map m = null;
                for(int i=0;i<l.size();i++){
                    m = (Map)l.get(i);
                    cachemap.put(m.get("admdivgbcode"), m.get("code"));
                }
            }
            SysCache.syscache.put(SysCache.KEY_ADMDIVGBCODE, cachemap);
        }
    }
    
    /**
     * 获取SystemsetCache.
     * @return
     * @throws
     */
    public static Map getSystemCache(){
        Map cachemap = (Map)SysCache.syscache.get(SysCache.KEY_SYSTEMSET);
        if(cachemap==null){
            SysCache.querySystemsetCache();
            cachemap = (Map)SysCache.syscache.get(SysCache.KEY_SYSTEMSET);
        }
        return cachemap;
    }
    /**
     * 加载SystemsetCache.
     * @throws
     */
    public synchronized static void querySystemsetCache(){
        Map cachemap = (Map)SysCache.syscache.get(SysCache.KEY_SYSTEMSET);
        if(cachemap==null){
            CommonDAO dao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
            List datas = dao.queryForList("select code,value from Bis_t_Systemset");
            cachemap = new HashMap();
            if(datas!=null&&datas.size()!=0){
                Map m = null;
                for(int i=0;i<datas.size();i++){
                    m = (Map)datas.get(i);
                    cachemap.put(m.get("code"), m.get("value"));
                }
            }
            SysCache.syscache.put(SysCache.KEY_SYSTEMSET, cachemap);
        }
    }
    
    /**
     * 获取IPCache.
     * @return
     * @throws
     */
    public static Map getIPCache(){
        Map cachemap = (Map)SysCache.syscache.get(SysCache.KEY_IPADDRESS);
        if(cachemap==null){
            SysCache.queryIPCache();
            cachemap = (Map)SysCache.syscache.get(SysCache.KEY_IPADDRESS);
        }
        return cachemap;
    }
    /**
     * 加载IPCache.
     * @throws
     */
    public synchronized static void queryIPCache(){
        Map cachemap = (Map)SysCache.syscache.get(SysCache.KEY_IPADDRESS);
        if(cachemap==null){
            CommonDAO dao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
            List datas = dao.queryForList("SELECT t.ip,t.loginname from bis_t_ipaddress t");
            cachemap = new HashMap();
            if(datas!=null&&datas.size()!=0){
                Map m = null;
                for(int i=0;i<datas.size();i++){
                    m = (Map)datas.get(i);
                    cachemap.put((m.get("loginname")+"").toLowerCase()+":"+m.get("ip"), true);
                }
            }
            SysCache.syscache.put(SysCache.KEY_IPADDRESS, cachemap);
        }
    }
    
    public static void refreshRequestConfigCache(){
        SysCache.syscache.remove(SysCache.KEY_REQUESTCONFIG);
    }
    public static void refreshBustypeCache(){
        SysCache.syscache.remove(SysCache.KEY_BUSTYPE);
    }
    public static void refreshTableColumnsCache(){
        SysCache.syscache.remove(SysCache.KEY_TABLECOLUMNS);
    }
    public static void refreshUserNameCache(){
        SysCache.syscache.remove(SysCache.KEY_USERNAME_PASSWORD);
    }
    public static void refreshErrorNoCache(){
        SysCache.syscache.remove(SysCache.KEY_ERRORNO);
    }
    public static void refreshBustypeConfigCache(){
        SysCache.syscache.remove(SysCache.KEY_BUSTYPECONFIG);
    }
    public static void refreshProvinceCache(){
        SysCache.syscache.remove(SysCache.KEY_PROVINCECODE);
        SysCache.syscache.remove(SysCache.KEY_ADMDIVGBCODE);
    }
    public static void refreshSystemsetCache(){
        SysCache.syscache.remove(SysCache.KEY_SYSTEMSET);
    }
    public static void refreshIPCache(){
        SysCache.syscache.remove(SysCache.KEY_IPADDRESS);
    }
}
