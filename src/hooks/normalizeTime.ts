function normalizeTime(time: number) {
    let min: number | string = Math.floor(time / 60);
    if (min < 10) {
        min = '0' + String(min);
    }
    let sec: number | string = Math.floor(time % 60);
    if (sec < 10) {
        sec = '0' + String(sec);
    }

    return min + ':' + sec;
}

export default normalizeTime