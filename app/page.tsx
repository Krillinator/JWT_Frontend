"use client"
import { FormEvent, useState } from "react"

export default function Home() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    // Prepare the authentication request data
    const formData = {
      username,
      password,
    }

    let token

    try {
      // Send the authentication request to your backend
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // Authentication successful
        const data = await response.json()
        token = data.token

        // Store the token securely (e.g., in local storage)
        localStorage.setItem("token", token)

        // Redirect or perform any other actions as needed
        console.log("Authentication successful. Token:", token)
      } else {
        // Authentication failed
        console.error("Authentication failed")
      }
    } catch (error) {
      console.error("Error occurred during authentication:", error)
    }

    const requestData = {
      message: "Hello from the client!",
      timestamp: new Date().toISOString(),
    }

    // Send the POST request to the debug endpoint
    const result2 = await fetch("http://localhost:8080/debug", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
      },
      body: JSON.stringify(requestData),
    })

    console.log(await result2.json())
    console.log(token)
  }

  return (
    <main>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            onChange={(event) => setUsername(event.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </main>
  )
}
