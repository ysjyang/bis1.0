package gov.mof.fasp2.bis.elesynchro;

import gov.mof.fasp2.bis.common.CommonDAO;
import gov.mof.fasp2.bis.factory.ServiceFactory;
import gov.mof.fasp2.dic.dataset.webservice.IDataSetWebService;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.caucho.hessian.client.HessianProxyFactory;
import com.longtu.framework.exception.AppException;

public class HessianEleData {

	private CommonDAO commonDao;

	public CommonDAO getCommonDao() {
		return commonDao;
	}

	public void setCommonDao(CommonDAO commonDao) {
		this.commonDao = commonDao;
	}

	/**
	 * @param args
	 */
	CommonDAO dao = (CommonDAO) ServiceFactory.getBean("bis.common.CommonDAO");

	public void getEleData() {
		System.out.println("查找基础数据的方法");
		HessianProxyFactory factory = new HessianProxyFactory();
		IDataSetWebService service = null;
		// 从BIS_T_SYSTEMSET表配置中动态取到url
		String urlsql = "select t.value from  BIS_T_SYSTEMSET t where t.code='BISBANKBASEDATA'";
		String url = ((Map) dao.queryForList(urlsql).get(0)).get("value").toString();
		try {
			factory.setOverloadEnabled(true);
			service = (IDataSetWebService) factory.create(
					IDataSetWebService.class, url);
			List elelist = new ArrayList<String>();
			//regstatus 用于控制最后同步
			String elesql = "select t.faspelementcode from Bis_t_Elements t where t.status='1' and t.regstatus='0'";
			List elements = dao.queryForList(elesql);
			String elementsStr = "";
			//特殊处理agency和bankaccount
			// 取user表中usertype为1的区划
			String prosql = "select distinct t.province from BIS_T_USER t where t.usertype='1'";
			List provinces = dao.queryForList(prosql);			
			// 根据区划循环取数
			for (int p = 0; p < provinces.size(); p++) {
				for (int i = 0; i < elements.size(); i++) {
					elementsStr = (String) ((Map) elements.get(i)).get("faspelementcode");
					if ("BANKACCOUNTTYPE".equals(elementsStr.toUpperCase())) {
						elelist.add("ACCOUNTTYPE");
					} else if ("AGENCY".equals(elementsStr.toUpperCase())) {
						elelist.add("AGENCYALLPAY");
					} else {
						elelist.add(((Map) elements.get(i)).get("faspelementcode"));
					}
				}
				String province = ((Map) provinces.get(p)).get("province").toString();
				Date year = new Date();
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy");
				String yearstr = sdf.format(year);
				Map<String, String> retMap = service.getDataSetsLatestVersion(province, yearstr, elelist);
				//特殊处理list
				for(int i =0; i<elelist.size();i++){
					String str = (String)elelist.get(i);
					if ("ACCOUNTTYPE".equals(str.toUpperCase())) {
						elelist.set(i, "BANKACCOUNTTYPE") ;
					} else if ("AGENCYALLPAY".equals(str.toUpperCase())) {
						elelist.set(i, "AGENCY") ;
					}
				}
				//特殊处理map
				if(retMap.containsKey("ACCOUNTTYPE")){
					retMap.put("BANKACCOUNTTYPE", retMap.get("ACCOUNTTYPE"));
					retMap.remove("ACCOUNTTYPE");
				}
				if(retMap.containsKey("AGENCYALLPAY")){
					retMap.put("AGENCY", retMap.get("AGENCYALLPAY"));
					retMap.remove("AGENCYALLPAY");
				}
				// 判断本地库的版本号和查询的版本号是否统一
				for (int s = 0; s < elelist.size(); s++) {
					String elementcode = elelist.get(s).toString();
					String eleVersion = "select t.version,t.elementcode from bis_t_versions t where t.elementcode='"
											+ elementcode+ "' and province='"+ province	+ "' and year='" + yearstr + "'";
					List verlist = dao.queryForList(eleVersion);
					String version = "";
					String element = "";
					if (verlist.size() > 0) {
						version = ((Map) verlist.get(0)).get("version").toString();
						element = ((Map) verlist.get(0)).get("elementcode").toString();
					}
					long ver = 0;	
					if(!"AGENCY".equals(elementcode)){
						// 如果不统一则下载基础数据
						if(!version.equals(retMap.get(elementcode))&& retMap.get(elementcode) != null) {
							ver = (version == null || version.length() == 0) ? 0: Long.parseLong(version);
							getDatas(service, province, yearstr, ver, elementcode,element, retMap.get(elementcode));
						}
					}else{						
						getOtherDatas(service, province, yearstr, 0,"AGENCY", element);
					}
				}
				String eleVersion = "select t.elementcode from bis_t_versions t where t.elementcode='BANKACCOUNT' and province='"+ province	+ "' and year='" + yearstr + "'";
				List verlist = dao.queryForList(eleVersion);
				String element = "";
				if (verlist.size() > 0) {
					element = ((Map) verlist.get(0)).get("elementcode").toString();
				}
				getOtherDatas(service, province, yearstr, 0,"BANKACCOUNT", element);//银行账户中有多出来的字段,需要翻译,所以最后同步
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("第二步执行完毕+++++++++++++++++++");
}
	private void getDatas(IDataSetWebService service, String province,String year, long ver, String elementcode, String element,String version) throws AppException {
		String updatesql = "";
		List list = null;
		if("BANKACCOUNTTYPE".equals(elementcode.toUpperCase())){
			list = service.getDataSetRangesByVersion(province, year, ver, "ACCOUNTTYPE");
		}else{
			list = service.getDataSetRangesByVersion(province, year, ver, elementcode);
		}
		if (list.size() > 0) {
			doInsert(list, elementcode, province, year);
			// 如果入库没有错误则更新基础数据配置表版本号
			if (element == null || element.length() == 0) {
				updatesql = "insert into bis_t_versions(elementcode,version,province,year) values('"+ elementcode + "','" + version	+ "','"	+ province + "','" + year + "')";
			} else {
				updatesql = "update bis_t_versions t set t.version = '"	+ version + "' where t.elementcode = '"	+ elementcode.toUpperCase() + "' and t.province='" + province + "' and t.year='" + year + "'";
			}
			dao.update(updatesql);
		}
	}

	private void getOtherDatas(IDataSetWebService service, String province,	String year, long ver, String elementcode, String element)throws AppException {
		String updatesql = null;
		boolean versionflag = false;
		List list = null;
		if("AGENCY".equals(elementcode)){
			list = service.getDataSetRangesByVersion(province, year, ver, "AGENCYALLPAY");
		}else{
			list = service.getDataSetRangesByVersion(province, year, ver, elementcode);
		}
		if (list.size() > 0) {
			String selectsql = null;
			selectsql = "select * from bis_t_ele_" + elementcode;
			List elelist = dao.queryForList(selectsql);
			if(list.size()!=elelist.size()){
				versionflag=true;
			}
			if(!versionflag){
			for (int i = 0; i < list.size(); i++) {
				String faspguid = (((Map) list.get(i)).get("guid")).toString();
				String faspprovince = (((Map) list.get(i)).get("province"))	.toString();
				String faspyear = (((Map) list.get(i)).get("year")).toString();
				long faspversion = Long.parseLong((((Map) list.get(i)).get("version")).toString());
				for (int j = 0; j < elelist.size(); j++) {
					String eleguid = (((Map) elelist.get(j)).get("guid")).toString();
					String eleprovince = (((Map) elelist.get(j)).get("province")).toString();
					String eleyear = (((Map) elelist.get(j)).get("year")).toString();
					long eleversion = Long.parseLong(((Map) elelist.get(j)).get("version").toString());
					if ((faspguid.equals(eleguid)&& faspprovince.equals(eleprovince)&& faspyear.equals(eleyear) && faspversion != eleversion)) {
						versionflag = true;
						break;
						}				
					}
				if (versionflag)
					break;
				}
			}
			if (versionflag || elelist.size()<=0) {
				doInsert(list, elementcode, province, year);				
				if (element == null || element.length() == 0) {
					updatesql = "insert into bis_t_versions(elementcode,version,province,year) values('"+ elementcode+ "','"+ 0	+ "','"	+ province + "','" + year + "')";
				} else {
					String maxversionsql = "select version from bis_t_versions t where t.elementcode = '"+ elementcode.toUpperCase() + "' and t.province='" + province + "' and t.year='" + year +"'";
					List versionlist = dao.queryForList(maxversionsql);
					long versions = Long.parseLong(((Map) versionlist.get(0)).get("version").toString());
					updatesql = "update  bis_t_versions t set version ="+ (versions + 1) + "  where t.elementcode = '"+ elementcode.toUpperCase() + "' and t.province='"+ province + "' and t.year='" + year + "'";
				}
				dao.update(updatesql);
			}
		}
	}

	/**
	 * @param list
	 * @param elementcode
	 * @param province
	 * @param year
	 */
	private void doInsert(List list, String elementcode, String province,String year) {
		String insertsql = "";
		String deletesql = "";
		String[] insetsqlStr = new String[list.size()];
		// 定义返回的值的名称
		String guid = "";
		String code = "";
		String name = "";
		String superguid = "";
		String status = "";
		BigDecimal version = null;
		BigDecimal levelno = null;
		BigDecimal isleaf = null;
		String parentcode = "";
		String bankcode = null;
		Map dataMap = new HashMap();
		for (int j = 0; j < list.size(); j++) {
			// 得到平台返回list中包含的数据
			dataMap = (Map) list.get(j);
			guid = (String) dataMap.get("guid");
			status = (String) dataMap.get("status");
			version = (BigDecimal) dataMap.get("version");
			code = (String) dataMap.get("code");
			name = (String) dataMap.get("name");
			superguid = (String) dataMap.get("superguid");
			levelno = (BigDecimal) dataMap.get("levelno");
			isleaf = (BigDecimal) dataMap.get("isleaf");
			bankcode = (String) dataMap.get("bankcode");
			province = (String) dataMap.get("province");
			deletesql = "delete from bis_t_ele_" + elementcode + " t";
			if (!elementcode.equals("AGENCY")
					&& !elementcode.equals("BANKACCOUNT")) {
				// 删除表中现有数据(根据guid,province,year删除)
				deletesql += " where t.guid='" + guid + "' and t.province='"+ province + "' and t.year='" + year + "'";
			}else{
				deletesql += " where t.province='"+ province + "' and t.year='" + year + "'";
			}
			dao.execute(deletesql);
			// 通过superguid获取PARENTCODE
			if (superguid == null || superguid.equals("0")) {
				parentcode = "";
			} else {
				parentcode = getParentCode(list, superguid);
			}
			if (levelno == null) {
				levelno = BigDecimal.ONE;
			}
			if (isleaf == null) {
				isleaf = BigDecimal.ONE;
			}
			String seqsql="select nvl(max(seq),0) from bis_t_ele_"+elementcode;
			List seqlist = dao.queryForList(seqsql);
			int seq = Integer.parseInt(((Map) seqlist.get(0)).get("nvl(max(seq),0)").toString());
			if ("BANKACCOUNT".equals(elementcode.toUpperCase())) {
				String bankaccounttype = (String)dataMap.get("bankaccounttype");
				String agencyguid = (String)dataMap.get("agencyguid");
				if(agencyguid==null){
					agencyguid="";
				}
				String bankguid = (String)dataMap.get("bankguid");
				if(bankguid==null){
					bankguid="";
				}
				String collecbankguid = (String)dataMap.get("collecbankguid");
				if(collecbankguid==null){
					collecbankguid="";
				}
				insertsql = "insert into bis_t_ele_"+ elementcode+ "(GUID,CODE,NAME,PARENTCODE,LEVELNO,ISLEAF,SEQ,PROVINCE,YEAR,STATUS,BANKACCOUNTTYPE,BANKCODE,AGENCYGUID,BANKGUID,COLLECBANKGUID,VERSION)";
				insertsql += " ";
				insertsql += "values('" + guid + "','" + code + "','" + name + "','" + parentcode + "','" + levelno + "','" + isleaf+ "','" + (j + seq + 1) + "','" + province + "','" + year	+ "','" + status + "','" + bankaccounttype + "','"+ bankcode + "','" + agencyguid + "','" + bankguid	+ "','" + collecbankguid + "','"+version+"')";
				insetsqlStr[j] = insertsql;
			} else {
				insertsql = "insert into bis_t_ele_"+ elementcode+ "(GUID,CODE,NAME,PARENTCODE,LEVELNO,ISLEAF,SEQ,PROVINCE,YEAR,STATUS,VERSION)";
				insertsql += " ";
				insertsql += "values('" + guid + "','" + code + "','" + name+ "','" + parentcode + "','" + levelno + "','" + isleaf	+ "','" + (j + seq + 1) + "','" + province + "','" + year	+ "','" + status + "','" + version + "')";
				insetsqlStr[j] = insertsql;
			}
		}
		if (insetsqlStr.length != 0) {
			dao.batchInsert(insetsqlStr);
		}
	}

	/*
	 * 通过guid获取list中的code
	 */
	private String getParentCode(List list, String superguid) {
		String returncode = "";
		String guid = "";
		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++) {
			map = (Map) list.get(i);
			guid = (String) map.get("guid");
			if (guid.equals(superguid)) {
				returncode = (String) map.get("code");
				return returncode;
			}
		}
		return returncode;
	}
}
