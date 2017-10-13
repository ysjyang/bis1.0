/**
 * @Title: ServiceFactory.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-11  钟毅
 */
 

package gov.mof.fasp2.bis.factory;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

/**
 * @ClassName: ServiceFactory
 * @Description: Description of this class
 * @author <a href="mailto:zhongyi@szlongtu.com">钟毅</a> 2016-5-11 11:00:06
 */

public class ServiceFactory implements ApplicationContextAware{

    
    protected static ApplicationContext ctx = null;

    public static Object getBean(final String beanid) {
        return ServiceFactory.ctx.getBean(beanid);
    }
    
    public void setApplicationContext(ApplicationContext newctx) throws BeansException {
        ServiceFactory.ctx = newctx;
    }

}
