import { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import ItemRepo from '../components/ItemRepo'
import {Container} from './styles'
import { api } from '../services/api'

function App() {
  

  const [currentRepo, setCurrentRepo] = useState('')
  const [repos, setRepos] = useState([]);

  const handleSearcheRepo = async () => {
    const {data} = await api.get(`repos${currentRepo}`)

    if (data.id){

      const isExist = repos.find(repo => repo.id === data.id)
      if(!isExist){

        setRepos(prev => [...prev, data]);
        setCurrentRepo('')
        return 
      }

    }
    alert('Repositório não encontrado')
  }



  return (
    <Container>
      <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt='logo' width={72} height={72}/>
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}/>
      <Button onClick={handleSearcheRepo}/>
      {repos.map(repo => <ItemRepo repo={repo}/>)}     
    </Container>
  );
}

export default App;
