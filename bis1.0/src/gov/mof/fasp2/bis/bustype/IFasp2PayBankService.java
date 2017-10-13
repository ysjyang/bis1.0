/**
 * @Title: IFasp2PayBankService.java
 * @Copyright (C) 2016 龙图软件
 * @Description:
 * @Revision History:
 * @Revision 1.0 2016-5-11  钟毅
 */
 

package gov.mof.fasp2.bis.bustype;

import java.util.List;
import java.util.Map;

/**
 * @ClassName: IFasp2PayBankService
 * @Description: Description of this class
 * @author <a href="mailto:zhongyi@szlongtu.com">钟毅</a>于 2016-5-11 上午10:36:38
 */

public interface IFasp2PayBankService {
    
    /**
     * 登录接口.
     * @param username 用户名
     * @param password 密码
     * @return 登录成功或失败信息。
     *         Map中包含三个key：
     *         1、result，值为“SUCCESS”或“ERROR”
     *         2、verifycode，值为string类型的验证码
     *         3、errormsg，值为string类型错误信息
     */
    public Map login(String username,String password);
    
    /**
     * 修改密码接口.
     * @param username 用户名
     * @param password 密码
     * @return 登录成功或失败信息。
     *         Map中包含三个key：
     *         1、result，值为“SUCCESS”或“ERROR”
     *         2、verifycode，值为string类型的验证码
     *         3、errormsg，值为string类型错误信息
     */
    public Map modifyPassword(String username,String oldpassword,String newpassword);
    
    /**
     * 读取未读取凭证接口.
     * @param bustype 业务类型
     * @param bankcode 银行编码
     * @param province 区划
     * @param year 年度
     * @param verifycode 验证码
     * @return 返回类型是Map。
     *         Map中包含五个key：
     *          1、result，值为“SUCCESS”或“ERROR”
     *          2、datas，值为List<map>格式的数据集
     *          3、errorno，错误编码
     *          4、errormsg，值为string类型错误信息
     *          5、iscomplete，本次是否已经全部读取，值为“TRUE”和“FALSE”。
     *               如果值为“FALSE”银行应该继续发起读取请求。
     *               出现值为“FASLE”的情况是因为数据量大而进行拆包传输。
     */
    public Map readVou(String bustype,String bankcode,String province,String year,String verifycode);
    
    /**
     * 读取已读取未回执凭证接口.
     * @param bustype 业务类型
     * @param bankcode 银行编码
     * @param province 区划
     * @param year 年度
     * @param verifycode 验证码
     * @return 返回类型是Map。
     *         Map中包含五个key：
     *          1、result，值为“SUCCESS”或“ERROR”
     *          2、datas，值为List<map>格式的数据集
     *          3、errorno，错误编码
     *          4、errormsg，值为string类型错误信息
     *          5、iscomplete，本次是否已经全部读取，值为“TRUE”和“FALSE”。
     *               如果值为“FALSE”银行应该继续发起读取请求。
     *               出现值为“FASLE”的情况是因为数据量大而进行拆包传输。
     */
    public Map readUnReplySlipVou(String bustype,String bankcode,String province,String year,String verifycode);
    
    /**
     * 读取成功后回执接口.
     * @param bustype 业务类型
     * @param bankcode 银行编码
     * @param province 区划
     * @param year 年度
     * @param verifycode 验证码
     * @param listmap 确认数据，map中内容一定要有个主键，一般为guid.
     * @return 返回类型是Map。
     *          Map中包含三个key：
     *          1、result，值为“SUCCESS”或“ERROR”
     *          2、errorno，错误编码
     *          3、errormsg，值为string类型错误信息
     */
    public Map replySlipVou(String bustype,String bankcode,String province,String year,String verifycode,List listmap);
    
    /**
     * 发送凭证接口.
     * @param bustype 业务类型
     * @param bankcode 银行编码
     * @param province 区划
     * @param year 年度
     * @param verifycode 验证码
     * @param listmap 凭证列表.
     * @return 返回类型是Map。
     *          Map中包含三个key：
     *          1、result，值为“SUCCESS”或“ERROR”
     *          2、errorno，错误编码
     *          3、errormsg，值为string类型错误信息
     *          4、datas，值为List<map>格式的数据集
     */
    public Map sendVou(String bustype,String bankcode,String province,String year,String verifycode,List listmap);
    
    /**
     * 取消发送凭证接口.
     * @param bustype 业务类型
     * @param bankcode 银行编码
     * @param province 区划
     * @param year 年度
     * @param verifycode 验证码
     * @param elementcodelist List<String>类型数据.
     * @return 返回类型是Map。
     *          Map中包含三个key：
     *          1、result，值为“SUCCESS”或“ERROR”
     *          2、errorno，错误编码
     *          3、errormsg，值为string类型错误信息
     */
    public Map cancelSendVou(String bustype,String bankcode,String province,String year,String verifycode,List listmap);
    
    /**
     * 查询基础数据版本.
     * @param bustype 业务类型
     * @param bankcode 银行编码
     * @param province 区划
     * @param year 年度
     * @param verifycode 验证码
     * @param elementcodelist 要素编码列表
     * @return  返回类型是Map。
     *          Map中包含三个key：
     *          1、result，值为“SUCCESS”或“ERROR”
     *          2、errorno，错误编码
     *          3、errormsg，值为string类型错误信息
     *          4、key为elementcode值为version的多个键值对。
     */
    public Map queryElelementVersion(String bustype,String bankcode,String province,String year,String verifycode,List elementcodelist);
    
    /**
     * 查询基础数据
     * @param bustype 业务类型
     * @param bankcode 银行编码
     * @param province 区划
     * @param year 年度
     * @param verifycode 验证码
     * @param elementcode 要素编码
     * @param seq 顺序号
     * @return 返回类型是Map。
     *         Map中包含五个key：
     *          1、result，值为“SUCCESS”或“ERROR”
     *          2、datas，值为List<map>格式的数据集
     *          3、errorno，错误编码
     *          4、errormsg，值为string类型错误信息
     *          5、iscomplete，本次是否已经全部读取，值为“TRUE”和“FALSE”。
     *               如果值为“FALSE”银行应该继续发起读取请求。
     *               出现值为“FASLE”的情况是因为数据量大而进行拆包传输。
     */
    public Map queryElelement(String bustype,String bankcode,String province,String year,String verifycode,String elementcode,String seq);


}
