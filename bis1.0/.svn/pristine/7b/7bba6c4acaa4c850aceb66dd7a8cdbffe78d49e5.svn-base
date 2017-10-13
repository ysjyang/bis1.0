package gov.mof.fasp2.bis.businessTypeOperate;

import gov.mof.fasp2.bis.common.CommonDAO;
import gov.mof.fasp2.bis.login.LoginCheckAction;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

public class BusinessTypeDAO {
	private CommonDAO commonDAO;
	
	
	public CommonDAO getCommonDAO() {
		return commonDAO;
	}


	public void setCommonDAO(CommonDAO commonDAO) {
		this.commonDAO = commonDAO;
	}


	public List getTreeDate() {
	    //获取当前用户的区划
	    String username = (String) LoginCheckAction.curuser_name.get("username");
	    String sql = "select province from bis_t_user where name = '"+username+"' and usertype='1'";
	    List sqlList = commonDAO.queryForList(sql);
	    String province = (String) ((Map)sqlList.get(0)).get("province");
	    if(province.endsWith("00")){
	        province= province.substring(0,province.length()-2);
	    }
	    sql = "select guid,code,name,levelno,isleaf,superguid " +
                "from bis_t_province m start with m.code=" + province +
                "connect by m.superguid=prior m.guid ORDER BY CODE";
//	    //获取区划对应的级别
//	    sql= "select guid,levelno from BIS_T_PROVINCE where code='"+province+"'";
//	    sqlList = commonDAO.queryForList(sql);
//	    Map map = new HashMap();
//	    map= (Map)sqlList.get(0);
//	    BigDecimal levelno = (BigDecimal) map.get("levelno");
//	    String guid = (String) map.get("guid");
//	    if(levelno.compareTo(new BigDecimal("1"))==0){
//	        sql = "select guid,code,name,levelno,isleaf,superguid from BIS_T_PROVINCE";
//	    }
//	    if(levelno.compareTo(new BigDecimal("2"))==0){
//            //先找出第三级的guid
//	        sql = "select * from BIS_T_PROVINCE where superguid ='"+guid+"'";
//	        sqlList = commonDAO.queryForList(sql);
//	        String guid2 = (String) ((Map)sqlList.get(0)).get("guid");
//	        
//	        sql = "select guid,code,name,levelno,isleaf,superguid from";
//            sql +=" (select * from BIS_T_PROVINCE where code='"+province+"'";
//            sql +=" union ";
//            sql +=" select * from BIS_T_PROVINCE where superguid ='"+guid+"'";
//            sql +=" union ";
//            sql +=" select * from BIS_T_PROVINCE where superguid ='"+guid2+"')";
//        }
//	    if(levelno.compareTo(new BigDecimal("3"))==0){
//            sql = "select guid,code,name,levelno,isleaf,superguid from";
//            sql +=" (select * from BIS_T_PROVINCE where code='"+province+"'";
//            sql +=" union ";
//            sql +=" select * from BIS_T_PROVINCE where superguid='"+guid+"')";
//        }
//	    if(levelno.compareTo(new BigDecimal("4"))==0){
//            sql = "select guid,code,name,levelno,isleaf,superguid from BIS_T_PROVINCE where code='"+province+"'";
//        }
		sqlList = commonDAO.queryForList(sql);
		return sqlList;
	}

}
