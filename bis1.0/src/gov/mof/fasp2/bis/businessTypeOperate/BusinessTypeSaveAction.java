package gov.mof.fasp2.bis.businessTypeOperate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import gov.mof.fasp2.bis.cache.SysCache;
import gov.mof.fasp2.bis.common.IAction;
import gov.mof.fasp2.bis.json.JSONArray;
import gov.mof.fasp2.bis.json.JSONObject;
import gov.mof.fasp2.bis.json.JSONUtil;
import gov.mof.fasp2.bis.util.BisUtil;

public class BusinessTypeSaveAction implements IAction{
	private BusinessTypeSaveDAO businessTypeSaveDAO;
	
	
	
	@Override
	public boolean doAction(HttpServletRequest request,
			HttpServletResponse response, String servletpath, boolean isajax)
			throws Exception {
		Object tableData = new Object();
		List l = new ArrayList();
		if(isajax){
			Map m = new HashMap();
			Boolean saveSuccess = false;
			//获取json字符串
			String jsonString = request.getParameter("data");
			String province = request.getParameter("province");
			List dataList = new ArrayList();
			if(jsonString!=null){
				dataList =	(List) JSONUtil.JSONToObject(jsonString);
			}
			System.out.println(dataList);
			saveSuccess = businessTypeSaveDAO.saveTableData(dataList,province);
			SysCache.refreshBustypeConfigCache();
			m.put("loginSuccess", saveSuccess);
            BisUtil.ajaxPrint(BisUtil.objectToJson(m), response);
		}
		return false;
	}



	public BusinessTypeSaveDAO getBusinessTypeSaveDAO() {
		return businessTypeSaveDAO;
	}



	public void setBusinessTypeSaveDAO(BusinessTypeSaveDAO businessTypeSaveDAO) {
		this.businessTypeSaveDAO = businessTypeSaveDAO;
	}
}
