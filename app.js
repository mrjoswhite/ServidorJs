app.post("/login", (req, res) => {
   
    const { email, password } = req.body;
    if (email === "admin@example.com" && password === "password") {
      const token = jwt.sign({ email }, process.env.JWT_SECRET);
      res.json({ token });
    } else {
      res.status(401).json({ error: "Credenciales inválidas" });
    }
  });
function verifyToken(req, res, next) {
    
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Token no provisto" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Token inválido" });
      }
      req.user = decoded;
      next();
    });
  }
  app.get("/protected", verifyToken, (req, res) => {
    res.json({ message: "Ruta protegida" });
  });
  
  