/*jadclipse*/// Decompiled by Jad v1.5.8e2. Copyright 2001 Pavel Kouznetsov.

package com.caucho.burlap.server;

import gov.mof.fasp2.bis.util.BisLogUtil;
import gov.mof.fasp2.bis.util.BisUtil;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.GenericServlet;
import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;

import com.caucho.burlap.io.BurlapInput;
import com.caucho.burlap.io.BurlapOutput;
import com.caucho.services.server.Service;
import com.caucho.services.server.ServiceContext;

// Referenced classes of package com.caucho.burlap.server:
//            BurlapSkeleton

public class BurlapServlet extends GenericServlet
{

    protected static Logger logger4j = Logger.getLogger(BurlapServlet.class);
    
    public BurlapServlet()
    {
    }

    public String getServletInfo()
    {
        return "Burlap Servlet";
    }

    public void setService(Object service)
    {
        _service = service;
    }

    public void setAPIClass(Class apiClass)
    {
        _apiClass = apiClass;
    }

    public void init(ServletConfig config)
        throws ServletException
    {
        super.init(config);
        try
        {
            if(_service == null)
            {
                String className = getInitParameter("service-class");
                Class serviceClass = null;
                if(className != null)
                {
                    ClassLoader loader = Thread.currentThread().getContextClassLoader();
                    if(loader != null)
                        serviceClass = Class.forName(className, false, loader);
                    else
                        serviceClass = Class.forName(className);
                } else
                {
                    if(getClass().equals(BurlapServlet.class))
                        throw new ServletException("server must extend BurlapServlet");
                    serviceClass = getClass();
                }
                _service = serviceClass.newInstance();
                if(_service instanceof BurlapServlet)
                    ((BurlapServlet)_service).setService(this);
                if(_service instanceof Service)
                    ((Service)_service).init(getServletConfig());
                else
                if(_service instanceof Servlet)
                    ((Servlet)_service).init(getServletConfig());
            }
            if(_apiClass == null)
            {
                String className = getInitParameter("api-class");
                if(className != null)
                {
                    ClassLoader loader = Thread.currentThread().getContextClassLoader();
                    if(loader != null)
                        _apiClass = Class.forName(className, false, loader);
                    else
                        _apiClass = Class.forName(className);
                } else
                {
                    _apiClass = _service.getClass();
                }
            }
            _skeleton = new BurlapSkeleton(_service, _apiClass);
        }
        catch(ServletException e)
        {
            throw e;
        }
        catch(Exception e)
        {
            throw new ServletException(e);
        }
    }

    public void service(ServletRequest request, ServletResponse response)
        throws IOException, ServletException
    {
        Exception exception;
        HttpServletRequest req = (HttpServletRequest)request;
        HttpServletResponse res = (HttpServletResponse)response;
        if(!req.getMethod().equals("POST"))
        {
            res.setStatus(500, "Burlap Requires POST");
            PrintWriter out = res.getWriter();
            res.setContentType("text/html");
            out.println("<h1>Burlap Requires POST</h1>");
            return;
        }
        String serviceId = req.getPathInfo();
        String objectId = req.getParameter("id");
        if(objectId == null)
            objectId = req.getParameter("ejbid");
        ServiceContext.begin(req, res, serviceId, objectId);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();  
        java.io.InputStream is = request.getInputStream();
        byte[] buffer = new byte[1024];  
        int len;  
        while ((len = is.read(buffer)) > -1 ) {  
            baos.write(buffer, 0, len);  
        }  
        baos.flush();
        try
        {
            java.io.OutputStream os = response.getOutputStream();
            BurlapInput in = new BurlapInput(new ByteArrayInputStream(baos.toByteArray()));
            BurlapOutput out = new BurlapOutput(os);
            _skeleton.invoke(in, out);
            BisLogUtil.saveXmlLog(baos,getIpAddress((HttpServletRequest)request));
        }
        catch(Throwable e)
        {
            String body = IOUtils.toString(new ByteArrayInputStream(baos.toByteArray()));
            String errmsg = BisUtil.exceptionToString(e);
            logger4j.error("输入报文："+body);
            logger4j.error("错误信息："+errmsg);
            BisLogUtil.saveXmlErrorLog(body,errmsg,getIpAddress((HttpServletRequest)request));
            java.io.OutputStream os = response.getOutputStream();
            os.write(("<burlap:reply><map><type></type><string>result</string><string>ERROR</string><string>errorno</string><string>0000</string><string>errormsg</string><string>"+e.getMessage().replaceAll("<", "&lt;").replaceAll(">", "&gt;")+"</string></map></burlap:reply>").getBytes("UTF-8"));
            throw new ServletException(e);
        }
        finally
        {
            ServiceContext.end();
        }
        ServiceContext.end();
//        break MISSING_BLOCK_LABEL_191;
//        throw exception;
    }
    
    public static String getIpAddress(HttpServletRequest request) { 
        String ip = request.getHeader("x-forwarded-for"); 
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
          ip = request.getHeader("Proxy-Client-IP"); 
        } 
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
          ip = request.getHeader("WL-Proxy-Client-IP"); 
        } 
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
          ip = request.getHeader("HTTP_CLIENT_IP"); 
        } 
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
          ip = request.getHeader("HTTP_X_FORWARDED_FOR"); 
        } 
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
          ip = request.getRemoteAddr(); 
        } 
        return ip; 
      } 


    private Class _apiClass;
    private Object _service;
    private BurlapSkeleton _skeleton;
}


/*
    DECOMPILATION REPORT

    Decompiled from: D:\workspace_bis\bis1.0\WebRoot\WEB-INF\lib\hessian-4.0.37.jar
    Total time: 81 ms
    Jad reported messages/errors:
The class file version is 49.0 (only 45.3, 46.0 and 47.0 are supported)
Overlapped try statements detected. Not all exception handlers will be resolved in the method service
Couldn't resolve all block labels in method service
    Exit status: 0
    Caught exceptions:
*/