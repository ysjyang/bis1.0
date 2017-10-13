package gov.mof.fasp2.bis.businessTypeOperate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import gov.mof.fasp2.bis.common.CommonDAO;
import gov.mof.fasp2.bis.common.PageQueryDTO;

public class BusinessTypeDataDAO {
	private CommonDAO commonDAO;

	public CommonDAO getCommonDAO() {
		return commonDAO;
	}

	public void setCommonDAO(CommonDAO commonDAO) {
		this.commonDAO = commonDAO;
	}

	public PageQueryDTO getTableData(PageQueryDTO dto,String code,String selectBus) {
		StringBuffer s = new StringBuffer();
		s.append("select * from ");
		s.append("(select t1.code,t1.name,nvl(t2.isuse,0) isuse from BIS_T_BUSTYPE t1");
		s.append(" left join BIS_T_BUSTYPECONFIG t2");
		s.append(" on t1.code = t2.bustype");
		s.append(" and t2.province='"+code+"' )t");
		if(!selectBus.equals("请选择接口类型")){
          if(selectBus.equals("集中支付业务")){
              s.append(" where t.code like '10%' or t.code like '20%'");
          }
          if(selectBus.equals("公务卡业务")){
              s.append(" where t.code like '11%' or t.code like '21%'");
          }
          if(selectBus.equals("基础数据")){
              s.append(" where t.code like '12%' or t.code like '22%'");
          }
          if(selectBus.equals("民生平台接口")){
              s.append(" where t.code like '13%' or t.code like '23%'");
          }
		}
		s.append(" order by t.code");
		dto.setQuerySql(s.toString());
		System.out.println(s.toString());
		PageQueryDTO pageQueryDTO  = commonDAO.queryPageForList(dto);
		List list = pageQueryDTO.getDatas();
		if(list!= null){
			for(int i=0;i<list.size();i++){
				Map m = new HashMap();
				m = (Map) list.get(i);
				String substring = String.valueOf(((HashMap) list.get(i)).get("code")).substring(0, 2);
				if(substring.equals("10")||substring.equals("20")){
					m.put("type", "集中支付业务");
				}
				if(substring.equals("11")||substring.equals("21")){
					m.put("type", "公务卡业务");
				}
				if(substring.equals("12")||substring.equals("22")){
					m.put("type","基础数据");
				}
				if(substring.equals("13")||substring.equals("23")){
					m.put("type","民生平台接口");
				}
			}
		}
		return pageQueryDTO;
	}

}
