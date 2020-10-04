import React , {useState , useEffect} from 'react';
import axios from 'axios';
import './Icon.css';

function Icon(params)
{
return (<div className={`icon-${params.type}`}>{params.type}
    </div>);
}

export default Icon;