package gov.mof.fasp2.bis.createTable;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import gov.mof.fasp2.bis.common.IAction;
import gov.mof.fasp2.bis.util.BisUtil;

public class CreateTableBatchAction implements IAction{
	private CreateTableBatchDAO createTableBatchBO;
	@Override
	public boolean doAction(HttpServletRequest request,
			HttpServletResponse response, String servletpath, boolean isajax)
			throws Exception {
		if(isajax){
			String province = request.getParameter("province");
			String year = request.getParameter("year");
			String tablespace = request.getParameter("tablespace");
			Map map = createTableBatchBO.createTableBatch(province,year,tablespace);
			BisUtil.ajaxPrint(BisUtil.objectToJson(map), response);
		}
		return false;
	}
	public CreateTableBatchDAO getCreateTableBatchBO() {
		return createTableBatchBO;
	}
	public void setCreateTableBatchBO(CreateTableBatchDAO createTableBatchBO) {
		this.createTableBatchBO = createTableBatchBO;
	}

}
