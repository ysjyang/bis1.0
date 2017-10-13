package gov.mof.fasp2.bis.serviceaddress;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import gov.mof.fasp2.bis.bustypequery.BustypeQueryBO;
import gov.mof.fasp2.bis.common.IAction;
import gov.mof.fasp2.bis.util.BisUtil;

public class serviceaddressAction implements IAction{

	private ServiceAddressBO serviceAddressBO;
    
    
    public ServiceAddressBO getServiceAddressBO() {
        return serviceAddressBO;
    }


    public void setServiceAddressBO(ServiceAddressBO serviceAddressBO) {
        this.serviceAddressBO = serviceAddressBO;
    }
	@Override
	public boolean doAction(HttpServletRequest request,
			HttpServletResponse response, String servletpath, boolean isajax)
			throws Exception {
		if(isajax){
			 String ip = request.getParameter("ip");
	         String port = request.getParameter("port");
	         String rt=serviceAddressBO.updateData(ip, port);
	         BisUtil.ajaxPrint(rt, response);
		}
		return true;
	}

}
