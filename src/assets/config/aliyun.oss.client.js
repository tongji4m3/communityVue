/**
 * 阿里云oss上传工具
 *
 *  @description conf: {
                region: null,
                accessKeyId: null,
                accessKeySecret: null,
                bucket: null,
                stsToken: null
            }
 */
import OSS from 'ali-oss';
export default (conf) => {
    return new OSS(conf);
};
