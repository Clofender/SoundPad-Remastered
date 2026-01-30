<h1 align="center" style="font-weight: bold;">
  🔊 SoundPad Remastered
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Tauri-FFC131?style=for-the-badge&logo=tauri&logoColor=black" alt="Tauri">
  <img src="https://img.shields.io/badge/Rust-black?style=for-the-badge&logo=rust&logoColor=white" alt="Rust">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React">
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/WebView2-0078D7?style=for-the-badge&logo=microsoft-edge&logoColor=white" alt="WebView2">
</p>

<p align="center">
  <a href="https://github.com/Clofender/SoundPad-Remastered/releases/latest">
    <img src="https://img.shields.io/github/v/release/Clofender/SoundPad-Remastered?style=for-the-badge&label=BAIXE%20AQUI&color=00ff88&logo=windows&logoColor=black" alt="Download Latest Version">
  </a>
</p>

<p align="center">
 <b>Uma releitura moderna, leve e open-source de um clássico dos Soundboards.</b>
</p>

<p align="center">
  Este projeto nasceu de uma curiosidade genuína: <b>"Será que eu consigo construir um Soundboard?"</b>. Aproveitei esse questionamento como a oportunidade perfeita para explorar e aprender novas tecnologias na prática, mergulhando de cabeça na stack <b>Tauri + Rust</b> e no poder do <b>WebView2</b>.
</p>

---

## ❤️ Tributo e Créditos

Este projeto é uma **iniciativa educacional e de fã para fã**.

Eu sou um grande admirador e apoiador do **SoundPad original**. Este software ("Remastered") foi desenvolvido puramente como um exercício para praticar meus conhecimentos em programação desktop moderna.

Se você busca a experiência completa, suporte oficial e estabilidade garantida, **recomendo fortemente que compre e apoie o trabalho dos desenvolvedores originais**:

👉 **[Compre o SoundPad Original na Steam](https://store.steampowered.com/app/629520/Soundpad/)**

---

## ✨ O Projeto

O **SoundPad Remastered** combina a robustez do baixo nível com a beleza da web moderna. Diferente de aplicações Electron pesadas, utilizamos o **Tauri**, que aproveita o WebView nativo do sistema (Edge/WebView2 no Windows), resultando em um instalador minúsculo e consumo de memória extremamente baixo.

### 🚀 Funcionalidades Implementadas

- **Reprodução de Áudio Instantânea:** Sistema de play/pause sem latência.
- **Atalhos Globais (Global Hotkeys):** Dispare seus sons mesmo estando dentro de jogos ou com o app minimizado (Powered by Rust 🦀).
- **Interface Neon Moderna:** Design limpo, escuro e agradável, feito com Tailwind CSS.
- **Gerenciamento de Dispositivos:** Escolha por onde o som deve sair (Microfone virtual, alto-falantes, etc.).
- **Sistema de Ícones:** Identidade visual própria com suporte a ícones na bandeja do sistema.

---

## 🎧 Como Configurar (Para que os outros ouçam)

Para que seus amigos no Discord ou no jogo ouçam os sons **E** a sua voz ao mesmo tempo, precisamos configurar o Windows para jogar o som do seu microfone para dentro do Cabo Virtual.

### 1. Instale o VB-Cable
1. Baixe o **VB-Audio Virtual Cable** (Grátis) no site oficial: [vb-audio.com](https://vb-audio.com/Cable/).
2. Extraia o arquivo ZIP, execute o `VBCABLE_Setup_x64.exe` como Administrador e reinicie o PC.

### 2. Junte seu Microfone (O Passo Importante!)
Para que sua voz saia junto com os sons no cabo virtual:
1. Pressione `Win + R`, digite `mmsys.cpl` e dê Enter.
2. Vá na aba **Gravação**.
3. Clique 2x no seu **Microfone Principal** (o que você usa para falar).
4. Vá na aba **Escutar**.
5. Marque a caixinha ☑️ **"Escutar o dispositivo"**.
6. Em "Reproduzir neste dispositivo", escolha: **CABLE Input (VB-Audio Virtual Cable)**.
7. Clique em Aplicar.
   *(Agora sua voz está sendo enviada para o cabo junto com os efeitos sonoros).*

### 3. Configure no SoundPad Remastered
1. Abra o **SoundPad Remastered** e vá em **Configurações**.
2. Em "Dispositivo de Saída", selecione: **CABLE Input (VB-Audio Virtual Cable)**.

### 4. Configure no Discord / Jogos
1. Nas configurações de **Voz/Áudio** do Discord ou Jogo:
2. **Dispositivo de Entrada (Microfone):** Selecione **CABLE Output (VB-Audio Virtual Cable)**.
3. **Dispositivo de Saída (Fones):** Mantenha seu fone de ouvido normal.

> **Dica Pro:** O SoundPad Remastered já possui "Monitoramento Automático". Isso significa que você ouvirá o som no seu fone normalmente, enquanto seus amigos ouvem a mistura (Voz + Sons) pelo cabo virtual!

---

## 🛠️ Tecnologias e Aprendizados

Este projeto foi minha "caixa de areia" para experimentar tecnologias de ponta no desenvolvimento desktop:

* **Tauri v2:** O coração da aplicação. Aprendi como ele conecta o Frontend ao Backend de forma segura.
* **Rust:** Utilizado no backend para gerenciar permissões de sistema, registro de atalhos globais e manipulação de janelas.
* **WebView2:** Renderização da interface utilizando o motor nativo do Windows, economizando recursos.
* **React + TypeScript:** Para uma interface reativa, tipada e segura.
* **Tailwind CSS:** Para estilização rápida e responsiva.

## 🔮 O Futuro (Roadmap)

Este é um projeto vivo! Tenho planos de continuar evoluindo e aprendendo com ele. Minhas próximas metas principais são:

<table>
  <tr>
    <td align="center" width="60px">🖱️</td>
    <td>
      <strong>Suporte a Atalhos de Mouse</strong><br>
      Implementar a escuta de botões laterais (MB4, MB5) e scroll para disparar sons, além do teclado.
    </td>
  </tr>
  <tr>
    <td align="center" width="60px">☁️</td>
    <td>
      <strong>Loja de Sons Comunitária</strong><br>
      Criar uma área integrada para compartilhar e baixar packs de sons (memes, efeitos, frases) criados pela comunidade.
    </td>
  </tr>
</table>

## 📦 Como Rodar Localmente

Se você é desenvolvedor e quer ver como o código funciona:

**Pré-requisitos:**
* Node.js & NPM
* Rust & Cargo instalados
* Build Tools do Visual Studio (para compilar C++ no Windows)

```bash
# 1. Clone o repositório
git clone https://github.com/Clofender/SoundPad-Remastered.git

# 2. Instale as dependências
npm install

# 3. Rode em modo de desenvolvimento
npm run tauri dev
