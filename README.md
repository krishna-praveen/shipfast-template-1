# Pump

Olá dev 👋 tudo bem?

Nessa simples documentação você terá as informações e instruções necessárias para você rodar o projeto pela primeira vez.

## Vamos começar!

### Primeira etapa

1. Execute o comando para logar no Vercel

```bash
yarn vercel login
```

2. Selecione a opção de login por email
3. E siga as instruções do terminal

### Segunda etapa

1. Execute o comando para utilizar a versão Node.js que estamos utilizando no momento atual. (caso não tiver o nvm, instale, só pesquisar, fácil fácil)

```bash
nvm use
```

2. Execute o comando para instalar as dependências

```bash
yarn
```

### Terceira etapa

1. Execute o comando para buscar as envs que estão no Vercel

```bash
yarn vercel env pull .env.local
```

2. Execute o projeto e seja feliz

```bash
yarn dev
```

### Quarta etapa

1. É indicado você ter o Stripe em sua máquina, para assim você ter a integração com os eventos do Stripe e a nossa aplicação. Pesquise para instalar o Stripe CLI na sua máquina.

2. Execute o seguinte comando e siga os demais passos para conectar com a nossa conta Stripe

```bash
stripe login
```

2. Execute o comando abaixo em outra instância do seu terminal para escutar os eventos do Stripe em nossa aplicação:

```bash
stripe listen --forward-to localhost:3000/api/webhook/stripe
```
