package gov.mof.fasp2.bis.logManager;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import gov.mof.fasp2.bis.common.IAction;
import gov.mof.fasp2.bis.common.PageQueryDTO;
import gov.mof.fasp2.bis.util.BisUtil;

public class QueryDataAction implements IAction{
	private QueryDataDAO queryDataDAO;
	
	@Override
	public boolean doAction(HttpServletRequest request,
			HttpServletResponse response, String servletpath, boolean isajax)
			throws Exception {
		if(isajax){
			PageQueryDTO dto = new PageQueryDTO(new HashMap());
			dto.setNumForPage(10);   //设置默认每页显示记录数
	        dto.setCurrentPage(1);  //默认显示第一页
			String type = request.getParameter("type");
			String begintime = request.getParameter("begintime");
			String endtime = request.getParameter("endtime");
			PageQueryDTO list = queryDataDAO.queryData(dto,type,begintime,endtime);
			BisUtil.ajaxPrint(BisUtil.objectToJson(list), response);
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
