import axios from "axios";
import Api_addr from "@/api/api_addr";

export default {
  api: Api_addr.api_url + "/oss",

  uploadBG(jwt, formData) {
    return axios({
      method: 'POST',
      headers: {'token' : jwt},
      url: `${this.api}/upload/background`,
      data: formData
    })
  },

  uploadAvatar(jwt, formData) {
    return axios({
      method: 'POST',
      headers: {'token' : jwt},
      url: `${this.api}/upload/avatar`,
      data: formData
    })
  },

  deleteOssFile(jwt, url) {
    return axios({
      method: 'GET',
      headers: {'token' : jwt},
      url: `${this.api}/delete?url=${url}`,
    })
  },


}
