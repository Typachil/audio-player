import classNames from 'classnames';
import './ProgressController.css';
import { FC, useEffect, useRef, useState } from 'react';

interface IProgressController{
    playAudio: boolean | null;
    audioDuration: number;
    timeAudio: number;
    setTimeAudio: (time:number) => void
    changeAudioTime: (time:number) => void;
}

const ProgressController:FC<IProgressController> = ({
    playAudio,
    audioDuration,
    timeAudio,
    setTimeAudio,
    changeAudioTime
}) => {
    const [widthProgressBar, setWidthProgressBar] = useState<DOMRect | undefined>()
    const progressionBar = useRef<HTMLDivElement | null>(null)
    const classDurationAudio = classNames("player-controllers__duration", {
        "player-controllers__duration--visible": playAudio
    })
    
    useEffect(() => {
        setWidthProgressBar(progressionBar.current?.getBoundingClientRect())
    },[]);

    const rewindAudio = (e : React.MouseEvent<HTMLDivElement>) => {
        const indentPreview = (e.clientX - e.currentTarget?.getBoundingClientRect().left);
        const time = Math.round((indentPreview / widthProgressBar.width) * audioDuration)
        setTimeAudio(time)
        changeAudioTime(time)
    }

    const progressionVideo = () => {
        if(widthProgressBar?.width) return Math.floor((timeAudio / audioDuration) * widthProgressBar?.width);  
    };

    return ( 
        <div className={classDurationAudio} ref={progressionBar} onClick={rewindAudio}>
            <div style={{width : progressionVideo() + "px"}} className='player-controllers__duration-progress'></div>
        </div>
    )
}

export default ProgressController