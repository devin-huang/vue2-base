const getDataType = (name) => {
  return (type) => Object.prototype.toString.call(type) === `[object ${name}]`;
};

export const isError = (value) => getDataType("Error")(value);

export const isObject = (value) => getDataType("Object")(value);

export const isString = (value) => getDataType("String")(value);

export const isNumber = (value) => getDataType("Number")(value);

/**
 * 下载模板文件
 * @param {下载模板的url} url
 */
export function downloadTemplate(url) {
  url = `${url}`;
  fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      jt: localStorage.getItem('jt'),
    },
  }).then((response) => {
    const contentDisposition = decodeURI(
      response.headers.get('Content-Disposition') || response.headers.get('content-disposition')
    )

    try {
      const filename = contentDisposition.split(';')[1].split('=')[1];

      response.blob().then((data) => {
        const a = document.createElement('a') 
        const url = window.URL.createObjectURL(data)
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        setTimeout(() => document.body.removeChild(a), 1000);
        window.URL.revokeObjectURL(url)  
      })
    } catch (e) {
      console.log(e)
    }
  });
}

/**
 * 将文件转化为File类型或者Blob类型
 * @param {下载模板的url} url
 */
 export function getFileByBlobFile(file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function () {
    file.result = reader.result
  }.bind(this);
  return file
}


/**
 * 上传文件（两种方式：1：上传时立即调用请求将资源保存在服务器，返回路径，2：阻止上传组件立马上传，使用File、Bolb类型在全部内容提交时将资源上传）
 * @param {上传的url} url
 * @param {额外参数} extarProps
 * @param {上传类型} type  
 */
 export function uploadFile(url, extarProps, type = 'url') {

  let fileSource

  // 将资源保存在服务器返回路径
  if (type === 'url') {}

  // 使用File、Bolb类型提交时上传
  if (type === 'blob') {
    fileSource = getFileByBlobFile(file)
    const formData = new FormData()
    formData.append('file', fileSource)
  }
  // 请求接口处理
}
