package gov.mof.fasp2.bis.bustype.pay;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import gov.mof.fasp2.bis.common.BustypeCommonBO;
import gov.mof.fasp2.bis.common.CommonDAO;
import gov.mof.fasp2.bis.exception.AppException;
import gov.mof.fasp2.bis.factory.ServiceFactory;
import gov.mof.fasp2.bis.util.BisUtil;

public class Bustype2023BO extends BustypeCommonBO{


	@Override
	public Map replySlipDatas(String maintablecode, String subtablecode,
			List listmap,String bustype) throws AppException {
		// TODO Auto-generated method stub
		return null;
	}

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
        for(int i=0;i<listmap.size();i++){
            m = (Map)listmap.get(i);
            m.put("biscreatetime", biscreatetime);
            m.put("bisreadstatus", "0");
            m.put("bisreadtime", "");
            m.put("bisreplyslipstatus", "0");
            m.put("bisreplysliptime", "");
            
            
            rtmap = new HashMap();
            rtmap.put("guid", m.get("guid"));
            rtmap.put("billcode", m.get("billcode"));
            rtlist.add(rtmap);
            
            //操作子单的数据
            sublist.addAll((List)m.get("sublist"));
//            sublist = (List) m.get("sublist");
//            for(int a=0;a<sublist.size();a++){
//            	submap = (Map) sublist.get(a);
//            	submap.put("biscreatetime", biscreatetime);
//            	submap.put("bisreadstatus", "0");
//            	submap.put("bisreadtime", "");
//            	submap.put("bisreplyslipstatus", "0");
//            	submap.put("bisreplysliptime", "");
//            }
        }
        //保存数据
        CommonDAO dao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
        try {
            dao.saveAll(listmap, maintablecode);
            //将数据保存在子单中
            dao.saveAll(sublist, subtablecode);
        } catch (Exception e) {
            e.printStackTrace();
            if(e.getMessage().indexOf("违反唯一约束")!=-1){ //违反唯一约束,重复插入导致
                throw new AppException("0014");
            }else{
                throw new AppException("0000",BisUtil.exceptionToString(e,1800));
            }
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
