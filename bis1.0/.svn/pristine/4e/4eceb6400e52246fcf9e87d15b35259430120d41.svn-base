/**
 * @Title: Bustype1003BO.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-17  钟毅
 */
 

package gov.mof.fasp2.bis.bustype.bank;

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

/**
 * @ClassName: Bustype1003BO
 * @Description: Description of this class
 * @author <a href="mailto:zhongyi@szlongtu.com">钟毅</a>于 2016-5-17 上午09:20:37
 */

public class Bustype1003BO extends BustypeCommonBO {


    @Override
    public Map replySlipDatas(String maintablecode, String subtablecode, List listmap,String bustype)
            throws AppException {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Map sendDatas(String maintablecode, String subtablecode, List listmap) throws AppException {
        // TODO Auto-generated method stub
        return null;
    }
    //maintablecode：bis_t_bustype1003m_150100_2016
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
        //要取消的数据是否都存在
        if(l.size()!=listmap.size()){
            String missingguid = this.getMissingDatas(listmap, l, "guid");
            throw new AppException("0015",missingguid);
        }
        
        //查找出子list中的guid
        List lsub = new ArrayList();
        String subsql ="select * from "+cancelsubtablecode+" where "
        		+this.parseInSql3("mainguid","guid", l) +" for update";
        if(dao.queryForList(subsql)!=null){
            lsub.addAll(dao.queryForList(subsql));
        }
        
        //已经确认支付过的数据读取状态改成1，没做过确认支付的读取状态改成0
        StringBuffer s = new StringBuffer();
        Map m = null;
        int bisreadstatus = 0;
        String biscanceltime = BisUtil.getDate17(new Date());
        for(int i=0;i<l.size();i++){
            m = (Map)l.get(i);
            m.put("biscanceltime", biscanceltime);//设置取消时间
            bisreadstatus = ((Number)m.get("bisreadstatus")).intValue();
            if(bisreadstatus == 1){
            	m.put("bisreadstatus","0");
            	m.put("bisreplyslipstatus", "0");
            	//检查上次取消确认支付是否处理完
            	String guid = m.get("guid")+"";
            	String unFinishedSql = "select * from " +maintablecode+" t where guid='"+guid
            			+"' and nvl(t.bisreadstatus,0)=0 for update";
            	List unFinishedList = dao.queryForList(unFinishedSql);
            	if(unFinishedList.size()>0){
            		 if(s.length()==0){
                         s.append(m.get("guid"));
                     }else{
                         s.append(",").append(m.get("guid"));
                     }
            	}
            }else{
            	m.put("bisreadstatus","1");
            	m.put("bisreplyslipstatus", "1");
            }
            //添加回执信息
            rtmap = new HashMap();
            rtmap.put("guid", m.get("guid"));
            rtmap.put("billcode", m.get("billcode"));
            rtlist.add(rtmap);
        }
        //存在没有处理的取消确认支付
        if(s.length()>0){
            throw new AppException("0031",s.toString());
        }
        
        // 对子表的数据进行操作
        for(int i=0;i<lsub.size();i++){
            m = (Map)lsub.get(i);
          m.put("biscanceltime", biscanceltime);//设置取消时间
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
        //放入回执信息
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
