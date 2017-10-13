/**
 * @Title: XmlLogThread.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-24  钟毅
 */
 

package gov.mof.fasp2.bis.thread;

import gov.mof.fasp2.bis.common.CommonDAO;
import gov.mof.fasp2.bis.factory.ServiceFactory;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Date;

import org.apache.commons.io.IOUtils;

/**
 * @ClassName: XmlLogThread
 * @Description: Description of this class
 * @author <a href="mailto:zhongyi@szlongtu.com">钟毅</a>于 2016-5-24 下午05:31:07
 */

public class XmlLogThread extends Thread{
    private ByteArrayOutputStream baos;
    private String ip;
    private String createtime;
    public String getCreatetime() {
        return createtime;
    }
    public void setCreatetime(String createtime) {
        this.createtime = createtime;
    }
    public ByteArrayOutputStream getBaos() {
        return baos;
    }
    public void setBaos(ByteArrayOutputStream baos) {
        this.baos = baos;
    }
    public String getIp() {
        return ip;
    }
    public void setIp(String ip) {
        this.ip = ip;
    }
    public void run(){
        try {
            String body = IOUtils.toString(new ByteArrayInputStream(baos.toByteArray()));
            
            CommonDAO dao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
            Object[] args = {this.getCreatetime(),this.getIp(),body};
            dao.getJdbcTemplate().update("insert into bis_t_logxml (CREATETIME, IP, XML)" +
                    " values (?, ?, ?)", args);
        
        
        } catch (Exception e1) {
            e1.printStackTrace();
        }
    }
	@Override
	public String toString() {
		return "**************xml报文日志**************\n"
				+" 【baos】=" + baos + "\n 【ip】=" + ip + "\n 【createtime】="
				+ createtime + "]";
	}
    
}
