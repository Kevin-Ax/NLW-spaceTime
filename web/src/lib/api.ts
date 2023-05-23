import axios from 'axios'

export const api = axios.create({
  // cuidado com o ip, caso de erros, verifique o ip do pc local -- ipconfig
  baseURL: 'http://192.168.3.7:3001',
})
