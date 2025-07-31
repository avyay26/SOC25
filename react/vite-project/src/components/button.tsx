interface Props
{item : String;
color ?: String;
onClick: ()=>void;
}

function button (props :Props)
{   //even handle click event
    return (<button type="button" className={"btn btn-"+props.color} onClick={props.onClick}>{props.item}</button>);
    
}

export default button;  