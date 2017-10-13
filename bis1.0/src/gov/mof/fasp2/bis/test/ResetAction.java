package gov.mof.fasp2.bis.test;


import gov.mof.fasp2.bis.common.CommonDAO;
import gov.mof.fasp2.bis.common.IAction;
import gov.mof.fasp2.bis.factory.ServiceFactory;
import gov.mof.fasp2.bis.util.BisUtil;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



public class ResetAction implements IAction{

	@Override
	public boolean doAction(HttpServletRequest request,
			HttpServletResponse response, String servletpath, boolean isajax)
			throws Exception {
		// TODO Auto-generated method stub
		if(isajax){
			String province = (request.getParameter("province")+"").split("-")[0];
			String year = request.getParameter("year")+"";
			String bustype = request.getParameter("bustype")+"";
			String tablecode = "";
			if("1001".equals(bustype)){
				tablecode="bis_t_bustype1001m_"+province+"_"+year;
			}
			if("1011".equals(bustype)){
				tablecode="bis_t_bustype1011m_"+province+"_"+year;
			}
			String[] guids = request.getParameter("selectedguids").split(",");
			String[] biscreatetimes = request.getParameter("selectedbiscreatetime").split(",");
			StringBuffer wheresqls= new StringBuffer();
			for(int i=0;i<guids.length;i++){
				wheresqls.append("(guid='"+guids[i]+"' and biscreatetime='"+biscreatetimes[i]+"')");
				if(i!=guids.length-1){
					wheresqls.append(" or ");
				}
			}
			String sql = "update "+ tablecode +" set BISREADSTATUS='0' ,bisreadtime='', BISREPLYSLIPSTATUS='0',bisreplysliptime='' where "+ wheresqls.toString();
			CommonDAO commonDao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
			Map map = new HashMap();
			try {
				commonDao.execute(sql);
				map.put("res", "重置成功！");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				map.put("res", "重置失败！");
			}
			BisUtil.ajaxPrint(BisUtil.objectToJson(map), response);
		}
		return true;
	}
}
