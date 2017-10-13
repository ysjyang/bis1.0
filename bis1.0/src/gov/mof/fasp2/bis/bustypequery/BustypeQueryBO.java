/**
 * @Title: BustypeQueryBO.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-30  胡川
 */
 

package gov.mof.fasp2.bis.bustypequery;

import gov.mof.fasp2.bis.common.PageQueryDTO;
import gov.mof.fasp2.bis.util.BisUtil;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
 * @ClassName: BustypeQueryBO
 * @Description: Description of this class
 * @author <a href="mailto:huchuan@szlongtu.com">胡川</a>于 2016-5-30 上午11:39:40
 */

public class BustypeQueryBO {
    private BustypeQueryDAO bustypeQueryDao;
    
    public BustypeQueryDAO getBustypeQueryDao() {
        return bustypeQueryDao;
    }

    public void setBustypeQueryDao(BustypeQueryDAO bustypeQueryDao) {
        this.bustypeQueryDao = bustypeQueryDao;
    }

    /**
     * 查询所选业务类型的数据
     * @param code 业务类型
     * @return
     * @throws
     */
    public PageQueryDTO getData(String code,String begindate,String enddate,String year,String province) {
        if(code == null){
            code ="1001";   //默认显示1001业务类型
        }
        PageQueryDTO dto = new PageQueryDTO(new HashMap());
        dto.setNumForPage(5);   //设置默认每页显示记录数
        dto.setCurrentPage(1);  //默认显示第一页
        
        if(begindate != null && begindate.length() > 0 && enddate != null && enddate.length() > 0){
            SimpleDateFormat format =  new SimpleDateFormat("yyyy-MM-dd");
            Date bigindate1 = new Date();
            Date enddate1 = new Date();
            try {
                bigindate1 = format.parse(begindate);
                enddate1 = format.parse(enddate);
                Calendar cld=Calendar.getInstance();
   			 	cld.setTime(enddate1);
   			 	cld.add(Calendar.DATE, +1);
   			 	enddate1 = cld.getTime();
            } catch (ParseException e) {
                e.printStackTrace();
            }
            String begindate2 = BisUtil.getDate17(bigindate1);
            String enddate2 = BisUtil.getDate17(enddate1);
            bustypeQueryDao.findData(dto,code,begindate2,enddate2,year,province);
        }
        
        if((begindate == null || begindate.length() <= 0) && (enddate == null || enddate.length() <= 0)){
            bustypeQueryDao.findData(dto,code,year,province);
        }
        return dto;
    }

    /**
     * 获取所有的业务类型
     * @return
     * @throws
     */
    public List getAllBusType() {
        return bustypeQueryDao.findAllBusType();
    }

    /**
     * 获取子表数据
     * @param code 业务类型
     * @param mainguid 主表guid
     * @return
     * @throws
     */
    public List getSubDatas(String code, String mainguid,String year,String province) {
        return bustypeQueryDao.findSubDatas(code,mainguid,year,province);
    }

    /**.
     * 获取主表表头
     * @param code 业务类型
     * @return
     * @throws
     */
    public List getTableCols(String code) {
        if(code == null || code.equals("undefined")){
            code ="1001";   //默认显示1001业务类型
        }
        return bustypeQueryDao.findTableCols(code);
    }

    /**.
     * 获取子表表头
     * @param code 业务类型
     * @return
     * @throws
     */
    public List getSubTableCols(String code) {
        return bustypeQueryDao.findSubTableCols(code);
    }

    public List getYears() {
        return bustypeQueryDao.findAllYears();
    }
    /**
     * 或得省份树
     * @return
     */
	public List getProvinceTree() {
		List p = bustypeQueryDao.findProvince();
		return p;
	}
	/**
     * 测试查询所选业务类型的数据
     * @param code 业务类型
     * @return
     * @throws
     */
    public PageQueryDTO getTestData(String code,String begindate,String enddate,String year,String province) {
        if(code == null){
            code ="1001";   //默认显示1001业务类型
        }
        PageQueryDTO dto = new PageQueryDTO(new HashMap());
        dto.setNumForPage(5);   //设置默认每页显示记录数
        dto.setCurrentPage(1);  //默认显示第一页
        
        if(begindate != null && begindate.length() > 0 && enddate != null && enddate.length() > 0){
            SimpleDateFormat format =  new SimpleDateFormat("yyyy-MM-dd");
            Date bigindate1 = new Date();
            Date enddate1 = new Date();
            try {
                bigindate1 = format.parse(begindate);
                enddate1 = format.parse(enddate);
                Calendar cld=Calendar.getInstance();
   			 	cld.setTime(enddate1);
   			 	cld.add(Calendar.DATE, +1);
   			 	enddate1 = cld.getTime();
            } catch (ParseException e) {
                e.printStackTrace();
            }
            String begindate2 = BisUtil.getDate17(bigindate1);
            String enddate2 = BisUtil.getDate17(enddate1);
            bustypeQueryDao.findData(dto,code,begindate2,enddate2,year,province);
        }
        
        if((begindate == null || begindate.length() <= 0) && (enddate == null || enddate.length() <= 0)){
            bustypeQueryDao.findTestData(dto,code,year,province);
        }
        return dto;
    }


}
