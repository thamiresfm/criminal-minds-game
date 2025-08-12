# 🔍 Lógica das Evidências - Criminal Minds Game

## 📊 **Sistema de Evidências: 0/100**

### **🎯 Objetivo Principal**
O jogador precisa coletar **100 evidências** para resolver o caso "Assassinato no Condomínio Luxo".

---

## 🃏 **Como Ganhar Evidências**

### **1. Jogando Cartas**
Cada carta tem um valor base de evidências:

| Tipo de Carta | Evidências Base | Descrição |
|---------------|----------------|-----------|
| **DNA** | 20 | DNA encontrado na cena do crime |
| **Psicologia** | 15 | Análise comportamental do assassino |
| **Kit Forense** | 12 | Fibras e impressões digitais |
| **Banco de Dados** | 11 | Histórico criminal |
| **Busca** | 10 | Objetos pessoais e documentos |
| **Câmeras** | 9 | Gravações de movimentação |
| **Interrogatório** | 8 | Informações sobre relacionamento |
| **Testemunha** | 6 | Atividade suspeita observada |
| **Vigilância** | 5 | Entrada/saída de pessoas |

### **2. Sistema de Combo (Multiplicador)**
- **Base:** 1.0x (sem combo)
- **Combo 1:** 1.1x (+10%)
- **Combo 2:** 1.2x (+20%)
- **Combo 3:** 1.3x (+30%)
- **E assim por diante...**

**Fórmula:** `Evidências Finais = Evidências Base × (1 + Combo × 0.1)`

---

## 📈 **Exemplos de Cálculo**

### **Exemplo 1: DNA sem Combo**
- Carta: DNA (20 evidências base)
- Combo: 0x
- **Total:** 20 × 1.0 = **20 evidências**

### **Exemplo 2: Interrogatório com Combo 2x**
- Carta: Interrogatório (8 evidências base)
- Combo: 2x
- **Total:** 8 × 1.2 = **9.6 → 9 evidências** (arredondado para baixo)

### **Exemplo 3: Psicologia com Combo 5x**
- Carta: Psicologia (15 evidências base)
- Combo: 5x
- **Total:** 15 × 1.5 = **22.5 → 22 evidências**

---

## 🎮 **Progresso do Jogo**

### **Início do Caso**
```
🔍 Evidências: 0/100
📊 Progresso: 0%
```

### **Após Jogar 3 Cartas (DNA + Interrogatório + Psicologia)**
```
🔍 Evidências: 51/100
📊 Progresso: 51%
```

### **Combo Ativo**
```
🔍 Evidências: 51/100
⚡ Combo: 3x
📊 Multiplicador: 1.3x
```

---

## 🏆 **Condição de Vitória**

### **Objetivo Alcançado**
Quando `currentCase.collectedEvidence >= 100`:

```javascript
if (currentCase.collectedEvidence >= currentCase.targetEvidence) {
    // 🎉 CASO RESOLVIDO!
    // Mostrar tela de vitória
    // Desbloquear conquistas
    // Adicionar moedas bônus
}
```

---

## 💡 **Estratégias para Maximizar Evidências**

### **1. Manter Combo Alto**
- Jogar cartas consecutivamente
- Evitar pausas longas entre jogadas
- Usar cartas de alto valor com combo ativo

### **2. Priorizar Cartas de Alto Valor**
- **DNA (20)** - Melhor carta para evidências
- **Psicologia (15)** - Segunda melhor
- **Kit Forense (12)** - Terceira melhor

### **3. Sequência Ideal**
```
1. Carta pequena (5-8) para ativar combo
2. DNA (20) com combo 1x = 22 evidências
3. Psicologia (15) com combo 2x = 18 evidências
4. Kit Forense (12) com combo 3x = 15 evidências
Total: 55 evidências em 4 jogadas!
```

---

## 🔧 **Código Principal**

### **Cálculo de Evidências**
```javascript
// 2. Calcular evidências com combo
const baseEvidence = cardEffect.evidence;
const comboMultiplier = 1 + (comboStreak * 0.1); // 10% por combo
const totalEvidenceGained = Math.floor(baseEvidence * comboMultiplier);

// 3. Adicionar evidências ao caso
totalEvidence += totalEvidenceGained;
currentCase.collectedEvidence += totalEvidenceGained;
```

### **Atualização do Display**
```javascript
// Atualizar evidências
const evidenceDisplayElement = document.getElementById('evidenceDisplay');
if (evidenceDisplayElement) {
    evidenceDisplayElement.textContent = `${currentCase.collectedEvidence}/${currentCase.targetEvidence}`;
}

// Atualizar barra de progresso
const evidenceProgress = (currentCase.collectedEvidence / currentCase.targetEvidence) * 100;
const evidenceProgressElement = document.getElementById('evidenceProgress');
if (evidenceProgressElement) {
    evidenceProgressElement.style.width = `${evidenceProgress}%`;
}
```

---

## 🎯 **Resumo**

- **Objetivo:** Coletar 100 evidências
- **Método:** Jogar cartas com valores de 5-20 evidências
- **Multiplicador:** Combo aumenta evidências em 10% por nível
- **Vitória:** Atingir 100 evidências para resolver o caso
- **Estratégia:** Manter combo alto e usar cartas de alto valor

**O sistema incentiva jogadas consecutivas e estratégicas para maximizar a coleta de evidências!** 🎮✨
