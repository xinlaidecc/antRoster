import request from 'umi-request';
import { TableListParams } from './data.d';
import {isNumber} from '../../../utils/numberUtils'

export async function queryRule(params: TableListParams) {
  // 分页参数名转成后端需要的格式
  // payload{pageSize->size currentPage->page}
  params["size"] = params.pageSize;
  delete params.pageSize;
  if(!isNumber(params["size"])){
    params["size"] = 10;
  }
  params["page"] = params.currentPage - 1;
  delete params.currentPage;
  if(!isNumber(params["page"])){
    params["page"] = 0;
  }

  console.log('queryRule');
  console.log(params);

  let s_params = JSON.stringify(params).replace(/#/g,'.');
  console.log(s_params);

  params = JSON.parse(s_params);

  let response = request('http://localhost:8080/api/employees', {
    params,
    getResponse: true
  })

  // console.log(response);
  response.then(res => {
    // console.log(res);
    // console.log(res.response.headers.get('X-Total-Count'));
    res["list"] = res.data;
    delete res.data;
    res["pagination"] = {
      total:parseInt(res.response.headers.get('X-Total-Count')),
    }
    delete res.response;
  });

  return response;
}

export async function removeRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
