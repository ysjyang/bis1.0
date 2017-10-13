package gov.mof.fasp2.bis.businessTypeOperate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import gov.mof.fasp2.bis.common.IAction;
import gov.mof.fasp2.bis.common.PageQueryDTO;
import gov.mof.fasp2.bis.util.BisUtil;

import java.util.HashMap;
import java.util.List;

public class BusinessTypeTableAction implements IAction{
	private BusinessTypeDataDAO businessTypeTableDAO;
	@Override
	public boolean doAction(HttpServletRequest request,
			HttpServletResponse response, String servletpath, boolean isajax)
			throws Exception {
		if(isajax){
			PageQueryDTO dto = new PageQueryDTO(new HashMap());
			dto.setNumForPage(10);   //设置默认每页显示记录数
	        dto.setCurrentPage(1);  //默认显示第一页
			String code = request.getParameter("code");
			String selectBus = request.getParameter("selectBus");
			PageQueryDTO tabelList = businessTypeTableDAO.getTableData(dto,code,selectBus);
			BisUtil.ajaxPrint(BisUtil.objectToJson(tabelList), response);
		}
		return false;
	}
	public BusinessTypeDataDAO getBusinessTypeTableDAO() {
		return businessTypeTableDAO;
	}
	public void setBusinessTypeTableDAO(BusinessTypeDataDAO businessTypeTableDAO) {
		this.businessTypeTableDAO = businessTypeTableDAO;
	}

}
