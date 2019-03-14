
export function GetUrlRelativePath(authority)
{
  const url = document.location.toString();
  const arrUrl = url.split("//");

  const start = arrUrl[1].indexOf("/");
  let relUrl = arrUrl[1].substring(start); // stop省略，截取从start开始到结尾的所有字符

  if(relUrl.indexOf("?") !== -1){
    // eslint-disable-next-line prefer-destructuring
    relUrl = relUrl.split("?")[0];
  }
  if (authority[0]==='guest' || !authority) {
    if (relUrl !== '/user/login') window.location.href = '/user/login';
    return false;
  }
  return true;
}
// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem('antd-pro-authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  if (GetUrlRelativePath(authority)){
    return authority;
  }
  // window.location.href = '/user/login'
  return authority || ['admin'];
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}
