package gov.mof.fasp2.bis.bustype.bank;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import gov.mof.fasp2.bis.common.BustypeCommonBO;
import gov.mof.fasp2.bis.common.CommonDAO;
import gov.mof.fasp2.bis.exception.AppException;
import gov.mof.fasp2.bis.factory.ServiceFactory;
import gov.mof.fasp2.bis.util.BisUtil;

public class Bustype1106BO extends BustypeCommonBO{


	@Override
	public Map replySlipDatas(String maintablecode, String subtablecode,
			List listmap,String bustype) throws AppException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map sendDatas(String maintablecode, String subtablecode, List listmap)
			throws AppException {
		// TODO Auto-generated method stub
		return null;
	}
	/*
	 * 对已发送的公务卡消费信息进行取消
	 * @see gov.mof.fasp2.bis.common.BustypeCommonBO#cancelSendDatas(java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.util.List)
	 */
	@Override
	public Map cancelSendDatas(String maintablecode, String subtablecode,
			String cancelmaintablecode, String cancelsubtablecode, List listmap)
			throws AppException {
		Map rt = new HashMap();
        CommonDAO dao = (CommonDAO)ServiceFactory.getBean("bis.common.CommonDAO");
        
        //查询要取消的数据是否存在,并且锁定这些记录.
        String sql ="select * from "+cancelmaintablecode+" where "+this.parseInSql2("guid", listmap) +" for update";
        List l = dao.queryForList(sql);
        
        //要取消的数据是否都存在
        if(l.size()!=listmap.size()){
            String missingguid = this.getMissingDatas(listmap, l, "guid");
            throw new AppException("0015",missingguid);
        }
        //校验是否可以做取消操作
        StringBuffer s = new StringBuffer();
        Map m = null;
        int bisreadstatus = 0;
        String biscanceltime = BisUtil.getDate17(new Date());
        for(int i=0;i<l.size();i++){
            m = (Map)l.get(i);
            m.put("biscanceltime", biscanceltime);//设置取消时间
            bisreadstatus = ((Number)m.get("bisreadstatus")).intValue();
            if(bisreadstatus == 1){
                if(s.length()==0){
                    s.append(m.get("guid"));
                }else{
                    s.append(",").append(m.get("guid"));
                }
            }
        }
        if(s.length()>0){
            throw new AppException("0016",s.toString());
        }
        
        //将要取消的数据移动到取消表中，并增加取消时间。
        dao.saveAll(l, maintablecode);
        sql ="delete from "+cancelmaintablecode+" where "+this.parseInSql2("guid", listmap);
        dao.update(sql); //在原表中删除取消的数据
        
        rt.put("result", "SUCCESS");
        return rt;
	}

    @Override
    public Map readDatas(String maintablecode, String subtablecode, int maxdatasnum, String bankcode,String bustype)
            throws AppException {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Map readUnReplySlipDatas(String maintablecode, String subtablecode, int maxdatasnum, String bankcode,String bustype)
            throws AppException {
        // TODO Auto-generated method stub
        return null;
    }

}
