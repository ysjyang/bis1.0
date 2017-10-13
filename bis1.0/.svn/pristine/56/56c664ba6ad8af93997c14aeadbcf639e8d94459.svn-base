/**
 * @Title: Bustype1022BO.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-17  钟毅
 */
 

package gov.mof.fasp2.bis.bustype.msxt;

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
 * @ClassName: Bustype1022BO
 * @Description: Description of this class
 * @author <a href="mailto:zhongyi@szlongtu.com">钟毅</a>于 2016-5-17 上午09:24:03
 */

public class Bustype1304BO extends BustypeCommonBO {


    @Override
    public Map replySlipDatas(String maintablecode, String subtablecode, List listmap,String bustype)
            throws AppException {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Map sendDatas(String maintablecode, String subtablecode, List listmap) throws AppException {
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
            rtmap.put("guid", m.get("guid"));
            rtmap.put("voucherno", m.get("billcode"));
            rtlist.add(rtmap);
        }
        //数据重复校验
    	CheckData.comCheckRepeat(listmap, maintablecode, "guid" , this.parseInSql2("guid", listmap));
        //保存数据
        CommonDAO dao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
        try {
            dao.saveAll(listmap, maintablecode);
        } catch (Exception e) {
            e.printStackTrace();
               throw new AppException("0000",BisUtil.exceptionToString(e,1800));
        }
        rt.put("result", "SUCCESS");
        rt.put("datas", rtlist);
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
