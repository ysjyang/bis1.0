/**
 * @Title: BustypeQueryDAO.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-30  胡川
 */
 

package gov.mof.fasp2.bis.bustypequery;

import gov.mof.fasp2.bis.cache.SysCache;
import gov.mof.fasp2.bis.common.CommonDAO;
import gov.mof.fasp2.bis.common.PageQueryDTO;
import gov.mof.fasp2.bis.login.LoginCheckAction;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @ClassName: BustypeQueryDAO
 * @Description: Description of this class
 * @author <a href="mailto:huchuan@szlongtu.com">胡川</a>于 2016-5-30 上午11:56:55
 */

public class BustypeQueryDAO {
    private CommonDAO commonDao;
    
    public CommonDAO getCommonDao() {
        return commonDao;
    }

    public void setCommonDao(CommonDAO commonDao) {
        this.commonDao = commonDao;
    }

    /**.
     * 分页查询所选业务类型数据
     * @param dto 分页对象
     * @param code 业务类型
     * @param begindate 开始日期
     * @param enddate 结束日期
     * @return
     * @throws
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public PageQueryDTO findData(PageQueryDTO dto,String code,String begindate,String enddate,String year,String province){

        String sql = "select a.maintablecode,a.subtablecode from bis_t_bustype a  where a.code=?";
        List<Map> l = commonDao.queryForList(sql, new Object[]{code});
        String maintablecode ="";
        String subtablecode = null;
        if(l!=null&&l.size()>0){
            Map m = (HashMap)l.get(0);
            maintablecode = (String)m.get("maintablecode");
            subtablecode = (String)m.get("subtablecode");
        }
        if(subtablecode!=null&&subtablecode.length()>0){
            
        }
        maintablecode = maintablecode+"_"+province+"_"+year;
        String sqll = "select "+this.getQueryTableColumns(maintablecode)+" from "+maintablecode
                + " t where biscreatetime>" + begindate + " and biscreatetime<"
                + enddate + " order by biscreatetime";
        dto.setQuerySql(sqll);
        return commonDao.queryPageForList(dto);
    }
    /**
     * 分页查询所选业务类型数据   查询日期为空的情况
     * @param dto
     * @param code
     * @return
     * @throws
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public PageQueryDTO findData(PageQueryDTO dto,String code,String year,String province){

        String sql = "select a.maintablecode,a.subtablecode from bis_t_bustype a  where a.code=?";
        List<Map> l = commonDao.queryForList(sql, new Object[]{code});
        String maintablecode ="";
        String subtablecode = null;
        if(l!=null&&l.size()>0){
            Map m = (HashMap)l.get(0);
            maintablecode = (String)m.get("maintablecode");
            subtablecode = (String)m.get("subtablecode");
        }
        if(subtablecode!=null&&subtablecode.length()>0){
            
        }
        maintablecode = maintablecode+"_"+province+"_"+year;
        String sqll = "select "+this.getQueryTableColumns(maintablecode)+" from "+maintablecode;
        
        StringBuilder s = new StringBuilder();
        s.append("select ").append(this.getQueryTableColumns(maintablecode)).append(" from ");
        s.append(maintablecode);
        dto.setQuerySql(s.toString());
        return commonDao.queryPageForList(dto);
    }
    /**
     * 测试用户分页查询所选业务类型数据   查询日期为空的情况
     * @param dto
     * @param code
     * @return
     * @throws
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public PageQueryDTO findTestData(PageQueryDTO dto,String code,String year,String province){

        String sql = "select a.maintablecode,a.subtablecode from bis_t_bustype a  where a.code=?";
        List<Map> l = commonDao.queryForList(sql, new Object[]{code});
        String maintablecode ="";
        String subtablecode = null;
        if(l!=null&&l.size()>0){
            Map m = (HashMap)l.get(0);
            maintablecode = (String)m.get("maintablecode");
            subtablecode = (String)m.get("subtablecode");
        }
        if(subtablecode!=null&&subtablecode.length()>0){
            
        }
        maintablecode = maintablecode+"_"+province+"_"+year;
        String sqll = "select "+this.getQueryTestTableColumns(maintablecode)+" from "+maintablecode;
        
        StringBuilder s = new StringBuilder();
        s.append("select ").append(this.getQueryTestTableColumns(maintablecode)).append(" from ");
        s.append(maintablecode);
        dto.setQuerySql(s.toString());
        return commonDao.queryPageForList(dto);
    }
    /**.
     * 查询所有业务类型
     * @return
     * @throws
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public List findAllBusType(){
        String sql = "select a.code,a.name,nvl2(a.subtablecode,1,0) sub from bis_t_bustype a order by a.code";
        List options = commonDao.queryForList(sql);
        return options;
    }

    /**
     * 根据主表guid，查询相应子表数据
     * @param code 业务类型
     * @param mainguid  主表guid
     * @return
     * @throws
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public List findSubDatas(String code, String mainguid,String year,String province) {
        //查询是否主子表名
        String sql = "select a.maintablecode,a.subtablecode from bis_t_bustype a  where a.code=?";
        List<Map> l = commonDao.queryForList(sql, new Object[]{code});
        String maintablecode ="";
        String subtablecode = null;
        if(l!=null&&l.size()>0){
            Map m = (HashMap)l.get(0);
            maintablecode = (String)m.get("maintablecode");
            subtablecode = (String)m.get("subtablecode");
        }
        
        //查询所有子表记录
        StringBuilder s = new StringBuilder();
        s.append("select * from ").append(subtablecode).append("_").append(province).append("_").append(year);
        s.append(" where mainguid=").append("'").append(mainguid).append("'");
        return commonDao.queryForList(s.toString());
    }

    /**
     * 根据业务类型，查询主表表头
     * @param code 业务类型
     * @return
     * @throws
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
	public List findTableCols(String code) {
        //查询主子表名
        String sql = "select a.maintablecode,a.subtablecode from bis_t_bustype a  where a.code=?";
        List<Map> l = commonDao.queryForList(sql, new Object[]{code});
        String maintablecode ="";
        if(l!=null&&l.size()>0){
            Map m = (HashMap)l.get(0);
            maintablecode = ((String)m.get("maintablecode")).toUpperCase();
        }
        //查询 表的列和列名
        String sql2="select lower(a.columncode) code,name from bis_t_tablecolumn a where a.tablecode=?";
        List l2 = commonDao.queryForList(sql2, new Object[]{maintablecode});
        return l2;
    }
    /**
     * 根据业务类型，查询子表表头
     * @param code 业务类型
     * @return
     * @throws
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
	public List findSubTableCols(String code) {
        //查询主子表名
        String sql = "select a.maintablecode,a.subtablecode from bis_t_bustype a  where a.code=?";
        List<Map> l = commonDao.queryForList(sql, new Object[]{code});
        String subtablecode = "";
        
        if(l!=null&&l.size()>0){
            Map m = (HashMap)l.get(0);
            subtablecode = ((String)m.get("subtablecode")).toUpperCase();
        }
        //查询 表的列和列名
        String sql2="select lower(a.columncode) code,name from bis_t_tablecolumn a where a.tablecode=?";
        List l2 = commonDao.queryForList(sql2, new Object[]{subtablecode});
        return l2;
    }
    
    /**
     * 根据表名，查询表的所有列
     * @param tablecode 表名
     * @return
     * @throws
     */
    @SuppressWarnings("rawtypes")
	public String getQueryTableColumns(String tablecode){
        StringBuffer s = new StringBuffer();
        List l = SysCache.getTableColumnsCache(tablecode);
        Map m = null;
        boolean tag = true;
        String column_name = null;
        for(int i=0;i<l.size();i++){
            m = (Map)l.get(i);
            column_name =(String)m.get("column_name");
            if("BISCREATETIME".equals(column_name)||"BISREADSTATUS".equals(column_name)||"BISREADTIME".equals(column_name)||"BISREPLYSLIPSTATUS".equals(column_name)||"BISREPLYSLIPTIME".equals(column_name)){
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
     * 测试用户根据表名，查询表的所有列
     * @param tablecode 表名
     * @return
     * @throws
     */
    @SuppressWarnings("rawtypes")
	public String getQueryTestTableColumns(String tablecode){
        StringBuffer s = new StringBuffer();
        List l = SysCache.getTableColumnsCache(tablecode);
        Map m = null;
        boolean tag = true;
        String column_name = null;
        for(int i=0;i<l.size();i++){
            m = (Map)l.get(i);
            column_name =(String)m.get("column_name");
//            if("BISCREATETIME".equals(column_name)||"BISREADSTATUS".equals(column_name)||"BISREADTIME".equals(column_name)||"BISREPLYSLIPSTATUS".equals(column_name)||"BISREPLYSLIPTIME".equals(column_name)){
//                continue;
//            }
            if(tag){
                s.append(column_name);
                tag=false;
            }else{
                s.append(",").append(column_name);
            }
        }
        return s.toString();
    }
    /**.
     * 查询所有年度
     * @return
     * @throws
     */
    @SuppressWarnings("rawtypes")
	public List findAllYears() {
        String sql = "select year from bis_t_year order by year";
        List years = commonDao.queryForList(sql);
        return years;
    }
    /**
     * 查询所有的省份
     * @return
     */
	@SuppressWarnings("rawtypes")
	public List findProvince() {
	    //获取当前用户的区划
	    String username = (String) LoginCheckAction.curuser_name.get("username");
	    String sql = "select province from bis_t_user where code = '"+username+"' and usertype='1'";
	    List sqlList = commonDao.queryForList(sql);
	    String province = (String) ((Map)sqlList.get(0)).get("province");
	    //本级权限
	    if(province.endsWith("00")){
	    	province = province.substring(0, province.length()-2);
	    }
		String sql1 = "select guid,code,name,levelno,isleaf,superguid " +
				"from bis_t_province m start with m.code=" + province +
				"connect by m.superguid=prior m.guid ORDER BY CODE";
		List sqlList1 = commonDao.queryForList(sql1);
		return sqlList1;
	}
}
