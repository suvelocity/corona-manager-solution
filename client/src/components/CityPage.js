import React, {useEffect , useState} from 'react';
import { read } from '../services/network';
import './CityPage.css';

function PatientPage() {
    const [data, setData] = useState([]);

    const [display, setDisplay] = useState(0);

    useEffect(() => {getInfo();} , []);
    
    const getInfo = async () => {
       await read(`cities`).then(r => {setData(r)});
    };

    return(<div id='city'>
        <h2>Select a Patient:</h2>
        <select onChange={async (e) => {
            await read(`cities/byId/${e.target.value}`).then(r => {setDisplay(r)});
            }}>
            {data.map((e) => <option value={e.id}>{e.name}</option>)}
        </select>
        {display !== 0 && <div>
            <div className='field'>City Name: <span>{display.name}</span></div>
            <div className='field'>Population: <span>{display.population}</span></div>          
            <div className='field'>Patients From The City:</div>
            <ul>
            {display.Patients.map((e) => <li>{e.name}</li>)}
            </ul>
            </div>}
    </div>);
}

export default PatientPage;