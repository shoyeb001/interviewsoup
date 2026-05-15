import { Button } from "@/components/ui/button"
import { RouterProvider } from "react-router"
import { routerProvider } from "./router/route"

export function App() {
  return (
    <RouterProvider router={routerProvider} />
  )
}

export default App
