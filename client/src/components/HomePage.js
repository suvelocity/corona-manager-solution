import React, {useEffect , useState} from 'react';
import { read } from '../services/network';
import './HomePage.css';
import Icon from './Icon';

function HomePage() {

    const [data, setData] = useState(0);

    useEffect(() => {getInfo();} , []);
    
    const getInfo = async () => {
       await read(`patients`).then(r => {
        console.log(r)
           setData(r)
        });
    };

    const deadCount = Array.isArray(data) ? data.filter(e => e.status === 'dead').length : -1;
    const resCount = Array.isArray(data) ? data.filter(e => e.status === 'respiratory').length : -1;

    return (<div id="home">
        <div className="icon-corona"/>
        <h1>CoronaVirus</h1>
        <h2>Israel Nation</h2>
        <div className="icon-israel"/>
        <div className="header">Total Cases</div>
        <div className="cases">{data.length}</div>
        <div className="header">Total In Respiratory State</div>
        <div className="cases">{resCount}</div>
        <div className="header">Total Deaths</div>
        <div className="cases">{deadCount}</div>
        <div id="icon-menu">
        <Icon type='city'/>
        <Icon type='patient'/>
        <Icon type='hospital'/>
        <Icon type='test'/>
        </div>
        <div ></div>
    </div>);
}

export default HomePage;