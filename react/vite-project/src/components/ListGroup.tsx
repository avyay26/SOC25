import { useState } from "react";
// {items : [], heading : array} For this we are using interface

interface Props {
    items: string[];
    heading: string;
    onSelectItem: (item: String) => void;
}

export function List(props: Props) {
    //let items = ["London", "Cali", "Paris", "Shanghai", "Kuala-lumpur"];
    //items=[];
    // let selind=1;
    //Hook
    let [selind, setselind] = useState(-1);
    //let [name,setName]     =useState('');

    return (<div><h1>{props.heading}</h1>
        {props.items.length === 0 && <p>No element Found</p>}
        <ul className="list-group">
            {props.items.map((item, index) => (<li className={selind === index ? 'list-group-item active' : 'list-group-item'} key={item} onClick={() => {
                setselind(index);
                props.onSelectItem(item);

            }}>{item}</li>))}
        </ul></div>);

}

export default List;  