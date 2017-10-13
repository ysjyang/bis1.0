/**
 * @Title: Bustype2017BO.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-23  胡川
 */
 

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

/**
 * @ClassName: Bustype2017BO
 * @Description: Description of this class
 * @author <a href="mailto:huchuan@szlongtu.com">胡川</a>于 2016-5-23 下午7:51:39
 */

public class Bustype2017BO extends BustypeCommonBO {


    /**.
     * <p>Title: replySlipDatas</p>
     * <p>Description: </p>
     * @param maintablecode
     * @param subtablecode
     * @param listmap
     * @return
     * @throws AppException
     * @see gov.mof.fasp2.bis.common.BustypeCommonBO#replySlipDatas(java.lang.String, java.lang.String, java.util.List)
     */
    @Override
    public Map replySlipDatas(String maintablecode, String subtablecode, List listmap,String bustype) throws AppException {
        // TODO Auto-generated method stub
        return null;
    }

    /**.
     * <p>Title: sendDatas</p>
     * <p>Description: </p>
     * @param maintablecode
     * @param subtablecode
     * @param listmap
     * @return
     * @throws AppException
     * @see gov.mof.fasp2.bis.common.BustypeCommonBO#sendDatas(java.lang.String, java.lang.String, java.util.List)
     */
    @Override
    public Map sendDatas(String maintablecode, String subtablecode, List listmap) throws AppException {
        Map rt = new HashMap();
        //biscreatetime,bisreadstatus,bisreadtime,bisreplyslipstatus,bisreplysliptime初始化
        Map m = null;
        Map submap = null;
        List sublist = new ArrayList();
        String biscreatetime = BisUtil.getDate17(new Date());
        
        /***/
        List rtlist = new ArrayList();  //回执数据
        Map rtmap = null;        		//回执map
        
        for(int i=0;i<listmap.size();i++){
            m = (Map)listmap.get(i);
            m.put("biscreatetime", biscreatetime);
            m.put("bisreadstatus", "0");
            m.put("bisreadtime", "");
            m.put("bisreplyslipstatus", "0");
            m.put("bisreplysliptime", "");
            
            //获取子单数据
            sublist.addAll((List)m.get("sublist"));
            
            /***/
            //添加回执数据
            rtmap = new HashMap();
            rtmap.put("guid", m.get("guid"));
            rtmap.put("billcode", m.get("billcode"));
            rtlist.add(rtmap);
        }
        //保存数据
        CommonDAO dao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
        try {
            dao.saveAll(listmap, maintablecode);
            //保存子表数据
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
        /***/
        rt.put("datas", rtlist);	//放入回执数据
        return rt;
    }

    /**.
     * <p>Title: cancelSendDatas</p>
     * <p>Description: </p>
     * @param maintablecode
     * @param subtablecode
     * @param cancelmaintablecode
     * @param cancelsubtablecode
     * @param listmap
     * @return
     * @throws AppException
     * @see gov.mof.fasp2.bis.common.BustypeCommonBO#cancelSendDatas(java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.util.List)
     */
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
