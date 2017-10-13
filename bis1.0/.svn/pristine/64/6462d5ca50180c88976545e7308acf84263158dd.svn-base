package gov.mof.fasp2.bis.createTable;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import gov.mof.fasp2.bis.common.CommonDAO;
import gov.mof.fasp2.bis.common.PageQueryDTO;

public class CurrentTableDAO {
private CommonDAO commonDAO;
	
	
	public CommonDAO getCommonDAO() {
		return commonDAO;
	}


	public void setCommonDAO(CommonDAO commonDAO) {
		this.commonDAO = commonDAO;
	}


	public PageQueryDTO getCurrentTable(PageQueryDTO dto) {
		List retuenList = new ArrayList();
		List list = new ArrayList();
		String sql = "select * from BIS_T_TABLEINBIS order by PROVINCECODE";
		dto.setQuerySql(sql);
		return commonDAO.queryPageForList(dto);
	}


	public List getYear() {
		String yearSql = "select year from BIS_T_YEAR";
		List yearList = commonDAO.queryForList(yearSql);
		return yearList;
	}


	public List queryTableSpace() {
		String spaceSql = "select tablespace_name from dba_tablespaces";
		List yearList = commonDAO.queryForList(spaceSql);
		return yearList;
	}

}
