/**
 * @Title: BustypeQueryAction.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-25  胡川
 */

package gov.mof.fasp2.bis.bustypequery;

import gov.mof.fasp2.bis.common.IAction;
import gov.mof.fasp2.bis.common.PageQueryDTO;
import gov.mof.fasp2.bis.util.BisUtil;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @ClassName: BustypeQueryAction
 * @Description: 业务数据查询
 * @author <a href="mailto:huchuan@szlongtu.com">胡川</a>于 2016-5-25 下午8:09:51
 */

public class BustypeQueryAction implements IAction{
    private BustypeQueryBO bustypeQueryBo;
    
    
    public BustypeQueryBO getBustypeQueryBo() {
        return bustypeQueryBo;
    }


    public void setBustypeQueryBo(BustypeQueryBO bustypeQueryBo) {
        this.bustypeQueryBo = bustypeQueryBo;
    }


    /**.
     * <p>Title: doAction</p>
     * <p>Description:业务数据查询 </p>
     * @param request
     * @param response
     * @param servletpath
     * @param isajax
     * @return
     * @throws Exception
     * @see gov.mof.fasp2.bis.common.IAction#doAction(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.String, boolean)
     */
    @Override
    public boolean doAction(HttpServletRequest request, HttpServletResponse response, String servletpath, boolean isajax)
            throws Exception {
        if(isajax){
            String code = request.getParameter("typeCode");
            String datatype = request.getParameter("datatype");
            String begindate = request.getParameter("begindate");
            String enddate = request.getParameter("enddate");
            String year = request.getParameter("year");
            String province = request.getParameter("province");
            //查询业务类型
            if(datatype.equals("type")){
                List busType = bustypeQueryBo.getAllBusType();
                BisUtil.ajaxPrint(BisUtil.objectToJson(busType), response);
            }
            //查询年度下拉
            if(datatype.equals("year")){
                List years = bustypeQueryBo.getYears();
                BisUtil.ajaxPrint(BisUtil.objectToJson(years), response);
            }
            //查询业务类型对应主表的列名和中文名
            if(datatype.equals("cols")){
                List cols = bustypeQueryBo.getTableCols(code);
                BisUtil.ajaxPrint(BisUtil.objectToJson(cols), response);
            }
            //查询业务类型对应主表的列名和中文名
            if(datatype.equals("subcols")){
                List cols = bustypeQueryBo.getSubTableCols(code);
                BisUtil.ajaxPrint(BisUtil.objectToJson(cols), response);
            }
            //查询主表业务数据
            if(datatype.equals("data")){
                PageQueryDTO busTypeDatas = bustypeQueryBo.getData(code,begindate,enddate,year,province);
                BisUtil.ajaxPrint(BisUtil.objectToJson(busTypeDatas), response);
            }
            //查询子表业务数据
            if(datatype.equals("subdata")){
                String mainguid = request.getParameter("guid");
                List subDatas = bustypeQueryBo.getSubDatas(code,mainguid,year,province);
                BisUtil.ajaxPrint(BisUtil.objectToJson(subDatas), response);
            }
            if(datatype.equals("provincetree")){
            	List provinces = bustypeQueryBo.getProvinceTree();
            	BisUtil.ajaxPrint(BisUtil.objectToJson(provinces), response);
            }
            //测试查询主表业务数据
            if(datatype.equals("testdata")){
                PageQueryDTO busTypeDatas = bustypeQueryBo.getTestData(code,begindate,enddate,year,province);
                BisUtil.ajaxPrint(BisUtil.objectToJson(busTypeDatas), response);
            }
        }
        return true;
    }

}
