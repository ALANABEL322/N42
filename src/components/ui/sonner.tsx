import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const toastStyles = {
  userMessage: {
    background: 'bg-blue-500',
    text: 'text-white',
  },
  adminResponse: {
    background: 'bg-green-500',
    text: 'text-white',
  },
}

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        className: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
      }}
      {...props}
    />
  )
}

export { Toaster, toastStyles }
