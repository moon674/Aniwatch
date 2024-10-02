"use client";
import { useEffect, useRef } from "react";

const Google = () => {
  // const cooldownRef = useRef(false);
  useEffect(() => {
    const headID = document.getElementsByTagName("head")[0]
    const gtScript = document.createElement("script")
    gtScript.async = true
    gtScript.src = "https://www.googletagmanager.com/gtag/js?id=G-R0ZKP80E62"
    headID.appendChild(gtScript)

    const gtConfig = document.createElement("script")
    gtConfig.text = `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-R0ZKP80E62');`
    headID.appendChild(gtConfig)
    
    const handleClick = () => {
      if (!cooldownRef.current) {
        window.open('https://noohapou.com/4/8184199', '_blank');
        cooldownRef.current = true;
        setTimeout(() => (cooldownRef.current = false), 10000);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
  return null
};

export default Google;
