package gov.mof.fasp2.bis.logManager;

import gov.mof.fasp2.bis.common.CommonDAO;
import gov.mof.fasp2.bis.common.PageQueryDTO;
import gov.mof.fasp2.bis.factory.ServiceFactory;
import gov.mof.fasp2.bis.util.BisUtil;

import java.io.BufferedReader;
import java.io.Reader;
import java.sql.Clob;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.io.InputStream;
import java.lang.reflect.Method;

import org.springframework.jdbc.core.JdbcTemplate;

public class QueryDataDAO {
	private CommonDAO commonDao;
	public CommonDAO getCommonDao() {
		return commonDao;
	}
	public void setCommonDao(CommonDAO commonDao) {
		this.commonDao = commonDao;
	}
	public PageQueryDTO queryData(PageQueryDTO dto,String type, String begintime, String endtime) {
		String tablename = "";
		if(type.equals("报文日志")){
			tablename = "bis_t_logxml";
		}
		if(type.equals("错误报文日志")){
			tablename = "bis_t_logxmlerror";
		}
		if(type.equals("业务日志")){
			tablename = "bis_t_logbus";
		}
		if(type.equals("错误业务日志")){
			tablename = "bis_t_logbuserror";
		}
		SimpleDateFormat format =  new SimpleDateFormat("yyyy-MM-dd");
		Date bigindate = new Date();
		Date enddate = new Date();
		try {
			bigindate = format.parse(begintime);
			enddate = format.parse(endtime);
			Calendar cld=Calendar.getInstance();
			 cld.setTime(enddate);
			 cld.add(Calendar.DATE, +1);
			 enddate = cld.getTime();
		} catch (ParseException e) {
			e.printStackTrace();
		}
		String begindate1 = BisUtil.getDate17(bigindate);
		String enddate1 = BisUtil.getDate17(enddate);
		String querysql = "select * from "+" "+tablename+" "+"where createtime>"+begindate1+" "+"and createtime<"+enddate1+" "+"order by createtime desc";
		dto.setQuerySql(querysql);
		return commonDao.queryPageForList(dto);
	}
	
	
	
	public Map deleteData(String type, String begintime, String endtime) {
		Map returnmap = new HashMap();
		String tablename = "";
		if(type.equals("报文日志")){
			tablename = "bis_t_logxml";
		}
		if(type.equals("错误报文日志")){
			tablename = "bis_t_logxmlerror";
		}
		if(type.equals("业务日志")){
			tablename = "bis_t_logbus";
		}
		if(type.equals("错误业务日志")){
			tablename = "bis_t_logbuserror";
		}
		SimpleDateFormat format =  new SimpleDateFormat("yyyy-MM-dd");
		Date bigindate = new Date();
		Date enddate = new Date();
		try {
			bigindate = format.parse(begintime);
			enddate = format.parse(endtime);
			Calendar cld=Calendar.getInstance();
            cld.setTime(enddate);
            cld.add(Calendar.DATE, +1);
            enddate = cld.getTime();
		} catch (ParseException e) {
			e.printStackTrace();
		}
		String begindate1 = BisUtil.getDate17(bigindate);
		String enddate1 = BisUtil.getDate17(enddate);
		//首选查询要删除的数据量，如果数据量>100 0000,则提示少量删除
		String querysql = "select * from "+" "+tablename+" "+"where createtime>"+begindate1+" "+"and createtime<"+enddate1+" "+"order by createtime";
		List list = commonDao.queryForList(querysql);
		
		if(list.size()>100000){
			returnmap.put("trueorfalse", false);
			returnmap.put("bigdate", "您要删除的数据大于十万，请分开删除！");
		}else{
			if(list.size()>0){
			    String deletesql = "delete from "+tablename+" "+"where createtime>"+begindate1+" "+"and createtime<"+enddate1;
	            commonDao.update(deletesql);
	            returnmap.put("trueorfalse", true);
			}
			else{
			    returnmap.put("nodate", "没有数据可以删除！");
			}
		}
		return returnmap;
	}


}
