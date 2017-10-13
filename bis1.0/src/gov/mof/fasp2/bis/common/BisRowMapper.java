/**
 * @Title: BisRowMapper.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-11  钟毅
 */
 

package gov.mof.fasp2.bis.common;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Clob;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.io.IOUtils;
import org.springframework.jdbc.core.RowMapper;

/**
 * @ClassName: BisRowMapper
 * @Description: Description of this class
 * @author <a href="mailto:zhongyi@szlongtu.com">钟毅</a>2016-5-11 09:18:39
 */

public class BisRowMapper implements RowMapper{

    @Override
    public Object mapRow(ResultSet rs, int arg1) throws SQLException {
        Map dto = new HashMap();
        ResultSetMetaData rsmd = rs.getMetaData();
        int count = rsmd.getColumnCount();
        String col = null;
        Object obj = null;
        String colclass = null;
        for (int is = 0; is < count; is++) {
            col = rsmd.getColumnName(is + 1);
            colclass = rsmd.getColumnClassName(is + 1);
            if(colclass.indexOf("String")!=-1){
                obj = rs.getObject(col);
                if(obj==null){
                    obj="";
                }
                dto.put(col.toLowerCase(), obj);
            }else if(col.equals("AMT")){
            	obj = rs.getObject(col);
            	if(obj==null){
                    obj="0";
                }
                dto.put(col.toLowerCase(), ""+obj);
            }else if(colclass.indexOf("CLOB")!=-1){
            	Clob clob = rs.getClob(col);//java.sql.Clob
                String detailinfo = "";
                if(clob != null){
                 detailinfo = clob.getSubString((long)1,(int)clob.length());
                }
                dto.put(col.toLowerCase(), detailinfo);
            }else if(colclass.indexOf("Clob")!=-1){
            	Clob clob = rs.getClob(col);//java.sql.Clob
                String detailinfo = "";
                if(clob != null){
                 detailinfo = clob.getSubString((long)1,(int)clob.length());
                }
                dto.put(col.toLowerCase(), detailinfo);
            }else{
            	obj = rs.getObject(col);
            	if(obj==null){
                    obj="";
                }
            	dto.put(col.toLowerCase(), obj);
            }
        }
        return dto;
    }

    
}
