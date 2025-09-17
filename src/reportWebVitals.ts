/**
 * @fileoverview Web Vitals reporting for performance monitoring
 * Measures and reports Core Web Vitals metrics for the application
 *
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import {
  getCLS,
  getFID,
  getFCP,
  getLCP,
  getTTFB,
} from "web-vitals";

type ReportHandler = (metric: any) => void;

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
};

export { reportWebVitals };