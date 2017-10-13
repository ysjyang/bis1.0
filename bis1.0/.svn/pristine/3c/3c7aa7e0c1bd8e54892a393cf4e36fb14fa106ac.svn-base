package gov.mof.fasp2.bis.createTable;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import gov.mof.fasp2.bis.common.IAction;
import gov.mof.fasp2.bis.util.BisUtil;

public class YearDatasAction implements IAction{
	private CurrentTableDAO currentTableDAO;
	
	public CurrentTableDAO getCurrentTableDAO() {
		return currentTableDAO;
	}

	public void setCurrentTableDAO(CurrentTableDAO currentTableDAO) {
		this.currentTableDAO = currentTableDAO;
	}

	@Override
	public boolean doAction(HttpServletRequest request,
			HttpServletResponse response, String servletpath, boolean isajax)
			throws Exception {
		if(isajax){
			List list= currentTableDAO.getYear();
			BisUtil.ajaxPrint(BisUtil.objectToJson(list), response);
		}
		return false;
	}

}
