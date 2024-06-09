import { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';

const useDisplay = () => {
    const [isMobile, setIsMobile] = useState(getWindowSize().innerWidth <= 992);
    const [isMedium, setIsMedium] = useState(getWindowSize().innerWidth <= 1539);
    const vhRef = useRef(getWindowSize().innerHeight / 100);

    useEffect(() => {
        function handleWindowResize() {
            handleSet100Vh();
            const windowWidth = getWindowSize().innerWidth;

            if (windowWidth <= 992) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
            if (windowWidth <= 1539) {
                setIsMedium(true);
            } else {
                setIsMedium(false);
            }
        }

        const handleSet100Vh = debounce(() => {
            vhRef.current = getWindowSize().innerHeight / 100;
            // Manually handle any side effects here
            document.documentElement.style.setProperty('--vh', `${vhRef.current}px`);
        }, 300);

        window.addEventListener('resize', handleWindowResize);
        window.addEventListener('orientationchange', handleSet100Vh);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
            window.removeEventListener('orientationchange', handleSet100Vh);
        };
    }, []);

    useEffect(() => {
        document.documentElement.style.setProperty('--vh', `${vhRef.current}px`);
    }, []);

    return { isMobile, vh: vhRef.current, isMedium };
};

function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
}

export default useDisplay