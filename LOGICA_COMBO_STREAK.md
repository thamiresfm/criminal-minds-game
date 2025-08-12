# 🔥 Lógica do Combo Streak - Criminal Minds Game

## ⚡ **Sistema de Combo: 0x**

### **🎯 Conceito Principal**
O **Combo Streak** é um sistema que recompensa jogadas consecutivas, aumentando os benefícios conforme você joga cartas sem parar.

---

## 🔄 **Como Funciona o Combo**

### **1. Inicialização**
- **Combo inicial:** 0x
- **Incremento:** +1 a cada carta jogada consecutivamente
- **Reset:** Volta para 0x quando há uma pausa ou erro

### **2. Incremento do Combo**
```javascript
// A cada carta jogada
comboStreak++;
```

### **3. Cálculo do Multiplicador**
```javascript
const comboMultiplier = 1 + (comboStreak * 0.1); // 10% por combo
```

---

## 📊 **Tabela de Combo e Multiplicadores**

| Combo | Multiplicador | Bônus | Descrição |
|-------|---------------|-------|-----------|
| **0x** | 1.0x | 0% | Sem bônus |
| **1x** | 1.1x | +10% | Primeira carta consecutiva |
| **2x** | 1.2x | +20% | Segunda carta consecutiva |
| **3x** | 1.3x | +30% | Terceira carta consecutiva |
| **4x** | 1.4x | +40% | Quarta carta consecutiva |
| **5x** | 1.5x | +50% | Quinta carta consecutiva |
| **10x** | 2.0x | +100% | Máximo (dobra as evidências) |

---

## 🎮 **Efeitos do Combo**

### **1. Evidências Multiplicadas**
```javascript
// Exemplo: DNA (20 evidências base)
// Combo 0x: 20 × 1.0 = 20 evidências
// Combo 3x: 20 × 1.3 = 26 evidências
// Combo 5x: 20 × 1.5 = 30 evidências
```

### **2. Moedas Bônus**
```javascript
const baseCoins = 10;
const comboBonus = Math.floor(comboStreak * 2);
const totalCoins = baseCoins + comboBonus;

// Exemplos:
// Combo 0x: 10 + (0 × 2) = 10 moedas
// Combo 3x: 10 + (3 × 2) = 16 moedas
// Combo 5x: 10 + (5 × 2) = 20 moedas
```

### **3. Barra de Progresso**
```javascript
const comboProgress = Math.min((comboStreak / 10) * 100, 100);
// Máximo: 10x combo = 100% da barra
```

---

## 📈 **Exemplos Práticos**

### **Sequência de 3 Cartas Consecutivas:**

#### **Carta 1: Interrogatório (8 evidências base)**
- Combo: 0x → 1x
- Multiplicador: 1.0x → 1.1x
- **Evidências:** 8 × 1.0 = **8 evidências**
- **Moedas:** 10 + (0 × 2) = **10 moedas**

#### **Carta 2: DNA (20 evidências base)**
- Combo: 1x → 2x
- Multiplicador: 1.1x → 1.2x
- **Evidências:** 20 × 1.1 = **22 evidências**
- **Moedas:** 10 + (1 × 2) = **12 moedas**

#### **Carta 3: Psicologia (15 evidências base)**
- Combo: 2x → 3x
- Multiplicador: 1.2x → 1.3x
- **Evidências:** 15 × 1.2 = **18 evidências**
- **Moedas:** 10 + (2 × 2) = **14 moedas**

**Total da sequência:** 48 evidências + 36 moedas

---

## 🎯 **Estratégias para Maximizar o Combo**

### **1. Jogadas Consecutivas**
- Jogar cartas rapidamente sem pausas
- Manter o ritmo constante
- Evitar interrupções

### **2. Sequência Ideal**
```
1. Carta pequena (5-8 evidências) para ativar combo
2. Carta média (10-15 evidências) com combo 1x
3. Carta grande (20 evidências) com combo 2x
4. Continuar com cartas grandes para maximizar
```

### **3. Benefícios por Nível de Combo**
- **1-2x:** Bônus inicial, bom para começar
- **3-5x:** Bônus significativo, ideal para cartas grandes
- **6-10x:** Bônus máximo, melhor para evidências

---

## 🔧 **Código Principal**

### **Incremento do Combo**
```javascript
// 1. Incrementar contadores
cardsPlayed++;
comboStreak++;
console.log(`🃏 Contadores atualizados: cardsPlayed=${cardsPlayed}, comboStreak=${comboStreak}`);
```

### **Cálculo do Multiplicador**
```javascript
// 2. Calcular evidências com combo
const baseEvidence = cardEffect.evidence;
const comboMultiplier = 1 + (comboStreak * 0.1); // 10% por combo
const totalEvidenceGained = Math.floor(baseEvidence * comboMultiplier);
```

### **Cálculo de Moedas**
```javascript
// 5. Adicionar moedas baseado no combo
const baseCoins = 10;
const comboBonus = Math.floor(comboStreak * 2);
const totalCoins = baseCoins + comboBonus;
playerCoins += totalCoins;
```

### **Atualização do Display**
```javascript
// Atualizar combo streak
const comboStreakElement = document.getElementById('comboStreak');
if (comboStreakElement) {
    comboStreakElement.textContent = `${comboStreak}x`;
}

// Atualizar multiplicador
const difficultyMultiplier = 1.0 + (comboStreak * 0.1);
const currentMultiplierElement = document.getElementById('currentMultiplier');
if (currentMultiplierElement) {
    currentMultiplierElement.textContent = `${difficultyMultiplier.toFixed(1)}x`;
}

// Atualizar barra de progresso
const comboProgress = Math.min((comboStreak / 10) * 100, 100);
const comboProgressElement = document.getElementById('comboProgress');
if (comboProgressElement) {
    comboProgressElement.style.width = `${comboProgress}%`;
}
```

---

## 🎮 **Condições de Reset**

### **Quando o Combo Reseta:**
- **Pausa longa** entre jogadas
- **Erro** ao jogar carta
- **Mudança de nível**
- **Reinício do jogo**

### **Como Manter o Combo:**
- Jogar cartas rapidamente
- Evitar cliques duplos
- Manter foco no jogo
- Não pausar entre jogadas

---

## 🏆 **Recordes e Conquistas**

### **Combo Máximo:**
- **10x** = Multiplicador 2.0x (dobra evidências)
- **Barra de progresso:** 100%
- **Bônus de moedas:** +20 moedas por carta

### **Estratégia para Recorde:**
1. Preparar sequência de cartas
2. Jogar rapidamente sem pausas
3. Usar cartas de alto valor no final
4. Manter combo ativo o máximo possível

---

## 🎯 **Resumo**

- **Objetivo:** Manter combo alto para maximizar recompensas
- **Incremento:** +1 a cada carta jogada consecutivamente
- **Multiplicador:** +10% por nível de combo
- **Moedas:** +2 moedas por nível de combo
- **Máximo:** 10x combo = 2.0x multiplicador
- **Estratégia:** Jogadas rápidas e consecutivas

**O sistema incentiva jogadas ágeis e estratégicas para maximizar as recompensas!** 🔥⚡
