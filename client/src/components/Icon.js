import React , {useState , useEffect} from 'react';
import { read } from '../services/network';
import './Icon.css';
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";

function Icon(params)
{
    const [modal , setModal] = useState(false);

    const [info, setInfo] = useState([]);

    const getInfo = async () => {
        params.type == 'patient' && await read(`patients`).then(r => setInfo(r));
        params.type == 'city' && await read(`cities`).then(r => setInfo(r));
        params.type == 'hospital' && await read(`hospitals`).then(r => setInfo(r));
        params.type == 'test' && await read(`covidTests`).then(r => setInfo(r));
    };

    return (<div className={`icon-${params.type}`} onClick={() => {getInfo(); setModal(!modal)}}>{params.type}
    <Modal
        aria-labelledby="hi"
        aria-describedby="description" 
        open={modal}
        className={"modal"}
        onClose={() => {setModal(false)}}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={modal}>
          <div className={"paper"}>
        {info.map((e) => <div className='modelItem'>{e.hasOwnProperty('isSick') ? e.Patient.name + ' test result: ' + e.isSick : e.name}</div>)}
          </div>
        </Fade>
      </Modal>
        </div>);
}

export default Icon;