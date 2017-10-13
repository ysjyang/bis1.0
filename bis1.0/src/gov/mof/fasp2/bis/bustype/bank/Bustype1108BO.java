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

public class Bustype1108BO extends BustypeCommonBO {


	@Override
	public Map replySlipDatas(String maintablecode, String subtablecode,
			List listmap,String bustype) throws AppException {
		// TODO Auto-generated method stub
		return null;
	}
	/*
	 * 4.8 公务卡退款通知单-发送
	 * @see gov.mof.fasp2.bis.common.BustypeCommonBO#sendDatas(java.lang.String, java.lang.String, java.util.List)
	 */
	@Override
	public Map sendDatas(String maintablecode, String subtablecode, List listmap)
			throws AppException {
		Map rt = new HashMap();
        
        //biscreatetime,bisreadstatus,bisreadtime,bisreplyslipstatus,bisreplysliptime初始化
        Map m = null;
        Map submap = null;
        List sublist = new ArrayList();
        String biscreatetime = BisUtil.getDate17(new Date());
        List rtlist = new ArrayList();
        Map rtmap = null;
        List singSubList = new ArrayList();
        for(int i=0;i<listmap.size();i++){
            m = (Map)listmap.get(i);
            m.put("biscreatetime", biscreatetime);
            m.put("bisreadstatus", "0");
            m.put("bisreadtime", "");
            m.put("bisreplyslipstatus", "0");
            m.put("bisreplysliptime", "");
            //回执
            rtmap = new HashMap();
            rtmap.put("billid", m.get("billid"));
            rtlist.add(rtmap);
          //主单guid拼上bisbankcode字段
            m.put("billid", m.get("bisbankcode")+"-"+m.get("billid"));
            singSubList = (List)m.get("sublist");
            //子单mainguid拼上bisbankcode字段
            for(int j=0;j<singSubList.size();j++){
            	submap = (Map)singSubList.get(j);
            	submap.put("mainguid",submap.get("bisbankcode")+"-"+submap.get("mainguid"));
            }
            //获取子单数据
            sublist.addAll((List)m.get("sublist"));
        }
        //重复数据校验
        CheckData.comCheckRepeat(listmap,maintablecode,"billid",this.parseInSql2("billid", listmap));
        //保存数据
        CommonDAO dao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
        try {
            dao.saveAll(listmap, maintablecode);
            //将数据保存在子单中
            dao.saveAll(sublist, subtablecode);
        } catch (Exception e) {
            e.printStackTrace();
//            if(e.getMessage().indexOf("违反唯一约束")!=-1){ //违反唯一约束,重复插入导致
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
//            	String sql = "";
//            	List repeatlist1 = new ArrayList();
//            	for(int a=0;a<listmap.size();a++){
//            		map1 = (Map) listmap.get(a);
//            		guid1 = (String) map1.get("guid");
//            		sql = "select * from "+maintablecode+" where guid='"+guid1+"'";
//            		repeatlist1 = dao.queryForList(sql);
//            		if(repeatlist1.size()!=0){
//            			throw new AppException("0014","发送的list中数据和数据库原有数据重复，重复的guid为："+guid1);
//            		}
//            	}
//            }else{
                throw new AppException("0000",BisUtil.exceptionToString(e,1800));
//            }
        }
        rt.put("result", "SUCCESS");
        rt.put("datas", rtlist);
        return rt;
	}

	@Override
	public Map cancelSendDatas(String maintablecode, String subtablecode,
			String cancelmaintablecode, String cancelsubtablecode, List listmap)
			throws AppException {
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
