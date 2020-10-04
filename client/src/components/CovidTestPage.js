import React, {useEffect , useState} from 'react';
import { read } from '../services/network';
import gif from '../media/corona_gif.gif';
import './CovidTestPage.css';

function CovidTestPage() {
    
    const [data, setData] = useState(null);
    const [positiveCount, setPositiveCount] = useState(null);
    const [negativeCount, setNegativeCount] = useState(null);

    useEffect(() => {getInfo();} , []);
    useEffect(() => {getPositiveAndNegative();} , []);
    
    const getInfo = async () => {
       await read(`covidtests`).then(r => {setData(r)});
    };

    const getPositiveAndNegative = async () => {
        await read('covidtests/test-results/1')
        .then(r => {setPositiveCount(r.count)})
        await read('covidtests/test-results/0')
        .then(r => {setNegativeCount(r.count)})
    }
    

    return(
        <>
        { Array.isArray(data) ?
    <div id='covidtest'>
        <h2>Covid 19 Tests Summary</h2>
        <p className="field">Tests: <span>{data.length}</span></p>
        <p className="field">Positive: <span>{positiveCount} Tests ({positiveCount/data.length*100}%)</span></p>
        <p className="field">Negative: <span>{negativeCount} Tests ({negativeCount/data.length*100}%)</span></p>
    </div>
    : 
    <div>
    <img src={gif} alt="loading..." />
    <h1>server is not connected</h1>
</div>
}
</>
    );
}

export default CovidTestPage;