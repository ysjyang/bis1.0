package gov.mof.fasp2.bis.login;

import java.util.HashMap;
import java.util.List;

import gov.mof.fasp2.bis.common.CommonDAO;

import org.springframework.jdbc.core.JdbcTemplate;

public class LoginCheckDao {
	
	private CommonDAO commonDAO;
	private JdbcTemplate jdbcTemplate ;
	/*
	 * 需要返回BIS_T_USER的GUID
	 */
	public String checkUser(String username, String passwordMD5) {
		String sql = "select guid from BIS_T_USER where NAME='"+username+"' and password='"+passwordMD5+"' and usertype ='1'";
		String guid = "";
		Object object = new Object[]{guid};
//		try{
//			s=(String)jdbcTemplate.queryForObject(sql,new Object[]{username,passwordMD5},java.lang.String.class);
//		}catch(Exception e){
//			s="";
//		}
		List sqllist = commonDAO.queryForList(sql);
		System.out.println(sql);
		String  guid1 ="";
		if(sqllist.size()>0){
			object = sqllist.get(0);
			//怎么获取DTO中的值{guid=A03BE36C5B4D4AB7ADF998E0986C20D3}
			guid1 = String.valueOf(((HashMap) sqllist.get(0)).get("guid"));
		}
		return guid1;
	}
	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}
	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
	public CommonDAO getCommonDAO() {
		return commonDAO;
	}
	public void setCommonDAO(CommonDAO commonDAO) {
		this.commonDAO = commonDAO;
	}
	
}
