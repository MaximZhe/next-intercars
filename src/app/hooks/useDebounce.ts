'use client'
import { useEffect, useState } from "react";


export function useDebounce (value:string, delay:number = 300) : string {
    const [valueDebounce, setValueDebounce] = useState(value);
    
    useEffect(() => {
      const handler = setTimeout(() => {
        setValueDebounce(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
    return valueDebounce
}