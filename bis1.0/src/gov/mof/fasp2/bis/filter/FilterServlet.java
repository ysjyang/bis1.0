package gov.mof.fasp2.bis.filter;

import gov.mof.fasp2.bis.util.BisUtil;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class FilterServlet extends HttpServlet implements Filter {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	public void doFilter(ServletRequest arg0, ServletResponse arg1,
			FilterChain arg2) throws IOException, ServletException {
		// 如果未登陆请求页面，则跳转到登陆页面
		HttpServletRequest request=(HttpServletRequest)arg0;      
        HttpServletResponse response  =(HttpServletResponse) arg1;       
        HttpSession session = request.getSession();        
        String guid = (String) session.getAttribute("currentUserguid");
        if(guid!=null){
        	 //将请求转发给过滤器链上下一个对象。这里的下一个指的是下一个filter，如果没有filter那就是你请求的资源
            arg2.doFilter(arg0, arg1); 
            return;
        }else{
        	//session中的guid为空或者不是为登陆页面（后续考虑其他如注册页面等特殊页面）
        	if(!(request.getRequestURI().equals("/bis/login.do"))&&!(request.getRequestURI().equals("/bis/loginCheck.ajax"))){
            	//请求页面都是以.do的方式访问
            	response.sendRedirect("/bis/login.do");
            	return;
            }
        	arg2.doFilter(arg0, arg1); 
        	return;
        }
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
	}

}
