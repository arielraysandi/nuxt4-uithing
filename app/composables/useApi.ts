import Axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
} from "axios";
import { defineStore } from "pinia";
import { useUserData } from './../stores/auth';

type Request = {
  url: string;
  params?: Record<string, any>;
};

type ApiResponse<T> = {
  data: T;
  response: AxiosResponse;
};

type UploadRequest = {
  url: string;
  params?: Record<string, any>;
};

type LaravelError422 = Record<string, string[] | string>;

export const useApi = defineStore("api", () => {
  const config = useRuntimeConfig();

  const api: AxiosInstance = Axios.create({
    baseURL: config.public.baseUrl as string,
    headers: {
      Accept: "application/json",
    },
  });

  /**
   * Request Interceptor
   */
  api.interceptors.request.use((config) => {
    const token = useUserData().value.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  /**
   * Response Interceptor
   */
  api.interceptors.response.use(
    (response) => {
      const method = response.config.method?.toLowerCase();

      const successMethods = ["post", "put", "patch", "delete"];

      if (successMethods.includes(method ?? "")) {
        const message =
          response.data?.message ?? "Action completed successfully";

        useSonner.success("Success", {
          description: message,
          richColors: true,
          duration: 3000,
        });
      }

      return response;
    },
    (error) => {
      handleError(error);
      return Promise.reject(error);
    }
  );

  async function get<T>({ url, params = {} }: Request): Promise<ApiResponse<T>> {
    const response = await api.get(url, { params });
    return { data: response.data.data as T, response };
  }

  async function post<T>({ url, params = {} }: Request): Promise<ApiResponse<T>> {
    const response = await api.post(url, params);
    return { data: response.data.data as T, response };
  }

  async function put<T>({ url, params = {} }: Request): Promise<ApiResponse<T>> {
    const response = await api.put(url, params);
    return { data: response.data.data as T, response };
  }

  async function download({ url, params = {} }: Request): Promise<Blob> {
    const response = await api.get(url, {
      params,
      responseType: "blob",
    });
    return response.data;
  }

  async function uploadFile(
    { url, params = {} }: UploadRequest,
    onProgress?: (percent: number) => void
  ): Promise<any> {
    const formData = new FormData();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    const request = api.post(url, formData, {
      onUploadProgress: (progressEvent) => {
        if (!progressEvent.total) return;

        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );

        onProgress?.(percent);
        console.warn(`Upload progress: ${percent}%`);
      },
    });

    useSonner.promise(request, {
      loading: "Uploading file...",
      success: () => "File uploaded successfully",
      error: "Failed to upload file",
    });

    return await request;
  }


  function handleError(error: AxiosError<any>): void {
    console.error(error);

    if (!error.response) {
      useSonner.error("Network error", {
        description: 'Connection to server failed, please try again later.',
        richColors: true,
        duration: 3000,
      });
      return;
    }

    const { status, data } = error.response;

    switch (status) {
      case 422: {
        const errors: LaravelError422 = data.errors ?? data;
        const messages: string[] = [];

        Object.values(errors).forEach((err) => {
          if (Array.isArray(err)) messages.push(...err);
          else messages.push(err);
        });

        useSonner.error("Validation error", {
          description: messages.join("\n"),
          richColors: true,
          duration: 3000,
        });
        return;
      }

      case 400: {
        if (data?.data?.code === "refresh_required") {
          window.location.reload();
          return;
        }

        useSonner.error("Bad request", {
          description: data?.message ?? "Bad request.",
          richColors: true,
          duration: 3000,
        });
        return;
      }

      case 401:
        useSonner.error("Unauthorized", {
          description: "Session Expired / Invalid Token.",
          richColors: true,
          duration: 3000,
        });
        useUserData().value = { token: null, user: null };
        navigateTo("/auth/login", { external: true });
        return;

      case 403:
        useSonner.error("Forbidden", {
          description: "You don't have permission to access this resource.",
          richColors: true,
          duration: 3000,
        })
        navigateTo("/", { external: true });
        return;

      case 503:
        throw createError({
          statusCode: 503,
          statusMessage: "Server under maintenance. Please try again later.",
          fatal: true,
        });

      default:
        if (status >= 500) {
          useSonner.error("Server error", {
            description: config.public.env === "production"
              ? "Something went wrong, please try again later."
              : data?.data?.message ?? "Something went wrong, please try again later.",
            richColors: true,
            duration: 3000,
          })
          return;
        }

        useSonner.error("Error", {
          description: data?.data?.message ?? "Something went wrong, please try again later.",
          richColors: true,
          duration: 3000,
        })
        navigateTo("/");
    }
  }

  return {
    get,
    post,
    put,
    download,
    uploadFile,
  };
});
