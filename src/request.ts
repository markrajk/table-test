import { currentSession } from 'src/redux/auth/UserSession'

let API_ROOT = process.env.REACT_APP_API || 'http://192.168.178.21:8080'
let DEMO_ROOT = 'https://demotf.herokuapp.com/'
let env = 'dev'
//env = 'prod'
API_ROOT = process.env.REACT_APP_API || 'https://tfbackdev.herokuapp.com'
API_ROOT = window.location.href.includes('http://localhost:3000') ? (process.env.REACT_APP_API || 'http://192.168.178.21:8080') : 'https://tfbackdev.herokuapp.com'
//https://tfback.herokuapp.com
export const IMAGE_API_ROOT = 'http://images.teamfeedback.app/api/'
const IMAGE_UPLOAD_API_ROOT = `https://images.teamfeedback.app/api/upload.php`

export const currentApi =
  API_ROOT === 'https://tfback.herokuapp.com' ? 'Heroku' : 'Local'
export interface APIError {
  message: string
  status: number
}

type Headers = Record<string, string> | undefined

type BodyType = unknown

export type RequestReturn =
  | { success: true; data: BodyType }
  | { success: false; message: string }

export type RequestSuccess<T> = { success: true; data: T }
export type RequestFail = { success: false; message: string }
export type RequestReturnParam<T> = RequestSuccess<T> | RequestFail

const request = async (
  url: string,
  method: 'POST' | 'PUT' | 'GET' | 'DELETE',
  body: BodyType | undefined | null,
  addauth?: boolean,
  headers?: Headers | null,
  demo?: boolean
): Promise<RequestReturn> => {
  const decoratedOptions = {
    method,
    headers: Object.assign({}, headers),
    body:
      (method === 'POST' || method === 'PUT' || method === 'DELETE') && body
        ? JSON.stringify(body)
        : undefined,
  }
  decoratedOptions.headers.Accept = '*/*'
  decoratedOptions.headers['Content-Type'] = 'application/json'
  decoratedOptions.headers['accept-encoding'] = 'gzip, deflate'
  const session = currentSession()
  let decoratedUrl = url
  if (addauth && session?.jwt) {
    decoratedOptions.headers.Authorization = 'Bearer ' + session?.jwt
  }
  try {
    const response = await fetch(`${demo ? DEMO_ROOT : API_ROOT}${decoratedUrl}`, decoratedOptions)
    if (response.status === 200) {
      const json = await response.json()
      return { success: true, data: json }
    } else {
      const json = await response.json()
      const apierror: APIError = {
        message: json.err,
        status: response.status,
      }
      return { success: false, message: apierror.message }
    }
  } catch (err) {
    console.log(err)

    const apierror: APIError = {
      status: 0,
      message: err.toString(),
    }
    return { success: false, message: apierror.message }
  }
}

export const requestUploadImage = async (formData: any): Promise<any> => {
  //console.log(formData)
  const options = {
    method: 'POST',
    body: formData,
    header: {
      //'Content-Type': 'application/json'
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  }
  try {
    const response = await fetch(IMAGE_UPLOAD_API_ROOT, options)
    const json = await response.json()
    if (response.status === 200) {
      return { success: true, data: json }
    } else {
      const apierror: APIError = {
        message: json.error,
        status: response.status,
      }
      return { success: false, message: apierror }
    }
  } catch (err) {
    return { success: false, message: err }
  }
}

export default request
