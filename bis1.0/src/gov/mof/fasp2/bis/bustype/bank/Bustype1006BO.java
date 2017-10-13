/**
 * @Title: Bustype1006BO.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-17  钟毅
 */
 

package gov.mof.fasp2.bis.bustype.bank;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import gov.mof.fasp2.bis.checkdata.CheckData;
import gov.mof.fasp2.bis.common.BustypeCommonBO;
import gov.mof.fasp2.bis.common.CommonDAO;
import gov.mof.fasp2.bis.exception.AppException;
import gov.mof.fasp2.bis.factory.ServiceFactory;
import gov.mof.fasp2.bis.util.BisUtil;

/**
 * @ClassName: Bustype1006BO
 * @Description: Description of this class
 * @author <a href="mailto:zhongyi@szlongtu.com">钟毅</a>于 2016-5-17 上午09:21:08
 */

public class Bustype1006BO extends BustypeCommonBO {


    @Override
    public Map replySlipDatas(String maintablecode, String subtablecode, List listmap,String bustype)
            throws AppException {
        // TODO Auto-generated method stub
        return null;
    }

    @SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
    public Map sendDatas(String maintablecode, String subtablecode, List listmap) throws AppException {
    	CommonDAO dao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
    	Map rt = new HashMap();
        //biscreatetime,bisreadstatus,bisreadtime,bisreplyslipstatus,bisreplysliptime初始化
        Map m = null;
        Map submap = null;
        List sublist = new ArrayList();
        String biscreatetime = BisUtil.getDate17(new Date());
        
        List rtlist = new ArrayList();  //回执数据
        Map rtmap = null;        		//回执map
        
        String errormsg = "";
        String voucherguid = "";
        String sql = "";
        List list = new ArrayList();
        String amt = "";
        Map map1001 = new HashMap();
        String amt1001 = "";
        List singSubList = new ArrayList();
        for(int i=0;i<listmap.size();i++){
            m = (Map)listmap.get(i);
            m.put("biscreatetime", biscreatetime);
            m.put("bisreadstatus", "0");
            m.put("bisreadtime", "");
            m.put("bisreplyslipstatus", "0");
            m.put("bisreplysliptime", "");
            
            //校验退款是否是有原凭证，或者退款金额小于原凭证金额
            voucherguid = m.get("voucherguid")+"";
            amt = m.get("amt")+"";
            maintablecode.toLowerCase();
            sql = "select * from "+maintablecode.replace("1006m", "1001m") +" where guid = '"+voucherguid+"'";
            list = dao.queryForList(sql);
            
            if(list.size()==0){
            	throw new AppException("0024");
            }else{
            	map1001 = (Map) list.get(0);
            	//原凭证金额
            	amt1001 = map1001.get("amt")+"";
            	if(Double.parseDouble(amt1001)<Double.parseDouble(amt)){
            		throw new AppException("0024");
            	}
            }
            
            //添加回执数据
            rtmap = new HashMap();
            rtmap.put("guid", m.get("guid"));
            rtlist.add(rtmap);
            
            //主单guid拼上bisbankcode字段
            m.put("guid", m.get("bisbankcode")+"-"+m.get("guid"));
            singSubList = (List)m.get("sublist");
            //子单mainguid拼上bisbankcode字段
            for(int j=0;j<singSubList.size();j++){
            	submap = (Map)singSubList.get(j);
            	submap.put("mainguid",submap.get("bisbankcode")+"-"+submap.get("mainguid"));
            }
            //获取子单数据
            sublist.addAll((List)m.get("sublist"));

        }
    	//数据重复校验
    	CheckData.comCheckRepeat(listmap, maintablecode, "guid" , this.parseInSql2("guid", listmap));
        //保存数据
        try {
            dao.saveAll(listmap, maintablecode);
            //保存子表数据
            dao.saveAll(sublist, subtablecode);
        } catch (Exception e) {
            e.printStackTrace();
//            if(e.getMessage().indexOf("违反唯一约束")!=-1){ //违反唯一约束,重复插入导致
////                throw new AppException("0014");
//            	//判断是否是新发数据list本身重复，否则则是新数据和数据库原有数据重复
//            	Map map = new HashMap();
//            	String guid = "";
//            	List repeatlist = new ArrayList();
//            	for(int a=0;a<listmap.size();a++){
//            		map = (Map) listmap.get(a);
//            		guid = (String) map.get("guid");
//            		repeatlist.add(guid);
//            	}
//            	String repeatguid = "";
//            	for(int b=0;b<repeatlist.size();b++){
//            		repeatguid = (String) repeatlist.get(b);
//            		repeatlist.remove(b);
//            		if(repeatlist.contains(repeatguid)){
//            			throw new AppException("0014","发送的list中数据重复，重复的guid为："+repeatguid);
//            		}
//            	}
//            	//如果上面程序执行完，说明重复是和数据库数据重复
//            	Map map1 = new HashMap();
//            	String guid1 = "";
//            	String repeatsql = "";
//            	List repeatlist1 = new ArrayList();
//            	for(int a=0;a<listmap.size();a++){
//            		map1 = (Map) listmap.get(a);
//            		guid1 = (String) map1.get("guid");
//            		repeatsql = "select * from "+maintablecode+" where guid='"+guid1+"'";
//            		repeatlist1 = dao.queryForList(repeatsql);
//            		if(repeatlist1.size()!=0){
//            			throw new AppException("0014","发送的list中数据和数据库原有数据重复，重复的guid为："+guid1);
//            		}
//            	}
//            }else{
               throw new AppException("0000",BisUtil.exceptionToString(e,1800));
//            }
        }
        rt.put("result", "SUCCESS");
        /***/
        rt.put("datas", rtlist);	//放入回执数据
        return rt;
    }

    @Override
    public Map cancelSendDatas(String maintablecode, String subtablecode, String cancelmaintablecode,
            String cancelsubtablecode, List listmap) throws AppException {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Map readDatas(String maintablecode, String subtablecode, int maxdatasnum, String bankcode,String bustype)
            throws AppException {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Map readUnReplySlipDatas(String maintablecode, String subtablecode, int maxdatasnum, String bankcode,String bustype)
            throws AppException {
        // TODO Auto-generated method stub
        return null;
    }

}
