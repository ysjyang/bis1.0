package gov.mof.fasp2.bis.logManager;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import gov.mof.fasp2.bis.common.CommonDAO;
import gov.mof.fasp2.bis.common.IAction;
import gov.mof.fasp2.bis.util.BisUtil;

public class DeleteDataAction implements IAction{
	private QueryDataDAO queryDataDAO;
	@Override
	public boolean doAction(HttpServletRequest request,
			HttpServletResponse response, String servletpath, boolean isajax)
			throws Exception {
		if(isajax){
			String type = request.getParameter("type");
			String begintime = request.getParameter("begintime");
			String endtime = request.getParameter("endtime");
			Map map = queryDataDAO.deleteData(type,begintime,endtime);
			BisUtil.ajaxPrint(BisUtil.objectToJson(map), response);
		}
		return false;
	}
	public QueryDataDAO getQueryDataDAO() {
		return queryDataDAO;
	}
	public void setQueryDataDAO(QueryDataDAO queryDataDAO) {
		this.queryDataDAO = queryDataDAO;
	}

}
