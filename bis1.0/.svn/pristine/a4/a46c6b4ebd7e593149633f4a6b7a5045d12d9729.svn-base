/**
 * @Title: BustypeLogThread.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-24  钟毅
 */
 

package gov.mof.fasp2.bis.thread;

import gov.mof.fasp2.bis.common.CommonDAO;
import gov.mof.fasp2.bis.factory.ServiceFactory;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @ClassName: BustypeLogThread
 * @Description: Description of this class
 * @author <a href="mailto:zhongyi@szlongtu.com">钟毅</a>于 2016-5-24 下午04:45:09
 */

public class BustypeLogThread extends Thread{
    private String createtime;
    private String method;
    private String bustype;
    private String bankcode;
    private String province;
    private String year;
    private String verifycode;
    private List listmap;
    private Map rt;
    public String getMethod() {
        return method;
    }
    public void setMethod(String method) {
        this.method = method;
    }
    public String getBustype() {
        return bustype;
    }
    public void setBustype(String bustype) {
        this.bustype = bustype;
    }
    public String getBankcode() {
        return bankcode;
    }
    public void setBankcode(String bankcode) {
        this.bankcode = bankcode;
    }
    public String getProvince() {
        return province;
    }
    public void setProvince(String province) {
        this.province = province;
    }
    public String getYear() {
        return year;
    }
    public void setYear(String year) {
        this.year = year;
    }
    public String getVerifycode() {
        return verifycode;
    }
    public void setVerifycode(String verifycode) {
        this.verifycode = verifycode;
    }
    public List getListmap() {
        return listmap;
    }
    public void setListmap(List listmap) {
        this.listmap = listmap;
    }
    public Map getRt() {
        return rt;
    }
    public void setRt(Map rt) {
        this.rt = rt;
    }
    public String getCreatetime() {
        return createtime;
    }
    public void setCreatetime(String createtime) {
        this.createtime = createtime;
    }
    public void run(){
        CommonDAO dao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
        Object[] args = {this.getCreatetime(),this.getMethod(),this.getBustype(),this.getBankcode(),this.getProvince(),this.getYear(),this.getVerifycode(),""+this.getListmap(),""+this.getRt()};
        dao.getJdbcTemplate().update("insert into bis_t_logbus (CREATETIME, METHOD, BUSTYPE, BANKCODE, PROVINCE, YEAR, VERIFYCODE, LISTMAP, RT)" +
                " values (?, ?, ?, ?, ?, ?, ?, ?,?)", args);
    }
	@Override
	public String toString() {
		return "BustypeLogThread [createtime=" + createtime + ", method="
				+ method + ", bustype=" + bustype + ", bankcode=" + bankcode
				+ ", province=" + province + ", year=" + year + ", verifycode="
				+ verifycode + ", listmap=" + listmap + ", rt=" + rt + "]";
	}
}
