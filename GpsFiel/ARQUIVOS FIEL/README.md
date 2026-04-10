# GPS Fiel – Landing Page v3

**Rastreador GPS Portátil Premium | Dark Mode | Mobile-First**

---

## ✅ Funcionalidades Implementadas

### Estrutura de Seções (Dobras)
1. **Header fixo** – Logo dourada, navegação, CTA "Acessar painel", menu hamburger mobile
2. **Hero** – Headline principal, vídeo REAL do equipamento em destaque, 2 CTAs, 4 counters animados
3. **Soluções** – 3 cards interativos (Infidelidade, Proteção Feminina, Profissionais), carrossel mobile
4. **Tecnologia** – Vídeo do produto com controles, 4 pilares técnicos, quick-specs grid, specs strip
5. **Oferta/Planos** – 3 planos (Básico, Premium, Profissional), selos de confiança, preços reais
6. **Revendedor + Simulador** – Kit info, benefícios MMN, simulador de ganhos interativo com slider
7. **Autoridade** – 15 anos, 4 métricas animadas
8. **FAQ** – 5 perguntas com accordion animado
9. **CTA Final** – Headline urgência + 2 botões
10. **Footer** – Logo, links, legal, CNPJ, redes sociais, métodos de pagamento

### Recursos Técnicos
- ✅ **Vídeo real do equipamento** em autoplay loop na Hero e com controles na seção Tecnologia
- ✅ **Dark mode** completo: preto #0a0a0f, roxo profundo #2d0057, dourado metálico #c9a84c
- ✅ **Mobile-first**: cards de soluções viram carrossel Swiper abaixo de 900px
- ✅ **Contadores animados** na Hero (30 dias, 15 anos, 100%, IP67)
- ✅ **Simulador de lucros** com slider dinâmico (5–100 unidades/mês)
- ✅ **FAQ accordion** com animação suave
- ✅ **Botão WhatsApp flutuante** com tooltip, bottom-right
- ✅ **Scroll animations** (fade-in-up) com IntersectionObserver
- ✅ **Smooth scroll** para âncoras
- ✅ **Header responsivo** com scroll shadow e nav ativa por seção

---

## 📁 Estrutura de Arquivos

```
index.html              ← Página principal
css/style.css           ← Estilos dark mode completos
js/main.js              ← Interações JS (counters, FAQ, simulator, swiper)
images/
  ├── logo-dark.png     ← Logo GPS Fiel fundo preto
  ├── logo-purple.png   ← Logo GPS Fiel fundo roxo
  ├── tracker-under-car.jpg  ← Card Infidelidade
  ├── woman-night-safety.jpg ← Card Proteção Feminina
  ├── detective-gps.jpg      ← Card Profissionais
  └── (ref-*.jpg)       ← Referências de design
videos/
  └── equipamento.mp4   ← Vídeo REAL do GPS Fiel (688 KB)
```

---

## ⚠️ Pendências Antes de Publicar

1. **Número de WhatsApp** – Substituir `5500000000000` pelo número real em TODOS os botões:
   - Hero: "Preciso de Proteção SOS"
   - Cards de soluções (3 botões)
   - Planos (3 botões)
   - Revendedor CTA
   - CTA Final (2 botões)
   - Footer
   - Botão flutuante WhatsApp

2. **CNPJ** – Atualizar `00.000.000/0001-00` no footer

3. **E-mail** – Atualizar `contato@gpsfiel.com.br`

4. **Redes sociais** – Adicionar links reais (Instagram, Facebook, YouTube)

5. **Políticas** – Criar páginas de Política de Privacidade e Termos de Uso

---

## 🎨 Design System

| Token | Valor |
|-------|-------|
| `--black` | `#0a0a0f` |
| `--purple` | `#2d0057` |
| `--gold` | `#c9a84c` |
| `--gold-lite` | `#f0c040` |
| Font Título | Montserrat 800/900 |
| Font Corpo | Inter 400/500 |

---

## 💰 Modelo de Negócio Implementado

### Venda Direta
- Preço: 12× R$ 75 (total R$ 900) ou R$ 810 à vista (-10%)
- Inclui: dispositivo + licença 12 meses + app

### Revendedor
- Kit: 3 unidades × R$ 700 = R$ 2.100 (parcelável 3×)
- Margem: R$ 200/unidade
- Simulação: 30 un/mês = R$ 6.000 de lucro

---

## 🚀 Próximos Passos Sugeridos

1. Adicionar página de checkout integrada (Hotmart, Kiwify ou Stripe)
2. Criar página de obrigado pós-compra
3. Integrar pixel do Facebook/Meta para rastreamento de conversões
4. Adicionar Google Tag Manager
5. Criar variação de landing para campanha "Proteção Feminina"
6. Adicionar seção de depoimentos com foto real de clientes
7. Implementar cookie banner (LGPD)
