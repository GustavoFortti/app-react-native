// TimeTracker.js
import { useState, useEffect } from 'react';

const screenTimeTracker = {};

export function useScreenTime(screenName) {
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    setStartTime(Date.now());
    return () => {
      const endTime = Date.now();
      const timeSpent = endTime - startTime;

      if (screenName) {
        if (screenTimeTracker[screenName]) {
          screenTimeTracker[screenName] += timeSpent;
        } else {
          screenTimeTracker[screenName] = timeSpent;
        }
      }

    //   console.log(`Tempo gasto em ${screenName}: ${timeSpent}ms`);
    };
  }, [screenName, startTime]);

  return screenTimeTracker;
}
