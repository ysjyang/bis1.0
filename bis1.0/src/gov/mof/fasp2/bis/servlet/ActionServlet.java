package gov.mof.fasp2.bis.servlet;

import gov.mof.fasp2.bis.cache.SysCache;
import gov.mof.fasp2.bis.common.IAction;
import gov.mof.fasp2.bis.factory.ServiceFactory;
import gov.mof.fasp2.bis.util.BisUtil;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ActionServlet  extends HttpServlet{
    private static final long serialVersionUID = 6713227962366741507L;
     protected void service(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException{
            long starttime = System.currentTimeMillis() ;
            boolean isajax = false;
            String servletpath = request.getServletPath().toLowerCase();
            System.out.println("==BEGIN=="+servletpath+"  "+this.getUrl3(request));
            
            try {
                if(servletpath.endsWith(".ajax")){
                    isajax = true;
                }
                Map requestConfigCache = (Map)SysCache.getRequestConfigCache().get(servletpath);
                if(requestConfigCache==null){
                    throw new Exception("URL="+servletpath+"在REQUESTCONFIG中未注册!");
                }
                String actionBeanid = (String)requestConfigCache.get("actionbeanid");
                IAction action = null;
                
                try {
                    action = (IAction)ServiceFactory.getBean(actionBeanid);
                } catch (Exception e) {
                    e.printStackTrace();
                    throw new Exception("ActionBeanid="+actionBeanid+"无效!");
                }
                
                boolean rt = action.doAction(request, response, servletpath, isajax);
                if(rt&&!isajax){
                    String forwardurl = (String)requestConfigCache.get("forward");
                    if(forwardurl==null){
                        throw new Exception("URL="+servletpath+"的FORWARD在REQUESTCONFIG中未注册!");
                    }
                    BisUtil.forward(request, response, forwardurl);
                }
            } catch (Exception e) {
                e.printStackTrace();
                if(isajax){
                    try {
                        Map m = new HashMap();
                        m.put("error", "1");
                        m.put("info", exceptionToStringAjax(e));
                        BisUtil.ajaxPrint(BisUtil.objectToJson(m), response);
                    } catch (Exception e1) {
                        e1.printStackTrace();
                    }
                }else{
                    request.setAttribute("syserrormsg", e);
                    this.forward("/error.jsp",request, response);
                    return;
                }
            }
            System.out.println("===END==="+servletpath+" "+(System.currentTimeMillis()-starttime)+" "+BisUtil.getDate23(new Date()));
        }
        
        /**
         * 
         * @param url
         * @param request
         * @param response
         * @throws ServletException
         * @throws IOException
         */
        private void forward(String url,HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException{
            request.getRequestDispatcher(url).forward(request, response);
        }
        
        private String exceptionToStringAjax(Exception e){
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw, true);
            e.printStackTrace(pw);
            pw.flush();
            sw.flush();
            return sw.toString();
        }
        
        public String getUrl3(HttpServletRequest req) {
            String scheme = req.getScheme();             // http
            String serverName = req.getServerName();     // hostname.com
            int serverPort = req.getServerPort();        // 80
            String contextPath = req.getContextPath();   // /mywebapp
            String servletPath = req.getServletPath();   // /servlet/MyServlet
            String pathInfo = req.getPathInfo();         // /a/b;c=123
            String queryString = req.getQueryString();          // d=789

            // Reconstruct original requesting URL
            String url = scheme+"://"+serverName+":"+serverPort+contextPath+servletPath;
            if (pathInfo != null) {
            url += pathInfo;
            }
            if (queryString != null) {
            url += "?"+queryString;
            }
            return url;
            }
}