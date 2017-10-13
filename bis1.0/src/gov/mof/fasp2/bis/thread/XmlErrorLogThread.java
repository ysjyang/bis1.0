/**
 * @Title: XmlErrorLogThread.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-24  钟毅
 */
 

package gov.mof.fasp2.bis.thread;

import gov.mof.fasp2.bis.common.CommonDAO;
import gov.mof.fasp2.bis.factory.ServiceFactory;

import java.util.Date;

/**
 * @ClassName: XmlErrorLogThread
 * @Description: Description of this class
 * @author <a href="mailto:zhongyi@szlongtu.com">钟毅</a>于 2016-5-24 下午05:03:00
 */

public class XmlErrorLogThread extends Thread{
    private String createtime;
    private String ip;
    private String xml ;
    private String errmsg;
    
    public String getCreatetime() {
        return createtime;
    }
    public void setCreatetime(String createtime) {
        this.createtime = createtime;
    }
    public String getIp() {
        return ip;
    }
    public void setIp(String ip) {
        this.ip = ip;
    }
    public String getXml() {
        return xml;
    }
    public void setXml(String xml) {
        this.xml = xml;
    }
    public String getErrmsg() {
        return errmsg;
    }
    public void setErrmsg(String errmsg) {
        this.errmsg = errmsg;
    }

    public void run(){
        
        CommonDAO dao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
        Object[] args = {this.getCreatetime(),this.getIp(),this.getXml(),this.getErrmsg()};
        dao.getJdbcTemplate().update("insert into BIS_T_LOGXMLERROR (CREATETIME, IP, XML, ERRMSG)" +
                " values (?, ?, ?, ?)", args);
    }
	@Override
	public String toString() {
		return "**************xml错误日志**********\n"
				+" 【createtime】=" + createtime + "\n 【ip】=" + ip
				+ "\n 【xml】=" + xml + "\n 【errmsg】=" + errmsg;
	}
    
}
