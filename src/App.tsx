import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Loginform from './components/login-form/loginform';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Listview from './views/ListView/listview';
import Createview from './views/CreateView/createview';
import Dashboard from './components/dashboard/dashboard';


function App() {

  const [todos, setTodos] = useState<any>();
  const [res, setRes] = useState<any>();

  const token = 'AglEVTjKH0MAQOprQZRZJWmpojnMzTGppqcGAp2lQ0u3IdlaaNbh5ulGZP7yrYHTlpBP9SoWumAHAEu7vFxHpJyVlVN2VNjKiLVozgI79sPGpMhuUxUX5Xteb9HYl3DKIH4T2CK5II3aWkSLMVkwG8BCIWRtlQzwlc5MI3tqy9Q9BUiureel4u9JjOLxtkxfjbT4arxHMjAyMi0wMi0yMiAyMjoyNzowOQ';

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Access-Control-Allow-Origin': '*',

    }
  }

  const apiUrlGet = 'https://decor-infra.programmersarmy.net/api/stores';

  const url = 'https://jsonplaceholder.typicode.com/todos';
  const fetchApi = async () => {
    const response = await fetch(url);
    const responseJSON = await response.json();
    console.log(responseJSON);
    setTodos(responseJSON);
  }

  useEffect(() => {
    /* console.log('Este sería mi onInit');
    fetchApi();
    axiosMethodOnInit(); */
  }, [])

  const axiosMethodOnInit = async () => {

    /* const response = await axios.get(apiUrlGet, config).then(res => {
      console.log(res);
      setRes(res);
    }).catch(e => {
      console.log(e);
    });
    console.log(res); */
  }

  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/list" element={<Listview />}>
          </Route>
          <Route path="/create" element={<Createview />}>
          </Route>
          <Route path="/login" element={<Loginform />}>
          </Route>
          <Route path="/" element={<Loginform />}>
          </Route>
          <Route path="/plataforma" element={<Dashboard />}>
          </Route>
        </Routes>
      </div>
    </Router>



  );
}

export default App;
