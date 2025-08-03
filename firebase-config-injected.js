// Configuração Firebase para desenvolvimento local
window.FIREBASE_CONFIG = {
  "apiKey": "AIzaSyDEMO_LOCAL_KEY_DESENVOLVIMENTO",
  "authDomain": "criminal-minds-local.firebaseapp.com",
  "projectId": "criminal-minds-local",
  "storageBucket": "criminal-minds-local.appspot.com",
  "messagingSenderId": "123456789012",
  "appId": "1:123456789012:web:localdev"
};
console.log('⚠️ Usando configuração Firebase LOCAL para desenvolvimento');
console.log('Para produção, configure DADOS_FIREBASE no GitHub Actions');
