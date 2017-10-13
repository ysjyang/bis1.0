/**
 * @Title: Bustype1011BO.java
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

import gov.mof.fasp2.bis.common.BustypeCommonBO;
import gov.mof.fasp2.bis.common.CommonDAO;
import gov.mof.fasp2.bis.exception.AppException;
import gov.mof.fasp2.bis.factory.ServiceFactory;
import gov.mof.fasp2.bis.util.BisUtil;

/**
 * @ClassName: Bustype1011BO
 * @Description: Description of this class
 * @author <a href="mailto:zhongyi@szlongtu.com">钟毅</a>于 2016-5-17 上午09:22:27
 */

public class Bustype1011BO extends BustypeCommonBO {

    @SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
    public Map readDatas(String maintablecode, String subtablecode, int maxdatasnum,String bankcode,String bustype) 
    		throws AppException {
        Map rt = new HashMap();
        // 查询 数据并锁定数据 如果maxdatasnum有值 则查询时带上rownum
        //如果1011和1107的区别
        List datas = new ArrayList();
        List tmpdatas = new ArrayList();
        CommonDAO dao = (CommonDAO) ServiceFactory.getBean("bis.common.CommonDAO");
        String sql = "";
        if(bustype.equals("1107")){
        	//公务卡凭证是iscard为‘1’，并且已经确认支付的。
        	//公务卡凭证开卡银行读取
        	sql = "select " + this.getQueryTableColumns(maintablecode) + " from " + maintablecode
                    + " t where nvl(t.cardreadstatus,0)=0 and bankcode='"+bankcode+"'";
            if (maxdatasnum > 0) {
                sql += " and rownum<=" + maxdatasnum;
            }
            sql += " and iscard = '1'";
            sql += " for update";
            tmpdatas = dao.queryForList(sql);
            //过滤tmpdatas，如果能在授权确认支付有此guid则给银行发送
            String guid = "";
            Map map = new HashMap();
            String tmpsql = "";
            List tmplist = new ArrayList();
            for(int i=0;i<tmpdatas.size();i++){
            	map = (Map) tmpdatas.get(i);
            	guid = (String) map.get("guid");
            	tmpsql = "select * from "+maintablecode.replace("1011m", "1012m")+" t where t.guid = '"+guid+"'";
            	tmplist = dao.queryForList(tmpsql);
            	if(tmplist.size()!=0){
            		datas.add(map);
            	}
            }
            //把主表中的billcode转换成voucherno，为了报文对应
            Map datasmap = new HashMap();
            for(int m=0;m<datas.size();m++){
            	datasmap = (Map) datas.get(m);
            	datasmap.put("voucherno", datasmap.get("billcode"));
            	datasmap.remove("billcode");
            }
            
            // 如果主表数据非空，添加相对应的子表数据到主表datas中
            subtablecode = subtablecode.toLowerCase();
            if (datas != null && datas.size() > 0) {
                addSubData(datas,subtablecode);
            }
            
            // 更新查到数据的读取状态
            if (datas.size() > 0) {
                String bisreadtime = BisUtil.getDate17(new Date());
                sql = "update " + maintablecode + " t set t.cardreadstatus=1,t.cardreadtime='" + bisreadtime + "' where "
                        + this.parseInSql2("guid", datas);
                dao.update(sql);
            }
        }
        if(bustype.equals("1011")){
        	//授权支付凭代理银行读取，会读取公务卡凭证和授权支付凭证
        	sql = "select " + this.getQueryTableColumns(maintablecode) + " from " + maintablecode
                    + " t where nvl(t.bisreadstatus,0)=0 and bisbankcode='"+bankcode+"'";
            if (maxdatasnum > 0) {
                sql += " and rownum<=" + maxdatasnum;
            }
            sql += " for update";
            List tempList = dao.queryForList(sql); 
            
            if (tempList != null && tempList.size() > 0) {
                String inSql = this.parseInSql2("guid", tempList);
                //为了取出的和报文相同的数据，在此从视图中查找数据
                maintablecode = maintablecode.toLowerCase();
            	sql = "select * from " + maintablecode.replace("_t_", "_v_") + " t where " + inSql;
                if (maxdatasnum > 0) {
                    sql += " and rownum<=" + maxdatasnum;
                }
            }

            datas = dao.queryForList(sql); 
            // 如果主表数据非空，添加相对应的子表数据到主表datas中
            subtablecode = subtablecode.toLowerCase();
            if (datas != null && datas.size() > 0) {
                addSubData1(datas,subtablecode.replace("_t_", "_v_"));
            }
            
            // 更新查到数据的读取状态
            if (datas.size() > 0) {
                String bisreadtime = BisUtil.getDate17(new Date());
                sql = "update " + maintablecode + " t set t.bisreadstatus=1,t.bisreadtime='" + bisreadtime + "' where "
                        + this.parseInSql2("guid", datas);
                dao.update(sql);
            }
        }

        
        // 判断查寻到的数据条数是否等于maxdatasnum，如果等于则将iscomplete置为"TRUE",否则置为"FALSE"
        if (maxdatasnum > 0 && datas.size() == maxdatasnum) {
            rt.put("iscomplete", "FALSE");
        } else {
            rt.put("iscomplete", "TRUE");
        }
        rt.put("result", "SUCCESS");
        rt.put("datas", datas);

        return rt;
    }
    @SuppressWarnings({ "rawtypes", "unchecked" })
    @Override
    public Map readUnReplySlipDatas(String maintablecode, String subtablecode, int maxdatasnum,String bankcode,
    		String bustype) throws AppException {
    	CommonDAO dao = (CommonDAO) ServiceFactory.getBean("bis.common.CommonDAO");
    	Map rt = new HashMap();
        // 查询 数据并锁定数据 如果maxdatasnum有值 则查询时带上rownum
      //如果1011和1107的区别
        String sql = "";
        List datas = null;
        if(bustype.equals("1107")){
        	sql = "select " + this.getQueryTableColumns(maintablecode) + " from " + maintablecode
                    + " t where nvl(t.cardreadstatus,0)=1 and nvl(t.cardreplyslipstatus,0)=0 and bankcode='"+bankcode+"'";
            if (maxdatasnum > 0) {
                sql += " and rownum<=" + maxdatasnum;
            }
            sql += " and iscard = '1'";
            sql += " for update";
            datas = dao.queryForList(sql);
            
            
            //把主表中的billcode转换成voucherno，为了报文对应
            Map datasmap = new HashMap();
            for(int m=0;m<datas.size();m++){
            	datasmap = (Map) datas.get(m);
            	datasmap.put("voucherno", datasmap.get("billcode"));
            	datasmap.remove("billcode");
            }
            // 如果主表数据非空，查询相应子表数据
            if (datas != null && datas.size() > 0) {
                addSubData(datas,subtablecode);
            }
            
        }
        if(bustype.equals("1011")){
        	sql = "select " + this.getQueryTableColumns(maintablecode) + " from " + maintablecode
                    + " t where nvl(t.bisreadstatus,0)=1 and nvl(t.bisreplyslipstatus,0)=0 and bisbankcode='"+bankcode+"'";
            if (maxdatasnum > 0) {
                sql += " and rownum<=" + maxdatasnum;
            }
            sql += " for update";
            List tempList = dao.queryForList(sql);
            String inSql = this.parseInSql2("guid", tempList);
            
            if (tempList != null && tempList.size() > 0) {
                //为了取出的和报文相同的数据，在此从视图中查找数据
                maintablecode = maintablecode.toLowerCase();
                String mainviewcode = maintablecode.replace("_t_", "_v_");
            	sql = "select * from " + mainviewcode + " t where " + inSql;
                if (maxdatasnum > 0) {
                    sql += " and rownum<=" + maxdatasnum;
                }
            }

            datas = dao.queryForList(sql);
            // 如果主表数据非空，查询相应子表数据
            subtablecode = subtablecode.toLowerCase();
            if (datas != null && datas.size() > 0) {
            	addSubData1(datas,subtablecode.replace("_t_", "_v_"));
            }
        }

        // 判断查寻到的数据条数是否等于maxdatasnum，如果等于则将iscomplete置为"TRUE",否则置为"FALSE"
        if (maxdatasnum > 0 && datas.size() == maxdatasnum) {
            rt.put("iscomplete", "FALSE");
        } else {
            rt.put("iscomplete", "TRUE");
        }
        rt.put("result", "SUCCESS");
        rt.put("datas", datas);

        return rt;
    }
    @SuppressWarnings({ "rawtypes", "unchecked" })
    @Override
    public Map replySlipDatas(String maintablecode, String subtablecode, List listmap,String bustype) throws AppException {
        Map rt = new HashMap();
        List datas = listmap;
        // 更新查到数据的读取状态
        if (datas.size() > 0) {
            String bisreplysliptime = BisUtil.getDate17(new Date());
            CommonDAO dao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
            String insql = this.parseInSql2("guid", datas);
            String checksql = "select count(*) num from "+maintablecode+" t where nvl(t.bisreadstatus,0)=1 and "+insql;
            int num = dao.getJdbcTemplate().queryForInt(checksql);
            if(listmap.size()!=num){
            	//返回无效的guid
            	String guid = "";
                Map map = new HashMap();
                String sql = "";
                List list = new ArrayList();
                String errormsg = "读取回执接口发送的";
            	for(int i=0;i<listmap.size();i++){
                	map = (Map) listmap.get(i);
                	guid = (String) map.get("guid");
                	sql = "select * from "+maintablecode+" t where nvl(t.bisreadstatus,0)=1 and guid='"+guid+"'";
                	list = dao.queryForList(sql);
                	if(list.size()==0){
                		if(i==listmap.size()-1){
                			errormsg += guid+"是无效数据！";
                		}else{
                			errormsg += guid+",";
                		}
                	}
                }
            	throw new AppException("0018",errormsg);
//            	throw new AppException("0018");
            }
            String sql = "";
            if(bustype.equals("1011")){
            	sql = "update "+maintablecode+" t set t.bisreplyslipstatus=1,t.bisreplysliptime='"+bisreplysliptime+"' where nvl(t.bisreadstatus,0)=1 and "+insql;
            }
            if(bustype.equals("1107")){
            	sql = "update "+maintablecode+" t set t.cardreplyslipstatus=1,t.cardreplysliptime='"+bisreplysliptime+"' where nvl(t.cardreadstatus,0)=1 and "+insql;
            }
            dao.update(sql);
        }
        rt.put("result", "SUCCESS");
        return rt;
    }

    @Override
    public Map sendDatas(String maintablecode, String subtablecode, List listmap) throws AppException {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Map cancelSendDatas(String maintablecode, String subtablecode, String cancelmaintablecode,
            String cancelsubtablecode, List listmap) throws AppException {
        // TODO Auto-generated method stub
        return null;
    }

}
