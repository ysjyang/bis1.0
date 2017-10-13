package gov.mof.fasp2.bis.bustype.bank;

import gov.mof.fasp2.bis.checkdata.CheckData;
import gov.mof.fasp2.bis.common.BustypeCommonBO;
import gov.mof.fasp2.bis.common.CommonDAO;
import gov.mof.fasp2.bis.exception.AppException;
import gov.mof.fasp2.bis.factory.ServiceFactory;
import gov.mof.fasp2.bis.util.BisUtil;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Bustype1101BO extends BustypeCommonBO{


	@Override
	public Map replySlipDatas(String maintablecode, String subtablecode,
			List listmap,String bustype) throws AppException {
		// TODO Auto-generated method stub
		return null;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public Map sendDatas(String maintablecode, String subtablecode, List listmap)
			throws AppException {
		Map rt = new HashMap();
        //biscreatetime,bisreadstatus,bisreadtime,bisreplyslipstatus,bisreplysliptime初始化
        Map m = null;
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
            rtmap.put("cardno", m.get("cardno"));
            rtlist.add(rtmap);
        }
        //数据重复校验
        CheckData.checkCardRepeatData(listmap,maintablecode,this.parseInSql4("cardno", "agencycode", listmap));
        //预算单位编码校验
        CheckData.comCheckAgencycode(listmap,"cardno");
        //开户银行编码校验，这个字段不对会影响公务卡凭证的读取
        CheckData.checkCardBankCode(listmap);
        try {
        	//保存数据
        	CommonDAO dao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
            dao.saveAll(listmap, maintablecode);
        } catch (Exception e) {
            e.printStackTrace();
            if(e.getMessage().indexOf("违反唯一约束")!=-1){ //违反唯一约束,重复插入导致
            	Map map = new HashMap();
            	String guid = "";
            	List repeatlist = new ArrayList();
            	for(int a=0;a<listmap.size();a++){
            		map = (Map) listmap.get(a);
            		guid = (String) map.get("cardno");
            		repeatlist.add(guid);
            	}
            	String repeatguid = "";
            	for(int b=0;b<repeatlist.size();b++){
            		repeatguid = (String) repeatlist.get(b);
            		repeatlist.remove(b);
            		if(repeatlist.contains(repeatguid)){
            			throw new AppException("0014","发送的list中数据重复，重复的cardno为："+repeatguid);
            		}
            	}
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
