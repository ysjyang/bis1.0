/**
 * 
 */
package gov.mof.fasp2.bis.checkdata;

import gov.mof.fasp2.bis.common.CommonDAO;
import gov.mof.fasp2.bis.exception.AppException;
import gov.mof.fasp2.bis.factory.ServiceFactory;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 
 * @ClassName: CheckData
 * @Description:校验银行发送的数据
 * @author <a href="mailto:huchuan@szlongtu.com">胡川</a>于 2016-5-12 下午6:01:11
 */
public class CheckData {

	private CommonDAO commonDao;

	public CommonDAO getCommonDao() {
		return commonDao;
	}

	public void setCommonDao(CommonDAO commonDao) {
		this.commonDao = commonDao;
	}
	
	/**
	 * 公共数据重复校验方法，校验发送数据是否和接口数据库中数据重复。
	 * @param listmap 发送数据
	 * @param maintablecode 接口业务数据主表
	 * @param pk 主键
	 * @param wheresql 主键insql
	 * @throws AppException
	 */
	public static void comCheckRepeat(List listmap, String maintablecode,
			String pk,String wheresql) throws AppException {
		//发送数据中有重复
		Map map = new HashMap();
    	String guid = "";
    	List repeatlist = new ArrayList();
    	Set resultSet = new HashSet();
    	for(int a=0;a<listmap.size();a++){
    		map = (Map) listmap.get(a);
    		guid = (String) map.get(pk);
    		repeatlist.add(guid);
    	}
    	String repeatguid = "";
    	for(int b=0;b<repeatlist.size();b++){
    		repeatguid = (String) repeatlist.get(b);
    		repeatlist.remove(b);
    		b--;
    		if(repeatlist.contains(repeatguid)){
    			resultSet.add(repeatguid);
    		}
    	}
    	if(resultSet.size()>0){
    		throw new AppException("0014","发送的list中数据重复，重复的"+ pk +"为："+resultSet);
    	}
		//发送数据和数据库中原有数据有重复
		CommonDAO dao = (CommonDAO) ServiceFactory.getBean("bis.common.CommonDAO");
		List repeatList = dao.queryForList("select " + pk + " from "
				+ maintablecode + " where " + wheresql);
		if (repeatList.size() > 0) {
			throw new AppException("0014", "发送的list中数据和数据库原有数据重复，重复的数据为："
					+ repeatList.toString());
		}
	}
	/**
	 * 1101--开户银行编码校验，这个字段不对会影响公务卡凭证的读取
	 * 
	 * @param listmap
	 * @throws AppException
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static void checkCardBankCode(List listmap) throws AppException {
		CommonDAO dao = (CommonDAO) ServiceFactory.getBean("bis.common.CommonDAO");
		List bankCodeList = dao.queryForList("select code from bis_t_ele_bank for update");
		Set<String> stringList1 = new HashSet<String>();
		Set<String> stringList2 = new HashSet<String>();
		Set<String> stringList3 = new HashSet<String>();
		for (int i = 0; i < bankCodeList.size(); i++) {
			stringList1.add(((Map) bankCodeList.get(i)).get("code") + "");
		}
		for (int i = 0; i < listmap.size(); i++) {
			stringList2.add(((Map) listmap.get(i)).get("bankcode") + "");
		}
		int num1 = stringList1.size();
		stringList3.addAll(stringList1);
		stringList1.addAll(stringList2);
		int num2 = stringList1.size();
		stringList1.removeAll(stringList3);
		if (num1 != num2) {
			throw new AppException("0019", "数据中存在不正确的【开户银行编码】:"+stringList1.toString());
		}
	}
	/**
	 * 1101-- 数据重复校验
	 * @param listmap
	 * @param maintablecode
	 * @param wheresql
	 * @throws AppException
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static void checkCardRepeatData(List listmap, String maintablecode,
			String wheresql) throws AppException{
		CommonDAO dao = (CommonDAO) ServiceFactory.getBean("bis.common.CommonDAO");
		List repeatList = dao.queryForList("select cardno,agencycode from "
				+ maintablecode + " where " + wheresql);
		if (repeatList.size() > 0) {
			throw new AppException("0014", "发送的list中数据和数据库原有数据重复，重复的数据为："
					+ repeatList.toString());
		}

	}
	/**
	 * 1103 校验卡号和预算单位
	 * @param listmap
	 * @param maintablecode
	 * @param parseInSql4
	 * @throws AppException
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static void checkCardnoAgency1103(List listmap,
			String maintablecode, String parseInSql4) throws AppException{
		CommonDAO dao = (CommonDAO) ServiceFactory.getBean("bis.common.CommonDAO");
		List list = dao.queryForList("select cardno,agencycode from "+ maintablecode.replace("1103m", "1101m") +" where " 
				+ parseInSql4);
    	if(list.size()<listmap.size()){
    		List cardnoAgencys = new ArrayList();
    		for(int i=0;i<listmap.size();i++){
    			Map map = (Map)listmap.get(i);
    			Map cardnoAgencysMap = new HashMap();
    			cardnoAgencysMap.put("cardno", map.get("cardno"));
    			cardnoAgencysMap.put("agencycode", map.get("agencycode"));
    			cardnoAgencys.add(cardnoAgencysMap);
    		}
    		cardnoAgencys.removeAll(list);
    		if(cardnoAgencys.size()==0){
    			throw new AppException("0014","发送的数据中存在相同数据"+list.toString());
    		}else{
    			throw new AppException("0019","新增公务卡信息里查不到该卡信息，卡号或预算单位编码不对或有空格"+cardnoAgencys.toString());
    		}
    	}
		
	}
	
	/**
	 * 有明细的单据检查明细是否有问题
	 * @param map
	 * @throws AppException
	 */
	@SuppressWarnings("rawtypes")
	public static void isHaveSubList(Map map) throws AppException {
		if(!map.containsKey("sublist")){
			throw new AppException("0026","没有传明细，或明细标签【sublist】有空格等");
		}else{
			if(((List)map.get("sublist")).size()==0){
				throw new AppException("0026","明细数据为空。");
			}
		}
	}
	/**
	 * 校验银行数据中预算单位编码是否正确
	 * @param listmap
	 * @param string
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static void comCheckAgencycode(List listmap, String pk) throws AppException{
		CommonDAO dao = (CommonDAO) ServiceFactory.getBean("bis.common.CommonDAO");
		List agencyList = dao.queryForList("SELECT t.code from Bis_t_Ele_Agency t");
		List<String> agencyStrList = new ArrayList<String>();
		List guidList = new ArrayList();	//报错list存放错误数据的guid和预算单位编码
 		for (int i = 0; i < agencyList.size(); i++) {
			Map map = (Map)agencyList.get(i);
			agencyStrList.add(map.get("code")+"");
		}
		Map temMap;
		for (int i = 0; i < listmap.size(); i++) {
			temMap = (Map)listmap.get(i); 
			if(!agencyStrList.contains(temMap.get("agencycode")+"")){
				Map returnMap = new HashMap();
				returnMap.put(pk, temMap.get(pk)+"");
				returnMap.put("agencycode", temMap.get("agencycode")+"");
				guidList.add(returnMap);
			}
		}
		if(guidList.size()>0){
			throw new AppException("0019","数据中存在不正确的预算单位编码。" + guidList.toString());
		}
	}
	/**
	 * 公务卡状态变更，校验数据的卡状态是否是1或-1
	 * @param listmap
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static void checkCardStatus(List listmap) throws AppException {
		Map temMap;
		List errorList = new ArrayList();
		
		for (int i = 0; i < listmap.size(); i++) {
			temMap = (Map)listmap.get(i);
			String status = temMap.get("status")+"";
			if(!"1".equals(status)&&!"-1".equals(status)){
				Map errorMap = new HashMap();
				errorMap.put("cardno", temMap.get("cardno")+"");
				errorMap.put("status", temMap.get("status")+"");
				errorList.add(errorMap);
			}
			if(errorList.size()>0){
				throw new AppException("0019","【状态】字段的值应该是1或-1 （1:代表启用，-1代表停用）" + errorList.toString());
			}
		}
	}
	/**.
	 * 公务卡消费信息增加账号不能有空格的校验
	 * @param listmap
	 */
	public static void checkAccountNo(List listmap,String pk) throws AppException{
		boolean rs = true;
		for (int i = 0; i < listmap.size(); i++) {
			Map temMap = (Map)listmap.get(i);
			String gatherbankacctcode = temMap.get("gatherbankacctcode")+"";
			String guid = temMap.get(pk)+"";
			if(!"null".equals(gatherbankacctcode)&&!"NULL".equals(gatherbankacctcode)){
				// 账号规则
			    String regEx = "[0-9\\-]*";
			    // 编译正则表达式
			    Pattern pattern = Pattern.compile(regEx);
			    Matcher matcher = pattern.matcher(gatherbankacctcode);
			    // 字符串是否与正则表达式相匹配
			     rs = matcher.matches();
			     if(!rs){
			    	 throw new AppException("0007","【账号格式不对，只能包含数字和横线，不能有空格】"+pk+":"+guid);
			     }
			}
		}
	}
	/**
	 * @throws AppException 
	 * 校验银行主子单金额是否一致
	 * @param m 银行数据
	 * @param sublist 银行子单数据
	 * @throws
	 */
	public static void checkAmt(Map m, List sublist,String pk) throws AppException {
		BigDecimal mainAmt = new BigDecimal(m.get("amt").toString());
		BigDecimal subAmt = new BigDecimal("0");
		for (int i = 0; i < sublist.size(); i++) {
			subAmt = subAmt.add(new BigDecimal((((Map)sublist.get(i)).get("amt")).toString()));
		}
		if(mainAmt.compareTo(subAmt)!=0){
	    	 throw new AppException("0032","有问题的数据主单"+pk+"为："+m.get(pk));
		}
	}
	


}
