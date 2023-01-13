import { ApiClient } from "services";
import { IExchangeGiftPayload, IListExchangeGift, ResponseData } from "./GiftExchangeInterface";

export const getListExchangeGift = (
    payload: IExchangeGiftPayload
  ): Promise<ResponseData<IListExchangeGift[]>> => {
    return ApiClient.get(`/Gift/GetListExchangeGift`, payload)
  }