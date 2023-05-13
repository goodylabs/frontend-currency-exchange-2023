import {useCallback, useEffect, useState} from "react";

const useLocalStorage = <TData>(key: string) => {
    const [items, setItems] = useState<TData[]>(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : []
    });
  const addItem = (item: TData) => {
    setItems(prevState => [...prevState, item]);
  }
  const removeItem = (callback: (item:TData) => boolean) => {
        if(typeof callback !== "function"){
            throw new Error('Provide filter function!')
        }
        const data = items.filter(callback);
        setItems(data);

  }
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(items))
    }, [items])
    return{
        items, addItem,removeItem
    }
}
export default useLocalStorage