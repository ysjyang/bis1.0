package gov.mof.fasp2.bis.createTable;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import gov.mof.fasp2.bis.common.IAction;
import gov.mof.fasp2.bis.common.PageQueryDTO;
import gov.mof.fasp2.bis.util.BisUtil;

public class CurrentTableAction implements IAction{
	private CurrentTableDAO currentTableDAO;
	
	@Override
	public boolean doAction(HttpServletRequest request,
			HttpServletResponse response, String servletpath, boolean isajax)
			throws Exception {
		if(isajax){
			PageQueryDTO dto = new PageQueryDTO(new HashMap());
			dto.setNumForPage(10);   //设置默认每页显示记录数
	        dto.setCurrentPage(1);  //默认显示第一页
			PageQueryDTO list= currentTableDAO.getCurrentTable(dto);
			BisUtil.ajaxPrint(BisUtil.objectToJson(list), response);
		}
		return false;
	}

	public CurrentTableDAO getCurrentTableDAO() {
		return currentTableDAO;
	}

	public void setCurrentTableDAO(CurrentTableDAO currentTableDAO) {
		this.currentTableDAO = currentTableDAO;
	}

}
