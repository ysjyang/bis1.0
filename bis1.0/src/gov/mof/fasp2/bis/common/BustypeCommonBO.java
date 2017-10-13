/**
 * @Title: CommonBO.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-11  钟毅
 */
 

package gov.mof.fasp2.bis.common;

import gov.mof.fasp2.bis.cache.SysCache;
import gov.mof.fasp2.bis.cache.VerifyCodeCache;
import gov.mof.fasp2.bis.exception.AppException;
import gov.mof.fasp2.bis.factory.ServiceFactory;
import gov.mof.fasp2.bis.util.BisUtil;
import gov.mof.fasp2.bis.util.MD5Util;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

/**
 * @ClassName: CommonBO
 * @Description: Description of this class
 * @author <a href="mailto:zhongyi@szlongtu.com">钟毅</a>2016-5-11 02:41:01
 */

public abstract class BustypeCommonBO{

    /**
     * 登录接口.
     * @param username 用户名
     * @param password 密码
     * @return 登录成功或失败信息。
     *         Map中包含三个key：
     *         1、result，值为“SUCCESS”或“ERROR”
     *         2、verifycode，值为string类型的验证码
     *         3、errormsg，值为string类型错误信息
     */
    @Transactional(rollbackFor=Exception.class)
    public Map login(String username, String password) throws AppException {
        Map m = new HashMap();
        String realpassword = (String)SysCache.getUserNameCache().get(username);
        if(realpassword==null){
            throw new AppException("0001");
        }
        try {
            if(realpassword.equals(MD5Util.digest(password))){
                m.put("result", "SUCCESS");
                m.put("verifycode", VerifyCodeCache.getVerifyCode());
            }else{
                throw new AppException("0001");
            }
        } catch (NoSuchAlgorithmException e1) {
            e1.printStackTrace();
            throw new AppException("0000",BisUtil.exceptionToString(e1,1800));
        }
        return m;
    }
    
    /**
     * 修改密码接口.
     * @param username 用户名
     * @param password 密码
     * @return 登录成功或失败信息。
     *         Map中包含三个key：
     *         1、result，值为“SUCCESS”或“ERROR”
     *         2、verifycode，值为string类型的验证码
     *         3、errormsg，值为string类型错误信息
     */
    @Transactional(rollbackFor=Exception.class)
    public Map modifyPassword(String username,String oldpassword,String newpassword) throws AppException {
        Map m = new HashMap();
        String realpassword = (String)SysCache.getUserNameCache().get(username);
        if(realpassword==null){
            throw new AppException("0001");
        }
        try {
            if(realpassword.equals(MD5Util.digest(oldpassword))){
               String realnewpassword = MD5Util.digest(newpassword);
               CommonDAO dao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
               dao.update("update bis_t_user t set t.password='"+realnewpassword+"' where t.code='"+username+"' and t.usertype=2");
               m.put("result", "SUCCESS");
               SysCache.refreshUserNameCache();
            }else{
                throw new AppException("0001");
            }
        } catch (NoSuchAlgorithmException e1) {
            e1.printStackTrace();
            throw new AppException("0000",BisUtil.exceptionToString(e1,1800));
        }
        return m;
    }
    
    /**
     * 读取未读取凭证接口.
     * @param bustype 业务类型
     * @param bankcode 银行编码
     * @param province 区划
     * @param year 年度
     * @param verifycode 验证码
     * @return 返回类型是Map。
     *         Map中包含五个key：
     *          1、result，值为“SUCCESS”或“ERROR”
     *          2、datas，值为List<map>格式的数据集
     *          3、errorno，错误编码
     *          4、errormsg，值为string类型错误信息
     *          5、iscomplete，本次是否已经全部读取，值为“TRUE”和“FALSE”。
     *               如果值为“FALSE”银行应该继续发起读取请求。
     *               出现值为“FASLE”的情况是因为数据量大而进行拆包传输。
     */
    @Transactional(rollbackFor=Exception.class)
    public Map readVou(String bustype,String bankcode,String province,String year,String verifycode) throws AppException {
        this.checkVerifyCode(verifycode);
        Map bustypemap = (Map)SysCache.getBustypeCache().get(bustype);
        Number maxdatasnum = (Number)SysCache.getBustypeConfigCache().get(bustype+"-"+province+"-1");
        if(maxdatasnum==null){
            throw new AppException("0017");
        }
        if(maxdatasnum.intValue()==0){
            maxdatasnum = (Number)bustypemap.get("maxdatasnum");
            if(maxdatasnum==null){
                maxdatasnum = new Integer(0);
            }
        }
        String maintablecode = (String)bustypemap.get("maintablecode");
        String subtablecode = (String)bustypemap.get("subtablecode");
        Map m = this.readDatas(maintablecode+"_"+province+"_"+year, subtablecode+"_"+province+"_"+year, maxdatasnum.intValue(),bankcode,bustype);
        return m;
    }
    /**
     * 读取未读取数据.
     * @param maintablecode 主表
     * @param subtablecode 子表
     * @param maxdatasnum 最大读取数
     * @return
     * @throws AppException
     * @throws
     */
    public abstract Map readDatas(String maintablecode,String subtablecode,int maxdatasnum,String bankcode,String bustype) throws AppException; 
    
    /**
     * 读取已读取未回执凭证接口.
     * @param bustype 业务类型
     * @param bankcode 银行编码
     * @param province 区划
     * @param year 年度
     * @param verifycode 验证码
     * @return 返回类型是Map。
     *         Map中包含五个key：
     *          1、result，值为“SUCCESS”或“ERROR”
     *          2、datas，值为List<map>格式的数据集
     *          3、errorno，错误编码
     *          4、errormsg，值为string类型错误信息
     *          5、iscomplete，本次是否已经全部读取，值为“TRUE”和“FALSE”。
     *               如果值为“FALSE”银行应该继续发起读取请求。
     *               出现值为“FASLE”的情况是因为数据量大而进行拆包传输。
     */
    @Transactional(rollbackFor=Exception.class)
    public Map readUnReplySlipVou(String bustype,String bankcode,String province,String year,String verifycode) throws AppException {
        this.checkVerifyCode(verifycode);
        Map bustypemap = (Map)SysCache.getBustypeCache().get(bustype);
        Number maxdatasnum = (Number)SysCache.getBustypeConfigCache().get(bustype+"-"+province+"-1");
        if(maxdatasnum==null){
            throw new AppException("0017");
        }
        if(maxdatasnum.intValue()==0){
            maxdatasnum = (Number)bustypemap.get("maxdatasnum");
            if(maxdatasnum==null){
                maxdatasnum = new Integer(0);
            }
        }
        String maintablecode = (String)bustypemap.get("maintablecode");
        String subtablecode = (String)bustypemap.get("subtablecode");
        Map m = this.readUnReplySlipDatas(maintablecode+"_"+province+"_"+year, subtablecode+"_"+province+"_"+year, maxdatasnum.intValue(),bankcode,bustype);
        return m;
    }
    /**
     * 读取已发送未回执数据
     * @param maintablecode 主表
     * @param subtablecode 子表
     * @param maxdatasnum 最大读取数
     * @return
     * @throws AppException
     * @throws
     */
    public abstract Map readUnReplySlipDatas(String maintablecode,String subtablecode,int maxdatasnum,String bankcode,String bustype) throws AppException; 
    
    /**
     * 读取成功后回执接口.
     * @param bustype 业务类型
     * @param bankcode 银行编码
     * @param province 区划
     * @param year 年度
     * @param verifycode 验证码
     * @param listmap 确认数据，map中内容一定要有个主键，一般为guid.
     * @return 返回类型是Map。
     *          Map中包含三个key：
     *          1、result，值为“SUCCESS”或“ERROR”
     *          2、errorno，错误编码
     *          3、errormsg，值为string类型错误信息
     */
    @Transactional(rollbackFor=Exception.class)
    public Map replySlipVou(String bustype,String bankcode,String province,String year,String verifycode,List listmap) throws AppException {
        this.checkVerifyCode(verifycode);
        Number maxdatasnum = (Number)SysCache.getBustypeConfigCache().get(bustype+"-"+province+"-1");
        if(maxdatasnum==null){
            throw new AppException("0017");
        }
        Map bustypemap = (Map)SysCache.getBustypeCache().get(bustype);
        String maintablecode = (String)bustypemap.get("maintablecode");
        String subtablecode = (String)bustypemap.get("subtablecode");
        Map m = this.replySlipDatas(maintablecode+"_"+province+"_"+year, subtablecode+"_"+province+"_"+year, listmap,bustype);
        return m;
    }
    /**
     * 回执数据
     * @param maintablecode 主表
     * @param subtablecode 子表
     * @param listmap 数据
     * @return
     * @throws AppException
     * @throws
     */
    public abstract Map replySlipDatas(String maintablecode,String subtablecode,List listmap,String bustype) throws AppException; 
    
    /**
     * 发送凭证接口.
     * @param bustype 业务类型
     * @param bankcode 银行编码
     * @param province 区划
     * @param year 年度
     * @param verifycode 验证码
     * @param listmap 凭证列表.
     * @return 返回类型是Map。
     *          Map中包含三个key：
     *          1、result，值为“SUCCESS”或“ERROR”
     *          2、errorno，错误编码
     *          3、errormsg，值为string类型错误信息
     *          4、datas，值为List<map>格式的数据集
     */
    @Transactional(rollbackFor=Exception.class)
    public Map sendVou(String bustype,String bankcode,String province,String year,String verifycode,List listmap) throws AppException {
        this.checkVerifyCode(verifycode);
        Number maxdatasnum = (Number)SysCache.getBustypeConfigCache().get(bustype+"-"+province+"-1");
        if(maxdatasnum==null){
            throw new AppException("0017");
        }
        
        //银行发送数据主子表都加上bisbankcode数据。
        if(bustype.startsWith("1")){
            Map temp = null;
            Map subtemp = null;
            List sublist = new ArrayList();
            List tempSublist = new ArrayList();
            for(int i=0;i<listmap.size();i++){
            	temp = (Map)listmap.get(i);
                String bisbankcode = temp.get("bisbankcode")+"";
                if("null".equals(bisbankcode) || "".equals(bisbankcode)){
                	temp.put("bisbankcode", bankcode);
                }
                tempSublist = (List)temp.get("sublist");
                if(tempSublist!=null && tempSublist.size()>0){
                	for (int j = 0; j < tempSublist.size(); j++) {
                		subtemp = (Map)tempSublist.get(j);
                		String subBisbankcode = subtemp.get("bisbankcode")+"";
                        if("null".equals(subBisbankcode) || "".equals(subBisbankcode)){
                        	subtemp.put("bisbankcode", bankcode);
                        }
    				}
                	sublist.addAll(tempSublist);
                }
            }
        }
//        /**
//         * 临时处理支付发送数据为2016的--开始
//         */
//        if(bustype.startsWith("2")){
//        	  Map temp = null;
//              Map subtemp = null;
//              List sublist = new ArrayList();
//              List tempSublist = new ArrayList();
//              for(int i=0;i<listmap.size();i++){
//              	temp = (Map)listmap.get(i);
//                  String datayear = temp.get("year")+"";
//                  if(!"null".equals(datayear)){
//                  	temp.put("year", "2016");
//                  }
//                  tempSublist = (List)temp.get("sublist");
//                  if(tempSublist!=null && tempSublist.size()>0){
//                  	for (int j = 0; j < tempSublist.size(); j++) {
//                  		subtemp = (Map)tempSublist.get(j);
//                  		String subdatayear = subtemp.get("year")+"";
//                          if(!"null".equals(subdatayear)){
//                          	subtemp.put("year", "2016");
//                          }
//      				}
//                  	sublist.addAll(tempSublist);
//                  }
//              }
//        }
//        /**
//         * 临时处理发送数据为2016的--结束
//         */
        Map bustypemap = (Map)SysCache.getBustypeCache().get(bustype);
        String maintablecode = (String)bustypemap.get("maintablecode");
        String subtablecode = (String)bustypemap.get("subtablecode");
        Map m = this.sendDatas(maintablecode+"_"+province+"_"+year, subtablecode+"_"+province+"_"+year,listmap);
        return m;
    }
    /**
     * 发送数据
     * @param maintablecode 主表
     * @param subtablecode 子表
     * @param listmap 数据
     * @return
     * @throws AppException
     * @throws
     */
    public abstract Map sendDatas(String maintablecode,String subtablecode,List listmap) throws AppException; 
    
    /**
     * 取消发送凭证接口.
     * @param bustype 业务类型
     * @param bankcode 银行编码
     * @param province 区划
     * @param year 年度
     * @param verifycode 验证码
     * @param elementcodelist List<String>类型数据.
     * @return 返回类型是Map。
     *          Map中包含三个key：
     *          1、result，值为“SUCCESS”或“ERROR”
     *          2、errorno，错误编码
     *          3、errormsg，值为string类型错误信息
     */
    @Transactional(rollbackFor=Exception.class)
    public synchronized Map cancelSendVou(String bustype,String bankcode,String province,String year,String verifycode,List listmap) throws AppException {
        this.checkVerifyCode(verifycode);
        Number maxdatasnum = (Number)SysCache.getBustypeConfigCache().get(bustype+"-"+province+"-1");
        if(maxdatasnum==null){
            throw new AppException("0017");
        }
        
        //银行发送数据主子表都加上bisbankcode数据。
        if(bustype.startsWith("1")){
            Map temp = null;
            Map subtemp = null;
            List sublist = new ArrayList();
            List tempSublist = new ArrayList();
            for(int i=0;i<listmap.size();i++){
            	temp = (Map)listmap.get(i);
                String bisbankcode = temp.get("bisbankcode")+"";
                if("null".equals(bisbankcode) || "".equals(bisbankcode)){
                	temp.put("bisbankcode", bankcode);
                }
                tempSublist = (List)temp.get("sublist");
                if(tempSublist!=null && tempSublist.size()>0){
                	for (int j = 0; j < tempSublist.size(); j++) {
                		subtemp = (Map)tempSublist.get(j);
                		String subBisbankcode = subtemp.get("bisbankcode")+"";
                        if("null".equals(subBisbankcode) || "".equals(subBisbankcode)){
                        	subtemp.put("bisbankcode", bankcode);
                        }
    				}
                	sublist.addAll(tempSublist);
                }
            }
        }
        
        Map bustypemap = (Map)SysCache.getBustypeCache().get(bustype);
        String maintablecode = (String)bustypemap.get("maintablecode");
        String subtablecode = (String)bustypemap.get("subtablecode");
        String cancelsendbustype = (String)bustypemap.get("cancelsendbustype");
        Map cancelbustypemap = (Map)SysCache.getBustypeCache().get(cancelsendbustype);
        String cancelmaintablecode = (String)cancelbustypemap.get("maintablecode");
        String cancelsubtablecode = (String)cancelbustypemap.get("subtablecode");
        Map m = this.cancelSendDatas(maintablecode+"_"+province+"_"+year, subtablecode+"_"+province+"_"+year,cancelmaintablecode+"_"+province+"_"+year, cancelsubtablecode+"_"+province+"_"+year,listmap);
        return m;
    }
    /**
     * 取消发送数据
     * @param maintablecode 主表
     * @param subtablecode 子表
     * @param cancelmaintablecode 被取消数据所在主表
     * @param cancelsubtablecode 被取消数据所在子表
     * @param listmap 取消数据
     * @return
     * @throws AppException
     * @throws
     */
    public abstract Map cancelSendDatas(String maintablecode,String subtablecode,String cancelmaintablecode,String cancelsubtablecode,List listmap) throws AppException; 
    
    /**
     * 查询基础数据版本.
     * @param bustype 业务类型
     * @param bankcode 银行编码
     * @param province 区划
     * @param year 年度
     * @param verifycode 验证码
     * @param elementcodelist 要素编码列表
     * @return  返回类型是Map。
     *          Map中包含三个key：
     *          1、result，值为“SUCCESS”或“ERROR”
     *          2、errorno，错误编码
     *          3、errormsg，值为string类型错误信息
     *          4、key为elementcode值为version的多个键值对。 
     */
    @Transactional(rollbackFor=Exception.class)
    public Map queryElelementVersion(String bustype,String bankcode,String province,String year,String verifycode,List elementcodelist) throws AppException {
        this.checkVerifyCode(verifycode);
        Number maxdatasnum = (Number)SysCache.getBustypeConfigCache().get(bustype+"-"+province+"-1");
        if(maxdatasnum==null){
            throw new AppException("0017");
        }
        if(elementcodelist==null||elementcodelist.size()==0){
            throw new AppException("0009");
        }
        CommonDAO dao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
        String sql = "select t.elementcode, nvl(t1.version,0) version "
			+"from (select elementcode from bis_t_elements where status='1' and "+this.parseInSql1("elementcode",elementcodelist)+") t "
			+"left join (select elementcode ,version from bis_t_versions  where province='"+province+"' and year='"+year+"') t1 "
			+"on upper(t.elementcode) = upper(t1.elementcode)";
        System.out.println("==sql="+sql);
        List l = dao.queryForList(sql);
        System.out.println("===l="+l);
        if(l==null || l.size()!=elementcodelist.size()){
            throw new AppException("0009");
        }
        Map m = new HashMap();
        m.put("result", "SUCCESS");
        Map tm = null;
        for(int i=0;i<l.size();i++){
            tm = (Map)l.get(i);
            m.put(tm.get("elementcode"), tm.get("version"));
        }
        return m;
    }
    
    /**
     * 查询基础数据
     * @param bustype 业务类型
     * @param bankcode 银行编码
     * @param province 区划
     * @param year 年度
     * @param verifycode 验证码
     * @param elementcode 要素编码
     * @param seq 顺序号
     * @return 返回类型是Map。
     *         Map中包含五个key：
     *          1、result，值为“SUCCESS”或“ERROR”
     *          2、datas，值为List<map>格式的数据集
     *          3、errorno，错误编码
     *          4、errormsg，值为string类型错误信息
     *          5、iscomplete，本次是否已经全部读取，值为“TRUE”和“FALSE”。
     *               如果值为“FALSE”银行应该继续发起读取请求。
     *               出现值为“FASLE”的情况是因为数据量大而进行拆包传输。
     */
    @Transactional(rollbackFor=Exception.class)
    public Map queryElelement(String bustype,String bankcode,String province,String year,String verifycode,String elementcode,String seq) throws AppException {
        this.checkVerifyCode(verifycode);
        Number maxdatasnum = (Number)SysCache.getBustypeConfigCache().get(bustype+"-"+province+"-1");
        if(maxdatasnum==null){
            throw new AppException("0017");
        }
        CommonDAO dao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
        String sql = "select t.tablecode from bis_t_elements t where t.status = 1 and t.elementcode ='"+elementcode+"'";
        List l = dao.queryForList(sql);
        if(l==null||l.size()==0){
            throw new AppException("0009");
        }
        Map m = (Map)l.get(0);
        String tablecode = (String)m.get("tablecode");
        int intseq = 0;
        try {
        	intseq = Integer.parseInt(seq);
        } catch (NumberFormatException e) {
            e.printStackTrace();
            throw new AppException("0010");
        }
        Map bustypemap = (Map)SysCache.getBustypeCache().get(bustype);
        maxdatasnum = (Number)bustypemap.get("maxdatasnum");
        if(maxdatasnum==null){
            maxdatasnum = new Integer(0);
        }
        int intmaxdatasnum = maxdatasnum.intValue();
        if(intmaxdatasnum==0){
        	if("BANKACCOUNT".equals(elementcode.toUpperCase())){
        		sql = "select "+this.getCols(elementcode)+" from "+tablecode+" t where t.seq >="+intseq 
        				+" and t.year='" + year + "' and t.province in('87','00','"+province
        				+"') and bankaccounttype in ('003','004','001') order by t.seq ";
        	}else{
        		sql = "select "+this.getCols(elementcode)+" from "+tablecode+" t where t.seq >="+intseq 
        				+" and t.year='"+year+"' and t.province in('87','00','"+province+"') order by t.seq ";
        	}
        }else{
        	if("BANKACCOUNT".equals(elementcode.toUpperCase())){
        		sql = "select "+this.getCols(elementcode)+" from (select * from "+tablecode+" t where t.seq >="
        				+intseq+" and t.year='"+year+"' and t.province in('87','00','"+province
        				+"') and bankaccounttype in ('003','004','001') order by t.seq ) where rownum <="+intmaxdatasnum;
        	}else{
        		sql = "select "+this.getCols(elementcode)+" from (select * from "+tablecode+" t where t.seq >="
        				+intseq+" and t.year='"+year+"' and t.province in('87','00','"+province
        				+"') order by t.seq ) where rownum <="+intmaxdatasnum;
        	}
        }
        l = dao.queryForList(sql);
        
        //seq的number类型转成String类型
        Map elementsmap = null;
        for (int i=0;i<l.size();i++){
        	elementsmap = (Map)l.get(i);
        	elementsmap.put("seq", elementsmap.get("seq")+"");
        }
        
        Map rt = new HashMap();
        if(intmaxdatasnum>0&&l.size()==intmaxdatasnum){
            rt.put("iscomplete", "FALSE");
        }else{
            rt.put("iscomplete", "TRUE"); 
        }
        rt.put("result", "SUCCESS");
        rt.put("datas", l);
        
        return rt;
    }
    
    public String getCols(String elementcode){
        String cls = "code,name,parentcode,levelno,isleaf,seq";
        if("bankaccount".equals(elementcode)){
            cls=cls+",bankaccounttype,bankcode,agencycode,agencyname,collecbankcode";
        }
        return cls;
    }

    /**
     * 校验验证码.
     * @param verifycode
     * @throws AppException
     * @throws
     */
    public void checkVerifyCode(String verifycode) throws AppException{
        boolean checkVerifyCode = VerifyCodeCache.checkVerifyCode(verifycode);
        if(!checkVerifyCode){
            throw new AppException("0002");
        }
    }
    
    /**
     * 获得查询字段，字段中去掉了bis开头的系统字段。
     * @param tablecode
     * @return
     * @throws
     */
    public String getQueryTableColumns(String tablecode){
        StringBuffer s = new StringBuffer();
        List l = SysCache.getTableColumnsCache(tablecode);
        Map m = null;
        boolean tag = true;
        String column_name = null;
        for(int i=0;i<l.size();i++){
            m = (Map)l.get(i);
            column_name =(String)m.get("column_name");
            if("BISBANKCODE".equals(column_name)||"BISCREATETIME".equals(column_name)||"BISREADSTATUS".equals(column_name)	
            		||"BISREADTIME".equals(column_name)||"BISREPLYSLIPSTATUS".equals(column_name)
            		||"BISREPLYSLIPTIME".equals(column_name)||"CARDREADSTATUS".equals(column_name)
            		||"CARDREPLYSLIPSTATUS".equals(column_name)||"CARDREPLYSLIPTIME".equals(column_name)
            		||"CARDREADSTATUS".equals(column_name)||"ISCARD".equals(column_name)
            		||("".equals(column_name)&&"".equals(tablecode))){
                continue;
            }
            if(tag){
                s.append(column_name);
                tag=false;
            }else{
                s.append(",").append(column_name);
            }
        }
        return s.toString();
    }
    
    /**
     * 获得保存字段，即所有字段。
     * @param tablecode
     * @return
     * @throws
     */
    public String getSaveTableColumns(String tablecode){
        StringBuffer s = new StringBuffer();
        List l = SysCache.getTableColumnsCache(tablecode);
        Map m = null;
        boolean tag = true;
        String column_name = null;
        for(int i=0;i<l.size();i++){
            m = (Map)l.get(i);
            column_name =(String)m.get("column_name");
            if(tag){
                s.append(column_name);
                tag=false;
            }else{
                s.append(",").append(column_name);
            }
        }
        return s.toString();
    }
    
    /**
     * 将过长的in语句解析成or语句
     * @return or和in语句
     */
    public String parseInSql1(String colcode,Collection<String> guids){
        StringBuilder vchsql = new StringBuilder();
        vchsql.append(colcode).append(" in( ");
        int index = 0;
        Iterator iterator = guids.iterator();
        for (;iterator.hasNext();) {
            index++;
            vchsql.append("'").append(iterator.next()).append("'");
            if (index == 998) {
                index = 0;
                vchsql.append(") or ").append(colcode).append(" in (");
            } else {
                if(iterator.hasNext()){
                    vchsql.append(",");
                }
            }
        }
        return vchsql.append(")").toString();
    }
    /**
     * 将过长的in语句解析成or语句
     * @return or和in语句
     */
    public String parseInSql2(String colcode,Collection<? extends Map> datas){
        StringBuilder vchsql = new StringBuilder();
        vchsql.append(colcode).append(" in( ");
        int index = 0;
        Iterator iterator = datas.iterator();
        Map m = null;
        String guid = null;
        for (;iterator.hasNext();) {
            m = (Map)iterator.next();
            guid = (String)m.get(colcode);
            index++;
            vchsql.append("'").append(guid).append("'");
            if (index == 998 && iterator.hasNext()) {
                index = 0;
                vchsql.append(") or ").append(colcode).append(" in (");
            } else {
                if(iterator.hasNext()){
                    vchsql.append(",");
                }
            }
        }
        return vchsql.append(")").toString();
    }
    
    /**
     * 
     * @param colcode 需要查询的列名
     * @param datasColcode 数据集中的列名
     * @param datas 数据集
     * @return
     * @throws
     */
    public String parseInSql3(String colcode, String datasColcode,Collection<? extends Map> datas){
        StringBuilder vchsql = new StringBuilder();
        vchsql.append(colcode).append(" in( ");
        int index = 0;
        Iterator iterator = datas.iterator();
        Map m = null;
        String guid = null;
        for (;iterator.hasNext();) {
            m = (Map)iterator.next();
            guid = (String)m.get(datasColcode);
            index++;
            vchsql.append("'").append(guid).append("'");
            if (index == 998) {
                index = 0;
                vchsql.append(") or ").append(colcode).append(" in (");
            } else {
                if(iterator.hasNext()){
                    vchsql.append(",");
                }
            }
        }
        return vchsql.append(")").toString();
    }
    
    /**
     * 组织联合主键查询or语句
     * @param colcode1 联合主键字段1
     * @param colcode2 联合主键字段2
     * @param datas 数据
     * @return
     */
    public String parseInSql4(String colcode1,String colcode2,Collection<? extends Map> datas){
        StringBuilder vchsql = new StringBuilder();
        int index = 0;
        Iterator iterator = datas.iterator();
        Map m = null;
        String pk1 = null;
        String pk2 = null;
        for (;iterator.hasNext();) {
            m = (Map)iterator.next();
            pk1 = (String)m.get(colcode1);
            pk2 = (String)m.get(colcode2);
            if (index++ != 0) {
            	vchsql.append(" or ("+colcode1+" = '").append(pk1).append("' and "+colcode2+" = '").append(pk2).append("')");
            } else {
            	vchsql.append(" ("+colcode1+" = '").append(pk1).append("' and "+colcode2+" = '").append(pk2).append("')");
            }
        }
        return vchsql.toString();
    }
    /**
     * 组织联合主键查询or语句（有别名）
     * @param colcode1 联合主键字段1--数据字段名
     * @param colcode1as 联合主键字段1--表的字段名
     * @param colcode2 联合主键字段2
     * @param datas 数据
     * @return
     */
    public String parseInSql5(String colcode1,String colcode1as,String colcode2,Collection<? extends Map> datas){
        StringBuilder vchsql = new StringBuilder();
        int index = 0;
        Iterator iterator = datas.iterator();
        Map m = null;
        String pk1 = null;
        String pk2 = null;
        for (;iterator.hasNext();) {
            m = (Map)iterator.next();
            pk1 = (String)m.get(colcode1);
            pk2 = (String)m.get(colcode2);
            if (index++ != 0) {
            	vchsql.append(" or ("+colcode1as+" = '").append(pk1).append("' and "+colcode2+" = '").append(pk2).append("')");
            } else {
            	vchsql.append(" ("+colcode1as+" = '").append(pk1).append("' and "+colcode2+" = '").append(pk2).append("')");
            }
        }
        return vchsql.toString();
    }
    
    /**
     * 将过长的in语句解析成or语句
     * @return or和in语句
     */
    public String parseNotInSql2(String colcode,Collection<? extends Map> datas){
        StringBuilder vchsql = new StringBuilder();
        vchsql.append(colcode).append(" not in( ");
        int index = 0;
        Iterator iterator = datas.iterator();
        Map m = null;
        String guid = null;
        for (;iterator.hasNext();) {
            m = (Map)iterator.next();
            guid = (String)m.get(colcode);
            index++;
            vchsql.append("'").append(guid).append("'");
            if (index == 998) {
                index = 0;
                vchsql.append(") and ").append(colcode).append(" not in (");
            } else {
                if(iterator.hasNext()){
                    vchsql.append(",");
                }
            }
        }
        return vchsql.append(")").toString();
    }
    
    /**
     * 
     * @param colcode where条件后的字段
     * @param datasColcode 集合数据中的字段
     * @param datas 集合数据
     * @return
     */
    public String parseNotInSql3(String colcode,String datasColcode,Collection<? extends Map> datas){
        StringBuilder vchsql = new StringBuilder();
        vchsql.append(colcode).append(" not in( ");
        int index = 0;
        Iterator iterator = datas.iterator();
        Map m = null;
        String guid = null;
        for (;iterator.hasNext();) {
            m = (Map)iterator.next();
            guid = (String)m.get(datasColcode);
            index++;
            vchsql.append("'").append(guid).append("'");
            if (index == 998) {
                index = 0;
                vchsql.append(") and ").append(colcode).append(" not in (");
            } else {
                if(iterator.hasNext()){
                    vchsql.append(",");
                }
            }
        }
        return vchsql.append(")").toString();
    }
    
    /**
     * 从旧数据中找到新数据中不存在的key值,此方法目前在取消发送中使用!
     * @param oldlist
     * @param newlist
     * @param key
     * @return
     * @throws
     */
    public String getMissingDatas(List oldlist,List newlist,String key){
        StringBuffer s = new StringBuffer();
        Map tmp = new HashMap();
        Map m =null;
        for(int i=0;i<newlist.size();i++){
            m = (Map)newlist.get(i);
            tmp.put(m.get(key), "");
        }
        String guid = null;
        for(int i=0;i<oldlist.size();i++){
            m = (Map)oldlist.get(i);
            guid = (String)m.get(key);
            if(!tmp.containsKey(guid)){
                if(s.length()==0){
                    s.append(guid);
                }else{
                    s.append(",").append(guid);
                }
            }
        }
        return s.toString();
    }
    
    /**
     * 将子表数据插入到主表List中
     * @param datas 主表List
     * @param subtablecode 子表表名
     * @return 
     * @throws
     */
    public void addSubData(List<Map> datas, String subtablecode){
        CommonDAO dao = (CommonDAO) ServiceFactory.getBean("bis.common.CommonDAO");
        /*
         * 查询到所有主单的子单数据 查询时根据mainguid排序
         */

        // 根据guid查询所有主表数据
        String subsql = "select " + this.getQueryTableColumns(subtablecode) + " from " + subtablecode + " t where "
                + this.parseInSql3("mainguid", "guid",datas) + " order by t.mainguid for update";
        List subDatas = dao.queryForList(subsql);

        /*
         * 创建一个临时使用的hashmap对象，key是mainguid，value是List<Map>格式 数据，这个List<Map>是该mainguid对应的所有子单数据
         */
        Map<String, List<Map>> tempMap = new HashMap<String, List<Map>>();
        List<Map> data = null;
        /*
         * 对子单数据进行遍历 将子单数据放到上面的hashmap中。 （遍历时发现当前mainguid与上一次循环的mainguid不一样， 则new一个新的list<map>对象！）
         */
        String oldmainguid = null;
        for (int i = 0; i < subDatas.size(); i++) {
            Map map = (Map) subDatas.get(i);
            String mainguid = (String) map.get("mainguid");
            if (!mainguid.equals(oldmainguid)) {
                data = new ArrayList<Map>();
                tempMap.put(mainguid, data);
            }
            oldmainguid = mainguid;
            data.add(map);
        }
        // 遍历主单数据，用主单的guid（主单的guid就是子单的mainguid）值在hashmap中取出对应的子单数据，并将子单数据放到主单中。
        String guid = null;
        for (int i = 0; i < datas.size(); i++) {
            Map map = (Map) datas.get(i);
            guid = (String) map.get("guid");
            List<Map> sublist = tempMap.get(guid);
            map.put("sublist", sublist);
        }
    }
    
    
    
    /**
     * 将子视图表数据插入到主表List中
     * @param datas 主表List
     * @param subtablecode 子表表名
     * @return 
     * @throws
     */
    public void addSubData1(List<Map> datas, String subtablecode){
        CommonDAO dao = (CommonDAO) ServiceFactory.getBean("bis.common.CommonDAO");
        /*
         * 查询到所有主单的子单数据 查询时根据mainguid排序
         */

        // 根据guid查询所有主表数据
        String subsql = "select " + this.getQueryTableColumns(subtablecode) + " from " + subtablecode + " t where "
                + this.parseInSql3("mainguid", "guid",datas) + " order by t.mainguid for update";
        dao.queryForList(subsql);
        
        subsql = "select * from " + subtablecode.replace("_t_", "_v_") + " t where "
                + this.parseInSql3("mainguid", "guid",datas) + " order by t.mainguid";
        List subDatas = dao.queryForList(subsql);

        /*
         * 创建一个临时使用的hashmap对象，key是mainguid，value是List<Map>格式 数据，这个List<Map>是该mainguid对应的所有子单数据
         */
        Map<String, List<Map>> tempMap = new HashMap<String, List<Map>>();
        List<Map> data = null;
        /*
         * 对子单数据进行遍历 将子单数据放到上面的hashmap中。 （遍历时发现当前mainguid与上一次循环的mainguid不一样， 则new一个新的list<map>对象！）
         */
        String oldmainguid = null;
        for (int i = 0; i < subDatas.size(); i++) {
            Map map = (Map) subDatas.get(i);
            String mainguid = (String) map.get("mainguid");
            if (!mainguid.equals(oldmainguid)) {
                data = new ArrayList<Map>();
                tempMap.put(mainguid, data);
            }
            oldmainguid = mainguid;
            data.add(map);
        }
        // 遍历主单数据，用主单的guid（主单的guid就是子单的mainguid）值在hashmap中取出对应的子单数据，并将子单数据放到主单中。
        String guid = null;
        for (int i = 0; i < datas.size(); i++) {
            Map map = (Map) datas.get(i);
            guid = (String) map.get("guid");
            List<Map> sublist = tempMap.get(guid);
            map.put("sublist", sublist);
        }
    }
    
    /**
     * 公务卡退款通知单特殊处理
     * 将子表数据插入到主表List中
     * @param datas 主表List
     * @param subtablecode 子表表名
     * @return 
     * @throws
     */
    public void addSubData2(List<Map> datas, String subtablecode){
        CommonDAO dao = (CommonDAO) ServiceFactory.getBean("bis.common.CommonDAO");
        /*
         * 查询到所有主单的子单数据 查询时根据mainguid排序
         */

        // 根据billid查询所有主表数据
        String subsql = "select " + this.getQueryTableColumns(subtablecode) + " from " + subtablecode + " t where "
                + this.parseInSql3("mainguid", "billid",datas) + " order by t.mainguid for update";
        List subDatas = dao.queryForList(subsql);

        /*
         * 创建一个临时使用的hashmap对象，key是mainguid，value是List<Map>格式 数据，这个List<Map>是该mainguid对应的所有子单数据
         */
        Map<String, List<Map>> tempMap = new HashMap<String, List<Map>>();
        List<Map> data = null;
        /*
         * 对子单数据进行遍历 将子单数据放到上面的hashmap中。 （遍历时发现当前mainguid与上一次循环的mainguid不一样， 则new一个新的list<map>对象！）
         */
        String oldmainguid = null;
        for (int i = 0; i < subDatas.size(); i++) {
            Map map = (Map) subDatas.get(i);
            String mainguid = (String) map.get("mainguid");
            if (!mainguid.equals(oldmainguid)) {
                data = new ArrayList<Map>();
                tempMap.put(mainguid, data);
            }
            oldmainguid = mainguid;
            data.add(map);
        }
        // 遍历主单数据，用主单的billid（主单的guid就是子单的mainguid）值在hashmap中取出对应的子单数据，并将子单数据放到主单中。
        String guid = null;
        for (int i = 0; i < datas.size(); i++) {
            Map map = (Map) datas.get(i);
            guid = (String) map.get("billid");
            List<Map> sublist = tempMap.get(guid);
            map.put("sublist", sublist);
        }
    }
    /**.
     * 取消确认支付添加子表数据
     * @param datas
     * @param subtablecode
     */
    public void addSubData3(List<Map> datas, String subtablecode){
        CommonDAO dao = (CommonDAO) ServiceFactory.getBean("bis.common.CommonDAO");
        /*
         * 查询到所有主单的子单数据 查询时根据mainguid排序
         */

        // 根据guid查询所有主表数据
        String subsql = "select " + this.getQueryTableColumns(subtablecode) + " from " + subtablecode + " t where "
                + this.parseInSql5("guid","mainguid","biscanceltime",datas) + " order by t.mainguid for update";
        List subDatas = dao.queryForList(subsql);

        /*
         * 创建一个临时使用的hashmap对象，key是mainguid，value是List<Map>格式 数据，这个List<Map>是该mainguid对应的所有子单数据
         */
        Map<String, List<Map>> tempMap = new HashMap<String, List<Map>>();
        List<Map> data = null;
        /*
         * 对子单数据进行遍历 将子单数据放到上面的hashmap中。 （遍历时发现当前mainguid与上一次循环的mainguid不一样， 则new一个新的list<map>对象！）
         */
        String oldmainguid = null;
        for (int i = 0; i < subDatas.size(); i++) {
            Map map = (Map) subDatas.get(i);
            String mainguid = (String) map.get("mainguid");
            if (!mainguid.equals(oldmainguid)) {
                data = new ArrayList<Map>();
                tempMap.put(mainguid, data);
            }
            oldmainguid = mainguid;
            data.add(map);
        }
        // 遍历主单数据，用主单的guid（主单的guid就是子单的mainguid）值在hashmap中取出对应的子单数据，并将子单数据放到主单中。
        String guid = null;
        for (int i = 0; i < datas.size(); i++) {
            Map map = (Map) datas.get(i);
            guid = (String) map.get("guid");
            List<Map> sublist = tempMap.get(guid);
            map.put("sublist", sublist);
        }
    }
}
