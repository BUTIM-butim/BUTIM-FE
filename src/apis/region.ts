import { axiosInstance } from './axiosInstance';

export type SidoResponse = {
  sidoCode: string;
  sidoName: string;
};

export type SigunguResponse = {
  regionId: number;
  sidoCode: string;
  sidoName: string;
  sigunguCode: string;
  sigunguName: string;
};

type BaseResponse<T> = {
  isSuccess: boolean;
  code: number;
  message: string;
  result: T;
};

export const regionApi = {
  getSidoList: async (): Promise<SidoResponse[]> => {
    const response = await axiosInstance.get<BaseResponse<SidoResponse[]>>(
      '/api/regions/sido',
    );

    return response.data.result;
  },

  getSigunguList: async (
    sidoCode: string,
  ): Promise<SigunguResponse[]> => {
    const response = await axiosInstance.get<BaseResponse<SigunguResponse[]>>(
      '/api/regions/sigungu',
      {
        params: {
          sidoCode,
        },
      },
    );

    return response.data.result;
  },
};