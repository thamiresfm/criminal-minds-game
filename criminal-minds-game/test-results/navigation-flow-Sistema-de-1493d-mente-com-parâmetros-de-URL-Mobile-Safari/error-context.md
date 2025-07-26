# Page snapshot

```yaml
- img
- heading "Criminal Minds" [level=1]
- paragraph: Entre para desvendar mistérios
- text: Email
- img
- textbox "Email"
- text: Senha
- img
- textbox "Senha"
- button:
  - img
- checkbox "Lembrar de mim"
- text: Lembrar de mim
- button "Entrar" [disabled]
- paragraph: "Credenciais de teste:"
- paragraph:
  - strong: "Admin:"
  - text: admin@criminalmind.com / Admin123!
- paragraph:
  - strong: "Demo:"
  - text: demo@test.com / Demo123!
- paragraph:
  - text: Não tem conta?
  - link "Registrar-se":
    - /url: /register
- text: ou
- button "Entrar como Convidado":
  - img
  - text: Entrar como Convidado
- link "Esqueceu sua senha?":
  - /url: /forgot-password
- paragraph: Criminal Minds Game v1.0.0
- alert
```