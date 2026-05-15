import { Button } from "@/components/ui/button"
import { RouterProvider } from "react-router"
import { routerProvider } from "./router/route"
import { Toaster } from "sonner"

export function App() {
  return (
    <>
      <RouterProvider router={routerProvider} />
      <Toaster />
    </>

  )
}

export default App
