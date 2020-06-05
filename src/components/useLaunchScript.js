import { useEffect } from "react"

const useLaunchScript = scriptUrl => {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = scriptUrl
    script.async = "true"
    document.body.appendChild(script)
  }, [scriptUrl])
}

export default useLaunchScript
