const Button=({text,onClick,customClass})=>{
  return (
    <button className={customClass} onClick={onClick}>{text}</button>
  )
}
export default Button;