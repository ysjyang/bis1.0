/**
 * @Title: Bustype2008BO.java
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
 * @ClassName: Bustype2008BO
 * @Description: Description of this class
 * @author <a href="mailto:huchuan@szlongtu.com">胡川</a>于 2016-5-23 下午7:50:23
 */

public class Bustype2008BO extends BustypeCommonBO {


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
        // TODO Auto-generated method stub
        return null;
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
        Map rt = new HashMap();
        /**回执数据*/
        List rtlist = new ArrayList();  //回执数据
        Map rtmap = null;        		//回执map
        
        CommonDAO dao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
        
        //查询要取消的数据是否存在,并且锁定这些记录.
        String sql ="select * from "+cancelmaintablecode+" where "+this.parseInSql2("guid", listmap) +" for update";
        List l = dao.queryForList(sql);
        
        //查找出子list中的guid
        List lsub = new ArrayList();
        List sublist =new ArrayList();
        Map map = null;
        for(int i=0;i<listmap.size();i++){
            map = (Map) listmap.get(i);
            sublist.addAll((List) map.get("sublist"));
        }
        
        String subsql ="select * from "+cancelsubtablecode+" where "+this.parseInSql2("guid", sublist) +" for update";
        if(dao.queryForList(subsql)!=null){
            lsub.addAll(dao.queryForList(subsql));
        }
        //要取消的数据是否都存在
        if(l.size()!=listmap.size()){
            String missingguid = this.getMissingDatas(listmap, l, "guid");
            throw new AppException("0015",missingguid);
        }
        
        //校验是否可以做取消操作
        StringBuffer s = new StringBuffer();
        Map m = null;
        int bisreadstatus = 0;
        String biscanceltime = BisUtil.getDate17(new Date());
        for(int i=0;i<l.size();i++){
            m = (Map)l.get(i);
            m.put("biscanceltime", biscanceltime);//设置取消时间
            bisreadstatus = ((Number)m.get("bisreadstatus")).intValue();
            if(bisreadstatus == 1){
                if(s.length()==0){
                    s.append(m.get("guid"));
                }else{
                    s.append(",").append(m.get("guid"));
                }
            }
            /**添加回执数据*/
            rtmap = new HashMap();
            rtmap.put("guid", m.get("guid"));
            rtmap.put("billcode", m.get("billcode"));
            rtlist.add(rtmap);
        }
        // 对子表的数据进行操作
        for(int i=0;i<lsub.size();i++){
            m = (Map)lsub.get(i);
          m.put("biscanceltime", biscanceltime);//设置取消时间
        }
        
        if(s.length()>0){
            throw new AppException("0016",s.toString());
        }
        
        //将要取消的数据移动到取消表中，并增加取消时间。
        dao.saveAll(l, maintablecode);
        //将数据保存在子表中
        dao.saveAll(lsub, subtablecode);
        //先删除子表的数据
        sql ="delete from "+cancelsubtablecode+" where "+this.parseInSql2("guid", lsub);
        dao.update(sql);
        sql ="delete from "+cancelmaintablecode+" where "+this.parseInSql2("guid", listmap);
        dao.update(sql); //在原表中删除取消的数据
        rt.put("result", "SUCCESS");
        /**放入回执数据*/
        rt.put("datas", rtlist);
        return rt;
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
