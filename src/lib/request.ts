import axios, { AxiosError } from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

interface RequestConfig extends Omit<AxiosRequestConfig, 'url' | 'method'> {
  baseURL?: string
  timeout?: number
  headers?: Record<string, string>
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface RequestOptions<D = any> extends RequestConfig {
  url: string
  method?: HttpMethod
  data?: D
}

class HttpError extends Error {
  constructor(public status: number, message: string, public data?: any) {
    super(message)
    this.name = 'HttpError'
  }
}

const defaultConfig: RequestConfig = {
  timeout: 100000,
  headers: {},
}

function createAxiosInstance(config: RequestConfig = {}) {
  return axios.create({
    ...defaultConfig,
    ...config,
  })
}

async function request<T = any, D = any>(
  options: RequestOptions<D>,
  instanceConfig: RequestConfig = {}
): Promise<T> {
  const instance = createAxiosInstance(instanceConfig)

  try {
    const response: AxiosResponse<T> = await instance.request<T>({
      ...options,
      method: (options.method || 'GET').toLowerCase() as Lowercase<HttpMethod>,
    })

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<any>
      if (axiosError.response) {
        throw new HttpError(
          axiosError.response.status,
          axiosError.response.statusText,
          axiosError.response.data
        )
      } else if (axiosError.request) {
        throw new Error('No response received from the server')
      } else {
        throw new Error('Error setting up the request')
      }
    } else {
      throw error
    }
  }
}

// Request interceptor
axios.interceptors.request.use(
  config => {
    // You can modify the request config here
    // For example, add an auth token
    // config.headers.Authorization = `Bearer ${getToken()}`;
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response interceptor
axios.interceptors.response.use(
  response => {
    // You can modify the response data here
    return response
  },
  error => {
    // You can handle response errors here
    return Promise.reject(error)
  }
)

export type { HttpError, RequestOptions, RequestConfig }

export { request }
