/**
 * @Title: BisLogUtil.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-24  钟毅
 */
 

package gov.mof.fasp2.bis.util;

import gov.mof.fasp2.bis.thread.BustypeErrorLogThread;
import gov.mof.fasp2.bis.thread.BustypeLogThread;
import gov.mof.fasp2.bis.thread.XmlErrorLogThread;
import gov.mof.fasp2.bis.thread.XmlLogThread;

import java.io.ByteArrayOutputStream;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * @ClassName: BisLogUtil
 * @Description: Description of this class
 * @author <a href="mailto:zhongyi@szlongtu.com">钟毅</a>于 2016-5-24 下午04:23:36
 */

public class BisLogUtil {
	private static final Log logger = LogFactory.getLog(BisLogUtil.class);
    
    /**
     * 错误报文日志
     * @param xml
     * @throws
     */
    public static void saveXmlLog(ByteArrayOutputStream baos,String ip){
        XmlLogThread xt = new XmlLogThread();
        xt.setBaos(baos);
        xt.setIp(ip);
        xt.setCreatetime(BisUtil.getDate17(new Date()));
        logger.debug(xt);
        xt.start();
    }
    /**
     * 错误报文日志
     * @param xml
     * @throws
     */
    public static void saveXmlErrorLog(String xml,String errmsg,String ip){
        XmlErrorLogThread xt = new XmlErrorLogThread();
        xt.setIp(ip);
        xt.setXml(xml);
        xt.setErrmsg(errmsg);
        xt.setCreatetime(BisUtil.getDate17(new Date()));
        logger.error(xt);
        xt.start();
    }
    /**
     * 保存业务日志（正常调用）
     * @param method 调用方法
     * @param bustype 业务类型
     * @param bankcode 银行编码
     * @param province 区划
     * @param year 年度
     * @param verifycode 验证码
     * @param listmap 输入数据
     * @param rt 返回数据
     * @throws
     */
    public static void saveBustypeLog(String method,String bustype, String bankcode, String province, String year, String verifycode,List listmap,Map rt){
        BustypeLogThread bt = new BustypeLogThread();
        bt.setMethod(method);
        bt.setBustype(bustype);
        bt.setBankcode(bankcode);
        bt.setProvince(province);
        bt.setYear(year);
        bt.setVerifycode(verifycode);
        bt.setListmap(listmap);
        bt.setRt(rt);
        bt.setCreatetime(BisUtil.getDate17(new Date()));
        logger.debug(bt);
        bt.start();
    }
    /**
     * 保存错误业务日志（异常调用）
     * @param method 调用方法
     * @param bustype 业务类型
     * @param bankcode 银行编码
     * @param province 区划
     * @param year 年度
     * @param verifycode 验证码
     * @param listmap 输入数据
     * @param rt 返回数据
     */
    public static void saveBustypeErrorLog(String method,String bustype, String bankcode, String province, String year, String verifycode,String errorno,String errormsg,String errorexpmsg,List listmap,Map rt){
        BustypeErrorLogThread bt = new BustypeErrorLogThread();
        bt.setMethod(method);
        bt.setBustype(bustype);
        bt.setBankcode(bankcode);
        bt.setProvince(province);
        bt.setYear(year);
        bt.setVerifycode(verifycode);
        bt.setErrorno(errorno);
        bt.setErrormsg(errormsg);
        bt.setErrorexpmsg(errorexpmsg);
        bt.setListmap(listmap);
        bt.setRt(rt);
        bt.setCreatetime(BisUtil.getDate17(new Date()));
        logger.error(bt);
        bt.start();
    }

}
