/**
 * @Title: Fasp2PayBankService.java
 * @Copyright (C) 2016 榫欏浘杞欢
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-11  閽熸瘏
 */
 

package gov.mof.fasp2.bis.bustype;

import gov.mof.fasp2.bis.bustype.login.BustypeLoginBO;
import gov.mof.fasp2.bis.cache.SysCache;
import gov.mof.fasp2.bis.common.BustypeCommonBO;
import gov.mof.fasp2.bis.exception.AppException;
import gov.mof.fasp2.bis.factory.ServiceFactory;
import gov.mof.fasp2.bis.util.BisLogUtil;
import gov.mof.fasp2.bis.util.BisUtil;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;

import com.caucho.burlap.server.BurlapServlet;
import com.caucho.services.server.ServiceContext;

/**
 * @ClassName: Fasp2PayBankService
 * @Description: Description of this class
 * @author <a href="mailto:zhongyi@szlongtu.com"></a>
 */

public class Fasp2PayBankService extends BurlapServlet implements IFasp2PayBankService{

    public Map login(String username, String password) {
        Map m = null;
        try {
            BustypeLoginBO loginBO = (BustypeLoginBO)ServiceFactory.getBean("bis.bustype.login.BustypeLoginBO");
            //判断是否校验银行IP地址
            if("1".equals(SysCache.getSystemCache().get("IPCONTROL")+"")){
            	HttpServletRequest req = (HttpServletRequest)ServiceContext.getContextRequest();
            	checkIPAndPort(username,req);
            }
            m = loginBO.login(username, password);
        } catch (AppException e) {
            e.printStackTrace();
            m = new HashMap();
            m.put("result", "ERROR");
            m.put("errorno", e.getErrorno());
            m.put("errormsg", e.getErrormsg());
        } catch (Exception e) {
            e.printStackTrace();
            m = new HashMap();
            m.put("result", "ERROR");
            m.put("errorno", "0000");
            m.put("errormsg", ""+e.getMessage());
        }
        return m;
    }
	/**
	 * @param username 
     * 校验IP地址和端口，只有白名单的IP才能从接口库读取和发送数据
     * @param request
     * @throws
     */
    private void checkIPAndPort(String username, HttpServletRequest request) throws Exception{
		String ip = getIpAddress((HttpServletRequest)request);
		if(SysCache.getIPCache().containsKey(username.toLowerCase()+":"+ip)){
			return;
		}
		throw new AppException("0033");
	}
    
    public Map modifyPassword(String username, String oldpassword, String newpassword) {
        Map m = null;
        try {
            BustypeLoginBO loginBO = (BustypeLoginBO)ServiceFactory.getBean("bis.bustype.login.BustypeLoginBO");
            m = loginBO.modifyPassword(username, oldpassword, newpassword);
        } catch (AppException e) {
            e.printStackTrace();
            m = new HashMap();
            m.put("result", "ERROR");
            m.put("errorno", e.getErrorno());
            m.put("errormsg", e.getErrormsg());
        } catch (Exception e) {
            e.printStackTrace();
            m = new HashMap();
            m.put("result", "ERROR");
            m.put("errorno", "0000");
            m.put("errormsg", ""+e.getMessage());
        }
        return m;
    }


    public Map readVou(String bustype, String bankcode, String province, String year, String verifycode) {
        Map m = null;
        try {
            String tprovince = province;
            province = this.readParseProvinceTest(bustype, bankcode, tprovince);
            BustypeCommonBO bustypeCommonBO = this.getBustypeCommonBO(bustype);
            m = bustypeCommonBO.readVou(bustype, bankcode, province, year, verifycode);
            this.readRtParseProvinceTest(bustype, bankcode, tprovince, m);
            if(m==null||m.size()==0){
                throw new AppException("0013");
            }
            BisLogUtil.saveBustypeLog("readVou", bustype, bankcode, province, year, verifycode, null, m);
        } catch (AppException e) {
            e.printStackTrace();
            m = new HashMap();
            m.put("result", "ERROR");
            m.put("errorno", e.getErrorno());
            m.put("errormsg", e.getErrormsg());
            BisLogUtil.saveBustypeErrorLog("readVou", bustype, bankcode, province, year, verifycode,e.getErrorno(),e.getErrormsg(),BisUtil.exceptionToString(e), null, m);
        } catch (Exception e) {
            e.printStackTrace();
            m = new HashMap();
            m.put("result", "ERROR");
            m.put("errorno", "0000");
//            m.put("errormsg", ""+e.getMessage());
//            if(e.getMessage()==null){
//            	StringWriter sw = new StringWriter();  
//                e.printStackTrace(new PrintWriter(sw, true));  
//                String str = sw.toString(); 
                m.put("errormsg",BisUtil.exceptionToString(e,1000));
//            }else{
//            	m.put("errormsg", ""+e.getMessage());
//            }
            String errormsg = (String) m.get("errormsg");
//            BisLogUtil.saveBustypeErrorLog("readVou", bustype, bankcode, province, year, verifycode,"0000",e.getMessage(),BisUtil.exceptionToString(e), null, m);
            BisLogUtil.saveBustypeErrorLog("readVou", bustype, bankcode, province, year, verifycode,"0000",errormsg,BisUtil.exceptionToString(e), null, m);
        }
        return m;
    }

    public Map readUnReplySlipVou(String bustype, String bankcode, String province, String year, String verifycode) {
        Map m = null;
        try {
            String tprovince = province;
            province = this.readParseProvinceTest(bustype, bankcode, tprovince);
            BustypeCommonBO bustypeCommonBO = this.getBustypeCommonBO(bustype);
            m = bustypeCommonBO.readUnReplySlipVou(bustype, bankcode, province, year, verifycode);
            this.readRtParseProvinceTest(bustype, bankcode, tprovince, m);
            if(m==null||m.size()==0){
                throw new AppException("0013");
            }
            BisLogUtil.saveBustypeLog("readUnReplySlipVou", bustype, bankcode, province, year, verifycode, null, m);
        } catch (AppException e) {
            e.printStackTrace();
            m = new HashMap();
            m.put("result", "ERROR");
            m.put("errorno", e.getErrorno());
            m.put("errormsg", e.getErrormsg());
            BisLogUtil.saveBustypeErrorLog("readUnReplySlipVou", bustype, bankcode, province, year, verifycode,e.getErrorno(),e.getErrormsg(),BisUtil.exceptionToString(e), null, m);
        } catch (Exception e) {
            e.printStackTrace();
            m = new HashMap();
            m.put("result", "ERROR");
            m.put("errorno", "0000");
//            m.put("errormsg", ""+e.getMessage());
//            if(e.getMessage()==null){
//            	StringWriter sw = new StringWriter();  
//                e.printStackTrace(new PrintWriter(sw, true));  
//                String str = sw.toString(); 
//                m.put("errormsg",str);
                m.put("errormsg",BisUtil.exceptionToString(e,1000));
//            }else{
//            	m.put("errormsg", ""+e.getMessage());
//            }
            String errormsg = (String) m.get("errormsg");
//            BisLogUtil.saveBustypeErrorLog("readUnReplySlipVou", bustype, bankcode, province, year, verifycode,"0000",e.getMessage(),BisUtil.exceptionToString(e), null, m);
            BisLogUtil.saveBustypeErrorLog("readUnReplySlipVou", bustype, bankcode, province, year, verifycode,"0000",errormsg,BisUtil.exceptionToString(e), null, m);
        }
        return m;
    }

    public Map replySlipVou(String bustype, String bankcode, String province, String year, String verifycode,
            List listmap) {
        Map m = null;
        try {
            String tprovince = province;
            province = this.readParseProvinceTest(bustype, bankcode, tprovince);
            BustypeCommonBO bustypeCommonBO = this.getBustypeCommonBO(bustype);
            m = bustypeCommonBO.replySlipVou(bustype, bankcode, province, year, verifycode, listmap);
            this.readRtParseProvinceTest(bustype, bankcode, tprovince, m);
            if(m==null||m.size()==0){
                throw new AppException("0013");
            }
            BisLogUtil.saveBustypeLog("replySlipVou", bustype, bankcode, province, year, verifycode, listmap, m);
        } catch (AppException e) {
            e.printStackTrace();
            m = new HashMap();
            m.put("result", "ERROR");
            m.put("errorno", e.getErrorno());
            m.put("errormsg", e.getErrormsg());
            BisLogUtil.saveBustypeErrorLog("replySlipVou", bustype, bankcode, province, year, verifycode,e.getErrorno(),e.getErrormsg(),BisUtil.exceptionToString(e), listmap, m);
        } catch (Exception e) {
            e.printStackTrace();
            m = new HashMap();
            m.put("result", "ERROR");
            m.put("errorno", "0000");
            m.put("errormsg", ""+e.getMessage());
            BisLogUtil.saveBustypeErrorLog("replySlipVou", bustype, bankcode, province, year, verifycode,"0000",e.getMessage(),BisUtil.exceptionToString(e), listmap, m);
        }
        return m;
    }

    public Map sendVou(String bustype, String bankcode, String province, String year, String verifycode, List listmap) {
        Map m = null;
        try {
            if(listmap==null||listmap.size()==0){
                throw new AppException("0000","未接到数据");
            }
            province = this.sendParseProvinceTest(bustype, bankcode, province, listmap);
            BustypeCommonBO bustypeCommonBO = this.getBustypeCommonBO(bustype);
            m = bustypeCommonBO.sendVou(bustype, bankcode, province, year, verifycode, listmap);
            if(m==null||m.size()==0){
                throw new AppException("0013");
            }
            BisLogUtil.saveBustypeLog("sendVou", bustype, bankcode, province, year, verifycode, listmap, m);
        } catch (AppException e) {
            e.printStackTrace();
            m = new HashMap();
            m.put("result", "ERROR");
            m.put("errorno", e.getErrorno());
            m.put("errormsg", e.getErrormsg());
            BisLogUtil.saveBustypeErrorLog("sendVou", bustype, bankcode, province, year, verifycode,e.getErrorno(),e.getErrormsg(),BisUtil.exceptionToString(e), listmap, m);
        } catch (Exception e) {
            e.printStackTrace();
            m = new HashMap();
            m.put("result", "ERROR");
            m.put("errorno", "0000");
//            m.put("errormsg", ""+e.getMessage());
//            if(e.getMessage()==null){
//            	StringWriter sw = new StringWriter();  
//                e.printStackTrace(new PrintWriter(sw, true));  
//                String str = sw.toString(); 
//                m.put("errormsg",str);
            	m.put("errormsg",BisUtil.exceptionToString(e,1000));
//            }else{
//            	m.put("errormsg", ""+e.getMessage());
//            }
            String errormsg = (String) m.get("errormsg");
//            BisLogUtil.saveBustypeErrorLog("sendVou", bustype, bankcode, province, year, verifycode,"0000",e.getMessage(),BisUtil.exceptionToString(e), listmap, m);
            BisLogUtil.saveBustypeErrorLog("sendVou", bustype, bankcode, province, year, verifycode,"0000",errormsg,BisUtil.exceptionToString(e), listmap, m);
        }
        return m;
    }

    public Map cancelSendVou(String bustype, String bankcode, String province, String year, String verifycode,
            List listmap) {
        Map m = null;
        try {
            if(listmap==null||listmap.size()==0){
                throw new AppException("0000","未接到数据");
            }
            province = this.sendParseProvinceTest(bustype, bankcode, province, listmap);
            BustypeCommonBO bustypeCommonBO = this.getBustypeCommonBO(bustype);
            m = bustypeCommonBO.cancelSendVou(bustype, bankcode, province, year, verifycode, listmap);
            if(m==null||m.size()==0){
                throw new AppException("0013");
            }
            BisLogUtil.saveBustypeLog("cancelSendVou", bustype, bankcode, province, year, verifycode, listmap, m);
        } catch (AppException e) {
            e.printStackTrace();
            m = new HashMap();
            m.put("result", "ERROR");
            m.put("errorno", e.getErrorno());
            m.put("errormsg", e.getErrormsg());
            BisLogUtil.saveBustypeErrorLog("cancelSendVou", bustype, bankcode, province, year, verifycode,e.getErrorno(),e.getErrormsg(),BisUtil.exceptionToString(e), listmap, m);
        } catch (Exception e) {
            e.printStackTrace();
            m = new HashMap();
            m.put("result", "ERROR");
            m.put("errorno", "0000");
            m.put("errormsg", ""+e.getMessage());
            BisLogUtil.saveBustypeErrorLog("cancelSendVou", bustype, bankcode, province, year, verifycode,"0000",e.getMessage(),BisUtil.exceptionToString(e), listmap, m);
        }
        return m;
    }

    public Map queryElelementVersion(String bustype, String bankcode, String province, String year, String verifycode,
            List elementcodelist) {
        Map m = null;
        try {
        	province = this.readParseProvinceTest(bustype, bankcode, province);
            BustypeCommonBO bustypeCommonBO = this.getBustypeCommonBO(bustype);
            m = bustypeCommonBO.queryElelementVersion(bustype, bankcode, province, year, verifycode, elementcodelist);
            if(m==null||m.size()==0){
                throw new AppException("0013");
            }
        } catch (AppException e) {
            e.printStackTrace();
            m = new HashMap();
            m.put("result", "ERROR");
            m.put("errorno", e.getErrorno());
            m.put("errormsg", e.getErrormsg());
        } catch (Exception e) {
            e.printStackTrace();
            m = new HashMap();
            m.put("result", "ERROR");
            m.put("errorno", "0000");
            m.put("errormsg", ""+e.getMessage());
        }
        return m;
    }

    public Map queryElelement(String bustype, String bankcode, String province, String year, String verifycode,
            String elementcode, String seq) {
        Map m = null;
        try {
        	province = this.readParseProvinceTest(bustype, bankcode, province);
            BustypeCommonBO bustypeCommonBO = this.getBustypeCommonBO(bustype);
            m = bustypeCommonBO.queryElelement(bustype, bankcode, province, year, verifycode, elementcode, seq);
            if(m==null||m.size()==0){
                throw new AppException("0013");
            }
        } catch (AppException e) {
            e.printStackTrace();
            m = new HashMap();
            m.put("result", "ERROR");
            m.put("errorno", e.getErrorno());
            m.put("errormsg", e.getErrormsg());
            BisLogUtil.saveBustypeErrorLog("queryElelement", bustype, bankcode, province, year, verifycode,e.getErrorno(),e.getErrormsg(),BisUtil.exceptionToString(e), null, m);
        } catch (Exception e) {
            e.printStackTrace();
            m = new HashMap();
            m.put("result", "ERROR");
            m.put("errorno", "0000");
            m.put("errormsg", ""+e.getMessage());
            BisLogUtil.saveBustypeErrorLog("queryElelement", bustype, bankcode, province, year, verifycode,"0000",e.getMessage(),BisUtil.exceptionToString(e), null, m);
        }
        return m;
    }
    
    public BustypeCommonBO getBustypeCommonBO(String bustype) throws AppException{
        Map bustypemap = (Map)SysCache.getBustypeCache().get(bustype);
        if(bustypemap==null){
            throw new AppException("0003");
        }
        String beanid = (String)bustypemap.get("beanid");
        if(beanid==null){
            throw new AppException("0000","bustype="+bustype+"的beanid不存在！");
        }
        BustypeCommonBO loginBO = (BustypeCommonBO)ServiceFactory.getBean(beanid);
        if(loginBO==null){
            throw new AppException("0000","bustype="+bustype+"的beanid对应实体类不存在！");
        }
        return loginBO;
    }
    
    public String readParseProvinceTest(String bustype, String bankcode, String province){
        if(bustype.startsWith("1")){
//            if("150000".equals(province)){
//                province = "1500";
//            }
            province = ""+SysCache.getAdmdivgbCodeCache().get(province);
        }
        return province;
    }
    public String readRtParseProvinceTest(String bustype, String bankcode, String province,Map rt){
        if(bustype.startsWith("1")){
//            if("150000".equals(province)){
                List datas = (List)rt.get("datas");
                if(datas!=null&&datas.size()>0){
                    Map m = null;
                    List sublist = null;
                    Map subm = null;
                    String tp = null;
                    for(int i=0;i<datas.size();i++){
                        m = (Map)datas.get(i);
                        tp = (String)m.get("province");
                        if(tp!=null&&!"".equals(tp)&&!"null".equals(tp)){
                            m.put("province", province);
                        }
                        sublist = (List)m.get("sublist");
                        if(sublist!=null&&sublist.size()>0){
                            for(int j=0;j<sublist.size();j++){
                                subm = (Map)sublist.get(j);
                                tp = (String)subm.get("province");
                                if(tp!=null&&!"".equals(tp)&&!"null".equals(tp)){
                                    subm.put("province", province);
                                }
                            }
                        }
                    } 
                }
//            }
        }
        return province;
    }
    public String sendParseProvinceTest(String bustype, String bankcode, String province, List listmap){
        if(bustype.startsWith("1")){
//            if(province.equals("150000")){
//                province = "1500";
                province = ""+SysCache.getAdmdivgbCodeCache().get(province);
                Map m = null;
                List sublist = null;
                Map subm = null;
                String tp = null;
                for(int i=0;i<listmap.size();i++){
                    m = (Map)listmap.get(i);
                    tp = (String)m.get("province");
                    if(tp!=null&&!"".equals(tp)&&!"null".equals(tp)){
                        m.put("province", province);
                    }
                    sublist = (List)m.get("sublist");
                    if(sublist!=null&&sublist.size()>0){
                        for(int j=0;j<sublist.size();j++){
                            subm = (Map)sublist.get(j);
                            tp = (String)subm.get("province");
                            if(tp!=null&&!"".equals(tp)&&!"null".equals(tp)){
                                subm.put("province", province);
                            }
                        }
                    }
                }
//            }
        }
        return province;
    }
}
