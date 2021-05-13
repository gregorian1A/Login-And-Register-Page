import React, { useState } from "react";
import "./style.css";

const userDatabase = [
  {
    username: "gregory",
    email: "abc@yahoo.com",
    password: "123123"
  },
  {
    username: "John Doe",
    email: "def@yahoo.com",
    password: "abcdef"
  },
  {
    username: "Jane Wong",
    email: "123@yahoo.com",
    password: "321321"
  },
]

const App = () => {
  const [database, setDatabase] = useState(userDatabase);
  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const login = details => {
    database.map(data => {
      if (details.email === data.email && details.password === data.password) {
        setUser({
          name: details.name,
          email: details.email
        })
      }
      else {
        setError("Details do not match")
        setTimeout(() => {
          setError("")
        }, 4000)
      }
    })
  }
  const logout = () => {
    setUser({ name: "", email: "" })
  }
  const createDetails = details => {
    database.map(data => {
      if (details.email === data.email) {
        setError("Email already exists")
        setTimeout(() => {
          setError("")
        }, 4000)
      }
      else {
        const newdatabase = [...database, details];
        setDatabase(newdatabase)
      }
    })
  }

  return (
    <div>
      {
        user.email !== ""
          ?
          (<div className="welcome">
            <h1>Welcome, Nduka{user.name}</h1><button onClick={logout}>Logout</button>
          </div>)
          :
          (
            <LoginAndRegister error={error} login={login} createDetails={createDetails} />
          )
      }
    </div>
  );
}

const Login = ({ login, error }) => {
  const [userInfo, setUserinfo] = useState({
    username: "",
    email: "",
    password: ""
  });
  const handleSubmit = e => {
    e.preventDefault();
    login(userInfo);
  }
  return (
    <div className="body">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <p className="error">{error}</p>
        <label htmlFor="name">Username:</label><br />
        <input type="text"
          name="username"
          value={userInfo.username}
          onChange={e => setUserinfo({ ...userInfo, username: e.target.value })}
        /><br />
        <label htmlFor="email">Email:</label><br />
        <input type="email"
        name="email"
          value={userInfo.email}
          onChange={e => setUserinfo({ ...userInfo, email: e.target.value })}
          required
        /><br />
        <label htmlFor="name">Password:</label><br />
        <input type="password"
        name="passowrd"
          value={userInfo.password}
          onChange={e => setUserinfo({ ...userInfo, password: e.target.value })}
          minLength="6"
          required
        /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

const Register = ({ createDetails, error }) => {
  const [userInfo, setUserinfo] = useState({
    username: "",
    email: "",
    password: ""
  })
  const handleSubmit = e => {
    e.preventDefault();
    createDetails(userInfo)
     alert(`Thanks for registering ${userInfo.username}`)
    clearInput()
  }
  const clearInput = () => {
    setUserinfo({
      username: "",
      email: "",
      password: ""
    })
  }
  return (
    <div className="body">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <p className="error">{error}</p>
        <label htmlFor="name">Username:</label><br />
        <input type="text"
        name="username"
          value={userInfo.username}
          placeholder="username"
          onChange={e => setUserinfo({ ...userInfo, username: e.target.value })}
          required
        /><br />
        <label htmlFor="email">Email:</label><br />
        <input type="email"
        name="email"
          value={userInfo.email}
          placeholder="example@example.com"
          onChange={e => setUserinfo({ ...userInfo, email: e.target.value })}
          required
        /><br />
        <label htmlFor="name">Password:</label><br />
        <input type="password"
        name="passowrd"
          value={userInfo.password}
          placeholder="passowrd"
          onChange={e => setUserinfo({ ...userInfo, password: e.target.value })}
          minLength="6"
          required
        /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

const LoginAndRegister = ({ error, login, createDetails }) => {
  const [loginpage, setLoginpage] = useState(true);
  return (
    <div className="container">
      <div className="inner">
        <div className="toggler">
          <h2 onClick={() => setLoginpage(true)} style={{ textDecoration: loginpage ? "underline" : "", color: loginpage ? "brown" : "green" }}>Login</h2>
        </div>
        <div className="toggler">
          <h2 onClick={() => setLoginpage(false)} style={{ textDecoration: !loginpage ? "underline" : "", color: !loginpage ? "brown" : "green" }}>Register</h2>
        </div>
      </div>
      {loginpage ? <Login login={login} error={error} /> : <Register createDetails={createDetails} error={error} />}
    </div>
  )
}

export default App;