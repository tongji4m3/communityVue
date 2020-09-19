<template>
  <span>
    <input
        class="input-file"
        type="file"
        @change="exportData"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    />
    <el-button type="primary" icon="el-icon-upload" @click="btnClick">批量离校</el-button>
  </span>
</template>

<script>
// 引入组件
import XLSX from "xlsx";

export default {
    data() {
        return {};
    },
    methods: {
        btnClick() {
            // 点击事件
            document.querySelector(".input-file").click();
        },
        exportData(event) {
            if (!event.currentTarget.files.length) {
                return;
            }
            const that = this;
            // 拿取文件对象
            var f = event.currentTarget.files[0];
            // 用FileReader来读取
            var reader = new FileReader();
            // 重写FileReader上的readAsBinaryString方法
            FileReader.prototype.readAsBinaryString = function (f) {
                var binary = "";
                var wb; // 读取完成的数据
                var outdata; // 你需要的数据
                var reader = new FileReader();
                reader.onload = function () {
                    // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
                    var bytes = new Uint8Array(reader.result);
                    var length = bytes.byteLength;
                    for (var i = 0; i < length; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    // 接下来就是xlsx了，具体可看api
                    wb = XLSX.read(binary, {
                        type: "binary"
                    });
                    outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
                    // 自定义方法向父组件传递数据
                    that.$emit("get", outdata);
                };
                reader.readAsArrayBuffer(f);
            };
            reader.readAsBinaryString(f);
        }
    }
};
</script>

<style>
.input-file {
    display: none;
}
</style>