import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export default class HttpService {

  private logRequest(method: string, url: string, data?: any) {
    console.log(`➡️ Outbound Request: ${method.toUpperCase()} ${url}`);
    if (data) {
      console.log('Request Data:', data);
    }
  }

  private logResponse(response: AxiosResponse) {
    console.log(`⬅️ Response: ${response.status} ${response.config.url}`);
    console.log('Response Data:', response.data);
  }

  private logError(method: string, url: string, error: any) {
    console.error(`❌ Error on ${method.toUpperCase()} ${url}`);
    if (error.response) {
      // Server responded with a status outside 2xx
      console.error('Status:', error.response.status);
      console.error('Response Data:', error.response.data);
    } else if (error.request) {
      // No response received
      console.error('No response received:', error.request);
    } else {
      // Other errors
      console.error('Error message:', error.message);
    }
  }

  async get<T>(url: string): Promise<T> {
    this.logRequest('get', url);
    try {
      const response = await axios.get<T>(url);
      this.logResponse(response);
      return response.data;
    } catch (error: any) {
      this.logError('get', url, error);
      throw error;
    }
  }

  async post<T>(url: string, data: any): Promise<T> {
    this.logRequest('post', url, data);
    try {
      const response = await axios.post<T>(url, data);
      this.logResponse(response);
      return response.data;
    } catch (error: any) {
      this.logError('post', url, error);
      throw error;
    }
  }

  async put<T>(url: string, data: any): Promise<T> {
    this.logRequest('put', url, data);
    try {
      const response = await axios.put<T>(url, data);
      this.logResponse(response);
      return response.data;
    } catch (error: any) {
      this.logError('put', url, error);
      throw error;
    }
  }
}
