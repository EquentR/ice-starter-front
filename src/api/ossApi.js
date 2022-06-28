import axios from "axios";
import Api_addr from "@/api/api_addr";

export default {
  api: Api_addr.api_url + "/uploadToOss",

  //OSS对象存储上传
  uploadImage(formData) {

    return axios({
      method: 'POST',
      url: `${this.api}`,
      data: formData,
    })
  },

  //用户上传信息存储
  saveProperties(jwt) {

  }

}
