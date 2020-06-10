const axios = require('axios')
const aeroports = require('./airports_br.json')

const start = async (aeroports) => {
  const findData = async aeroports => {
    console.log('Iniciouu findData')
    const data = await aeroports.map(item => {
      const result = {
        "name": item.name,
        "city": item.city,
        "uf": item.state,
        "code": item.code,
      }
      return result
    })

    return data
  }
  const data = await findData(aeroports)

  const save = async (data) => {
    const api = axios.create({
      baseURL: 'https://apiairfaremonitor.herokuapp.com',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer eoxNTkyNDIwNTY3fQ.AFhw8U9BHSZ1o8uc3h-DGxeOZeyy9xKM0x7a_ELjuoE"
      }
    });

    for (const aeroport of  data) {
      const response = await api.post('/airports', aeroport)
      if(response.status == 200 ){
        console.log('response: ', response.data)
      } else {
        console.log('ERRO')
      }
    }    
    return true
  }  
  const result = await save(data)
  
  result ? console.log('OK') : console.log('Deu Erro')
}

start(aeroports)