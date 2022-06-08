const BASE_URL = "https://test.divo.kr/";

export const LOGIN_URL = BASE_URL + 'auth/login/';

export const CORPLIST_URL = BASE_URL + 'auth/user/corporation';
export const CORPINFO_URL = BASE_URL + 'corporation/?corp_id=';

export const REVIEW_URL = (corpId: string, page: number, type: string) => BASE_URL + `corpreview/reviewList?corpId=${corpId}&src=${type}&display=6&page=${page}`;