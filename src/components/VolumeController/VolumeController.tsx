import './VolumeController.css';
import {ReactComponent as VolumeCrossSvg} from '../../assets/svg/volume-cross.svg';
import {ReactComponent as VolumeLoudSVG} from '../../assets/svg/volume-loud.svg';
import { FC, useEffect, useRef, useState } from 'react';

interface IVolumeController{
    volumePlayer: number;
    changeVolumePlayer: (volume: number) => void;
}

const VolumeController:FC<IVolumeController> = ({
    volumePlayer,
    changeVolumePlayer
}) => {
    const [defaultControllerVolumeWidth, setDefaultControllerVolumeWidth] = useState(0);
    const [controllerVolumeWidth, setControllerVolumeWidth] = useState(0);
    const controllerVolume = useRef<HTMLDivElement | null>(null);

    const round = (value:number, decimals:number) => {
        const dec = Math.pow(10, decimals);
        return Math.round(value * dec) / dec;
    }

    useEffect(() => {
        setDefaultControllerVolumeWidth(controllerVolume.current.getBoundingClientRect().width);
        setControllerVolumeWidth(defaultControllerVolumeWidth * volumePlayer)
    },[volumePlayer, defaultControllerVolumeWidth, controllerVolumeWidth]);

    const changeWidthController = (e : React.MouseEvent<HTMLDivElement>) => {
        const elementRect = controllerVolume.current?.getBoundingClientRect();
        if(elementRect){
            changeVolumePlayer(round((e.clientX - elementRect?.left) / ((elementRect?.width + elementRect?.left) - elementRect?.left), 2));
        } 
    }

    return ( 
        <div className='player-controllers__sound'>
            <div className='player-controllers__sound-mute' onClick={() => changeVolumePlayer(0)}>
                <VolumeCrossSvg />
            </div>
            <div className='player-controllers__sound-duration' ref={controllerVolume} onClick={changeWidthController}>
                <div style={{width : (controllerVolumeWidth - 5) + "px"}} className='player-controllers__sound-progress'></div>
                <button style={{left : (controllerVolumeWidth - 5) + "px"}} className='player-controllers__sound-switch'></button>
            </div>
            <div className='player-controllers__sound-cross' onClick={() => changeVolumePlayer(1)}>
                <VolumeLoudSVG />
            </div>  
        </div>
    )
}

export default VolumeController