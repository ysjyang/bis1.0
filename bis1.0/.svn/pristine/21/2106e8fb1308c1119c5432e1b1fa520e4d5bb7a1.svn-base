package gov.mof.fasp2.bis.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import sun.misc.BASE64Encoder;
/**
 * 
 * @ClassName: MD5Util
 * @Description: MD5与Base64的混合加密算法
 * @author <a href="mailto:huchuan@szlongtu.com">胡川</a>于 2016-5-16 下午8:06:09
 */
public class MD5Util {
	public static String digest(String str) throws NoSuchAlgorithmException {
		MessageDigest md = MessageDigest.getInstance("MD5");
		byte[] bs = md.digest(str.getBytes());
		BASE64Encoder base64Encoder = new BASE64Encoder();
		return base64Encoder.encode(bs);
	}

	public static void main(String[] args) throws NoSuchAlgorithmException {
		System.out.println(digest("123456"));
	}
}
