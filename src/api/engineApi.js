import axios from "axios";
import Api_addr from "@/api/api_addr";
export default {
  api: Api_addr.api_url + "/searchEngine",

  //更新引擎
  update(jwt, engines) {
    return axios({
      method: 'POST',
      url: `${this.api}`,
      headers: {'token' : jwt},
      data: engines
    })
  },

  //获取引擎
  get(jwt) {
    return axios({
      method: 'GET',
      url: `${this.api}`,
      headers: {'token' : jwt},
    })
  },
  //清空
  clear(jwt) {
    return axios({
      method: 'DELETE',
      url: `${this.api}`,
      headers: {'token' : jwt},
    })
  }
}
