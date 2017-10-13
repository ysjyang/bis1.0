package gov.mof.fasp2.bis.test;

import gov.mof.fasp2.bis.cache.SysCache;
import gov.mof.fasp2.bis.common.CommonDAO;
import gov.mof.fasp2.bis.common.IAction;
import gov.mof.fasp2.bis.factory.ServiceFactory;
import gov.mof.fasp2.bis.util.BisUtil;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class DelAction implements IAction{

	@Override
	public boolean doAction(HttpServletRequest request,
			HttpServletResponse response, String servletpath, boolean isajax)
			throws Exception {
		// TODO Auto-generated method stub
		if(isajax){
			CommonDAO commonDao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
			String typeCode = request.getParameter("typecode")+"";
			String province = (request.getParameter("province")+"").split("-")[0];
			String year = request.getParameter("year")+"";
			Map map = (Map)SysCache.getBustypeCache().get(typeCode);
			if(map.get("subtablecode")!=""){
				String subtable = map.get("subtablecode")+"_"+province+"_"+year;
				String sql="delete from "+subtable;
				commonDao.execute(sql);
			}
			if(map.get("maintablecode")!=""){
				String maintable = map.get("maintablecode")+"_"+province+"_"+year;
				String sql="delete from "+maintable;
				commonDao.execute(sql);
			}
			Map res = new HashMap();
			res.put("result", "success");
			BisUtil.ajaxPrint(BisUtil.objectToJson(res), response);
		}
		return true;
	}
}
