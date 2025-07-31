// components/alert.js


interface Props
{
    children : React.ReactNode;
}

function Alert(props : Props) {
  return <div className="alert alert-warning">{props.children}</div>;
}

export default Alert;
