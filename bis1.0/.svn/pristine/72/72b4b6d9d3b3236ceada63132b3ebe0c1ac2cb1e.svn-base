/**
 * @Title: AppException.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-11  钟毅
 */
 

package gov.mof.fasp2.bis.exception;

import gov.mof.fasp2.bis.cache.SysCache;

/**
 * @ClassName: AppException
 * @Description: Description of this class
 * @author <a href="mailto:zhongyi@szlongtu.com">钟毅</a>2016-5-11 04:28:46
 */

public class AppException extends Exception {
    
    private String errorno = null;
    private String errormsg = null;
    
    public String getErrorno() {
        return errorno;
    }

    public void setErrorno(String errorno) {
        this.errorno = errorno;
    }

    public String getErrormsg() {
        String msg = (String)SysCache.getErrorNoCache().get(errorno);
        if(msg==null&&!"0000".equals(errorno)){
            this.errormsg = "出现异常，单错误编码"+errorno+"不能识别！";;
        }
        if(this.errormsg!=null){
            msg = msg+" "+this.errormsg;
        }
        return msg;
    }

    public void setErrormsg(String errormsg) {
        this.errormsg = errormsg;
    }
    
    public AppException(String errorno,String errormsg){
        this.errorno = errorno;
        this.errormsg = errormsg;
    }
    
    public AppException(String errorno){
        this.errorno = errorno;
    }
    public void printStackTrace() {
        System.err.println("gov.mof.fasp2.bis.exception.AppException:"+this.getErrorno()+"-"+this.getErrormsg());
        super.printStackTrace();
    }

}
