import React, {useEffect , useState} from 'react';
import { read } from '../services/network';
import './HospitalPage.css';

function HospitalPage() {
    const [data, setData] = useState([]);

    const [display, setDisplay] = useState(0);

    useEffect(() => {getInfo();} , []);
    
    const getInfo = async () => {
       await read(`hospitals`).then(r => {setData(r)});
    };

    return(<div id='hospital'>
        <h2>Select a Hospital:</h2>
        <select onChange={async (e) => {
            await read(`hospitals/byId/${e.target.value}`).then(r => {setDisplay(r)});
            }}>
            {data.map((e) => <option value={e.id}>{e.name}</option>)}
        </select>
        {display !== 0 && <div>
            <div className='field'>Hospital Name: <span>{display.name}</span></div>
            <div className='field'>Respirator Amount: <span>{display.respiratorAmount}</span></div>
            <div className='field'>Maximum Patient Capacity: <span>{display.maxCapacity}</span></div>
            <div className='field'>Registered Patients:</div>
            <ul>
            {display.Patients.map((e) => <li>{e.name}</li>)}
            </ul>
            </div>}
    </div>);
}

export default HospitalPage;