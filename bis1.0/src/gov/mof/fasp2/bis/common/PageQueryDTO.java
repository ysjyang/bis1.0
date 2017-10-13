/**
 * @Title: PageQueryDTO.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-25  钟毅
 */
 

package gov.mof.fasp2.bis.common;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @ClassName: PageQueryDTO
 * @Description: Description of this class
 * @author <a href="mailto:zhongyi@szlongtu.com">钟毅</a>于 2016-5-25 上午09:27:20
 */

public class PageQueryDTO extends HashMap{
    
    public PageQueryDTO(Map m){
        this.putAll(m);
    }
    
    private final String CURRENTPAGE = "currentpage";//当前页
    private final String NUMFORPAGE = "numforpage";//每页数据条数
    private final String TOTAL = "total";//总条数
    private final String DATAS = "datas";//数据
    private final String QUERYSQL = "querysql";//查询数据sql
    
    public String getQuerySql() {
        return (String)this.get(QUERYSQL);
    }
    public void setQuerySql(String querysql) {
        this.put(QUERYSQL, querysql);
    }
    public List getDatas() {
        return (List)this.get(DATAS);
    }
    public void setDatas(List datas) {
        this.put(DATAS, datas);
    }
    
    public int getCurrentPage() {
        Number n = (Number)this.get(CURRENTPAGE);
        if(n==null){
            n = new Integer(0);
            this.put(CURRENTPAGE, n);
        }
        return n.intValue();
    }
    public void setCurrentPage(int currentpage) {
        this.put(CURRENTPAGE, new Integer(currentpage));
    }
    
    public int getNumForPage() {
        Number n = (Number)this.get(NUMFORPAGE);
        if(n==null){
            n = new Integer(0);
            this.put(NUMFORPAGE, n);
        }
        return n.intValue();
    }
    public void setNumForPage(int numforpage) {
        this.put(NUMFORPAGE, new Integer(numforpage));
    }
    
    public int getTotal() {
        Number n = (Number)this.get(TOTAL);
        if(n==null){
            n = new Integer(0);
            this.put(TOTAL, n);
        }
        return n.intValue();
    }
    public void setTotal(int total) {
        this.put(TOTAL, new Integer(total));
    }
    

}
