import "./Button.css"

interface Props {
  children: string
  className: string
  onClick: () => void
}

function Button({ children, className, onClick }: Props) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}
export default Button