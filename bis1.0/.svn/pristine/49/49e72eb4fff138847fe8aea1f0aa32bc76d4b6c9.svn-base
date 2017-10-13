package gov.mof.fasp2.bis.businessTypeOperate;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import gov.mof.fasp2.bis.common.IAction;
import gov.mof.fasp2.bis.login.LoginCheckBO;
import gov.mof.fasp2.bis.util.BisUtil;

public class BusinessTypeAction implements IAction{
	private BusinessTypeBO businessTypeBO;
	
	
	public BusinessTypeBO getBusinessTypeBO() {
		return businessTypeBO;
	}

	public void setBusinessTypeBO(BusinessTypeBO businessTypeBO) {
		this.businessTypeBO = businessTypeBO;
	}

	@Override
	public boolean doAction(HttpServletRequest request,
			HttpServletResponse response, String servletpath, boolean isajax)
			throws Exception {
		if(isajax){
			//获取左侧树的数据
			List leftreeDate = getLefttreeData();
			BisUtil.ajaxPrint(BisUtil.objectToJson(leftreeDate), response);
		}   
		return false;
	}

	private List getLefttreeData() {
		List treeDate = businessTypeBO.getTreeDate();
		return treeDate;
		
	}

}
