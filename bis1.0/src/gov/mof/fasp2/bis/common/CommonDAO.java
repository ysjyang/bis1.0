/**
 * @Title: CommonDAO.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-11  钟毅
 */
 

package gov.mof.fasp2.bis.common;

import gov.mof.fasp2.bis.cache.SysCache;
import gov.mof.fasp2.bis.exception.AppException;

import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.Clob;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

/**
 * @ClassName: CommonDAO
 * @Description: Description of this class
 * @author <a href="mailto:zhongyi@szlongtu.com">钟毅</a> 2016-5-11 10:43:34
 */

public class CommonDAO extends JdbcDaoSupport{
    
    public List queryForList(String sql){
        this.getJdbcTemplate().setFetchSize(100);
        return this.getJdbcTemplate().query(sql, new BisRowMapper());
    }
    /**
     * 查询
     * @param sql -查询语句
     * @param arg -条件 参数
     * @return    -查询结果
     * @throws
     */
    public List queryForList(String sql,Object[] args){
        this.getJdbcTemplate().setFetchSize(100);
        return this.getJdbcTemplate().query(sql, args, new BisRowMapper());
    }
    /**
     * 执行DDL语句
     * @param sql -DDL语句
     * @throws
     */
    public void execute(String sql){
        this.getJdbcTemplate().execute(sql);
    }
    /**
     * 分页查询
     * @param dto
     * @return
     * @throws
     */
    public PageQueryDTO queryPageForList(PageQueryDTO dto){
        
        String querysql = dto.getQuerySql();
        StringBuilder s = new StringBuilder();
        s.append("select count(1) from (").append(dto.getQuerySql()).append(")");
        int total = this.getJdbcTemplate().queryForInt(s.toString());
        dto.setTotal(total);
        int currentpage = dto.getCurrentPage();
        int numforpage = dto.getNumForPage();
        if(currentpage*numforpage>total){
            int mnum = total%numforpage;
            currentpage = (total-mnum)/numforpage;
            if(mnum>0||currentpage==0){
                currentpage = currentpage+1; 
            }
        }
        dto.setCurrentPage(currentpage);
        s = new StringBuilder();
        s.append("select * from (select T_T.*, ROWNUM R_RN from (");
        s.append(querysql);
        s.append(") T_T where ROWNUM <= ").append(currentpage*numforpage).append(") T_TT where T_TT.R_RN > ").append((currentpage-1)*numforpage);
        dto.setDatas(this.queryForList(s.toString()));
        return dto;
    }
    
    /**
     * 更新
     * @param sql
     * @param arg1
     * @param arg2
     * @throws
     */
    public int updateData(String sql,Object[] args){
        return this.getJdbcTemplate().update(sql,args);
    }
    /**
     * update
     * @param sql
     * @return
     * @throws
     */
    public int update(String sql){
        return this.getJdbcTemplate().update(sql);
    }
    
    /**
     * 批量保存.
     * @param dto
     * @param tabcode
     * @return
     * @throws AppException
     * @throws
     */
    public int saveAll(Collection<? extends Map> dto, String tablecode) throws AppException {
        if (tablecode == null) {
            throw new AppException("0000", "表名不能为空！");
        }
        StringBuilder vchsql = new StringBuilder();
        StringBuilder valuesql = new StringBuilder();
        vchsql.append("insert into ").append(tablecode).append("(");
        List list = new ArrayList();
        List l = SysCache.getTableColumnsCache(tablecode);
        Map m = null;
        boolean tag = true;
        String column_name = null;
        for(int i=0;i<l.size();i++){
            m = (Map)l.get(i);
            column_name =(String)m.get("column_name");
            if(tag){
                vchsql.append(column_name);
                valuesql.append("?");
                tag=false;
            }else{
                vchsql.append(",").append(column_name);
                valuesql.append(",?");
            }
        }
        vchsql.append(")values(");
        vchsql.append(valuesql);
        vchsql.append(")");
        for (Map id : dto) {
            List listDto = new ArrayList();
            for(int i=0;i<l.size();i++){
                m = (Map)l.get(i);
                column_name =(String)m.get("column_name");
                Object o = id.get(column_name.toLowerCase());
                if (o instanceof Enum) {
                    listDto.add(o.toString());
                } else {
                    listDto.add(o);
                }
            }
            list.add(listDto);
        }

        batchSingnalUpdate(vchsql.toString(), list);
        return list.size();
    }
    
    public int updateAllByPK(Collection<String> columns, Collection<? extends Map> dto, String pkcolumn, String tablecode)
            throws AppException {
        if (tablecode == null) {
            throw new AppException("0000", "表名不能为空！");
        }
        StringBuilder sb = new StringBuilder("update ");
        sb.append(tablecode);
        List<List> arr = new ArrayList<List>();
        int index = 0;
        sb.append(" set ");
        for (String c : columns) {
            if (!pkcolumn.equalsIgnoreCase(c)) {
                sb.append(" ").append(c).append("=?,");
                index = 0;
                for (Map m : dto) {
                    if (arr.size() == index) {
                        arr.add(new ArrayList());
                    }
                    List l = arr.get(index);
                    Object o = m.get(c.toLowerCase());
                    if (o instanceof Enum) {
                        l.add(o.toString());
                    } else {
                        l.add(o);
                    }
                    index++;
                }
            }
        }
        sb.delete(sb.length() - 1, sb.length());
        sb.append(" where " + pkcolumn + "=? ");
        index = 0;
        for (Map m : dto) {
            List l = arr.get(index++);
            l.add(m.get(pkcolumn));
        }
        this.batchSingnalUpdate(sb.toString(), arr);
        return arr.size();
    }
    /**
     * 批量方法
     * @param sql
     * @param mainVoucherSQLBuffer
     */
    public void batchSingnalUpdate(String sql, final List SQLBuffer) {
        if (SQLBuffer == null || SQLBuffer.isEmpty() || SQLBuffer.size() < 1) {
            return;
        }
        try {
            this.getJdbcTemplate().batchUpdate(sql, new BatchPreparedStatementSetter() {
    
                public int getBatchSize() {
                    return SQLBuffer.size();
                }
    
                public void setValues(PreparedStatement ps, int i) throws SQLException {
                    List params = (List) SQLBuffer.get(i);
                    for (int j = 0; j < params.size(); j++) {
                        Object o = params.get(j);
                        setValues2Type(ps, o, j);
                    }
                }
            });
    
        }
    
        catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }
    }
    
    /**
     * 用于设置sql语句中?传参的值
     * @param ps PreparedStatement
     * @param o 需要设置的值
     * @param index 需要设置值的位置
     * @throws SQLException
     */
    private void setValues2Type(PreparedStatement ps, Object o, int index) throws SQLException {
        if (null == o) {
            ps.setNull(index + 1, 0);
        } else if (o instanceof String) {
            ps.setString(index + 1, (o == null) ? null : String.valueOf(o));
        } else if (o instanceof java.sql.Date) {
            ps.setDate(index + 1, (java.sql.Date) o);
        } else if (o instanceof Integer) {
            ps.setInt(index + 1, ((Integer) o).intValue());
        } else if (o instanceof BigDecimal) {
            ps.setBigDecimal(index + 1, (BigDecimal) o);
        } else if (o instanceof Number) {
            ps.setBigDecimal(index + 1, new BigDecimal(o.toString()));
        } else if (o instanceof Clob) {
            ps.setClob(index + 1, (Clob) o);
        } else if (o instanceof Blob) {
            ps.setBlob(index + 1, (Blob) o);
        } else if (o instanceof java.sql.Timestamp) {
            ps.setTimestamp(index + 1, (java.sql.Timestamp) o);
        } else {
            ps.setString(index + 1, (o == null) ? null : String.valueOf(o));
        }
    }
    /*
     * 批量执行sql的inser和update
     */
    public void batchInsert(String[] sqllist){
    	this.getJdbcTemplate().batchUpdate(sqllist);
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

}
