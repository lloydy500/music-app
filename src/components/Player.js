import React, {useState, useRef, useEffect} from 'react';
import PlayerDetails from './PlayerDetails';
import PlayerControls from './PlayerControls';

function Player(props) {
    const audioEl = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (isPlaying) {
            audioEl.current.play();
        } else {
            audioEl.current.pause();
        }
    });

    // One funtion for skipping forwards or backwards
    // where (forwards = true is the default parameter)
    const skipSong = (forwards = true) => {
        if (forwards) {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp++;

                if (temp > props.songs.length - 1) {
                    temp = 0;
                }

                return temp;
            });
            } else {
                props.setCurrentSongIndex(() => {
                    let temp = props.currentSongIndex;
                    temp--;

                    if (temp < 0) {
                        temp = props.songs.length -1;
                    }

                    return temp;
                });
            }
        }
    return (
        <div className="c-player">
            <audio src={props.songs[props.currentSongIndex].src} ref={audioEl}></audio>
            <PlayerDetails
                song={props.songs[props.currentSongIndex]}
            />
            <PlayerControls
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                skipSong={skipSong}
            />
            <p>
            <strong>Next up:</strong>
            {props.songs[props.nextSongIndex].title} by
            {props.songs[props.nextSongIndex.artist]}
            </p>
        </div>
    )
}

export default Player
