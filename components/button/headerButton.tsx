import classNames from "classnames"
import Button from "./button"

interface HeaderButtonProps {
  children?: React.ReactNode
  onClick?: Function
  className?: string
}

export const HeaderButton = ({ children, onClick, className }: HeaderButtonProps) => {
  return (
    <Button
      ripple
      className={classNames("mx-auto mt-14 max-w-full p-3", className)}
      onClick={onClick}
      data-aos="fade-up"
    >
      {children}
    </Button>
  )
}