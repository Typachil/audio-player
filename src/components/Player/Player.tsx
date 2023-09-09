import './Player.css';
import {ReactComponent as RewindSvg} from '../../assets/svg/rewind.svg';
import {ReactComponent as PauseSvg} from '../../assets/svg/pause-stream.svg';
import { useEffect, useRef, useState } from 'react';
import VolumeController from '../VolumeController/VolumeController';
import classNames from 'classnames';
import ProgressController from '../ProgressController/ProgressController';

const Player = () => {
    const srcSource = ["bensound-1.mp3", "bensound-2.mp3", "bensound-3.mp3"];
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const [playAudio, setPlayAudio] = useState<boolean | null>(null)
    const [audioNumber, setAudioNumber] = useState<number>(0)
    const [audioDuration, setAudioDuration] = useState<number>(0)
    const [timeAudio, setTimeAudio] = useState<number>(0)
    const [volumePlayer, setVolumePlayer] = useState<number>(0.1);

    const classNameCover = classNames("player-cover", {
        "player-cover--animate": playAudio
    })

    useEffect(() => {
        setPlayAudio(false)
    }, [audioDuration])

    useEffect(() => {
        if(audioRef.current) audioRef.current.volume = volumePlayer;
    }, [volumePlayer])

    useEffect(() => {
        playAudio ? audioRef.current?.play() : audioRef.current?.pause()
    }, [playAudio])

    const progressUpdate = () => {
        if(audioRef.current) setTimeAudio(Math.round(audioRef.current?.currentTime));
    };

    const changeVolumePlayer = (volume: number) => {
        setVolumePlayer(volume)
    }

    const changeAudioTime = (time:number) => {
        if(audioRef.current) audioRef.current.currentTime = time;
    }

    const canPlayAudio = () => {
        const audioDuration = Math.round(audioRef.current?.duration || 0);
        setAudioDuration(audioDuration)
    };

    const changeNextAudio = () => {
        audioNumber >= srcSource.length - 1 ? setAudioNumber(0) : setAudioNumber(audioNumber + 1)
    }

    const changeLastAudio = () => {
        audioNumber <= 0 ? setAudioNumber(srcSource.length - 1) : setAudioNumber(audioNumber - 1)
    }

    return (
        <div className='player'>
            <div className='player-controllers'>
                <audio ref={audioRef} src={"/audio/" + srcSource[audioNumber]} onLoadedData={canPlayAudio} onTimeUpdate={progressUpdate}>
                </audio>
                <div className='player-controllers__left-block'>
                    <button className='player-controllers__item player-controllers__rewind-back' onClick={changeLastAudio}>
                        <RewindSvg />
                    </button>
                    <button className='player-controllers__item player-controllers__play' onClick={() => setPlayAudio(!playAudio)}>
                        <PauseSvg />
                    </button>
                    <button className='player-controllers__item player-controllers__rewind-forward' onClick={changeNextAudio}>
                        <RewindSvg />
                    </button>
                </div>
                <div className='player-controllers__right-block'>
                    <VolumeController volumePlayer={volumePlayer} changeVolumePlayer={changeVolumePlayer}/>
                    <p className='player__sound-name'>{srcSource[audioNumber]}</p>
                    <ProgressController 
                        audioDuration={audioDuration} 
                        timeAudio={timeAudio} 
                        playAudio={playAudio} 
                        setTimeAudio={setTimeAudio} 
                        changeAudioTime={changeAudioTime}/>
                </div>
            </div>
            <div className={classNameCover}>
                <img src="/img/risian.png" alt="Обложка" />
            </div>
        </div>
      )
}

export default Player